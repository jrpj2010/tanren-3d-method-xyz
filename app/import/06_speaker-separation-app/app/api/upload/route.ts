import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { mkdir } from "fs/promises"
import { updateProcessingStatus } from "@/lib/processing-status"
import { existsSync } from "fs"
import { spawn } from 'child_process';
import { copyFile, rm } from 'fs/promises';
import { basename } from 'path';
import { Buffer } from 'buffer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 })
    }

    // ファイルサイズの検証（100MB以下）
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: "ファイルサイズは100MB以下にしてください" }, { status: 400 })
    }

    // ファイル形式の検証
    const validTypes = ["audio/wav", "audio/mpeg", "audio/mp4"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "サポートされていないファイル形式です。.wav, .mp3, .m4aのみ対応しています" },
        { status: 400 },
      )
    }

    // 一意のIDを生成
    const id = uuidv4()

    // アップロードディレクトリの作成
    const uploadDir = join("/tmp", "uploads", id)
    await mkdir(uploadDir, { recursive: true })

    // ファイル名を取得
    const originalFilename = file.name
    const fileExtension = originalFilename.split(".").pop()

    // ファイルパスを作成
    const filePath = join(uploadDir, `original.${fileExtension}`)

    // ファイルを保存
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // 処理開始
    const processingPromise = startProcessing(id, filePath)

    // 非同期で処理を開始（レスポンスを待たない）
    processingPromise.catch((err) => {
      console.error("処理中にエラーが発生しました:", err)
      // エラーログの記録など
      // Ensure status is updated even if processingPromise is not awaited directly before response
      updateProcessingStatus(id, "error", 0, [], err instanceof Error ? err.message : "Failed to start processing early");
    })

    return NextResponse.json({ id, message: "ファイルがアップロードされ、処理が開始されました" })
  } catch (error) {
    console.error("アップロード中にエラーが発生しました:", error)
    return NextResponse.json({ error: "ファイルのアップロード中にエラーが発生しました" }, { status: 500 })
  }
}

// 実際の処理を開始する関数
async function startProcessing(id: string, inputAudioPath: string) {
  const pythonScriptPath = join(process.cwd(), 'python', 'process_audio.py');
  // Define baseUploadDir relative to a temporary system directory or ensure it's cleaned up
  const baseTmpDir = join('/tmp', 'speaker_separation_uploads'); // Central temp directory
  const jobSpecificTmpDir = join(baseTmpDir, id); // Job-specific temp directory
  
  const pythonOutputDir = join(jobSpecificTmpDir, 'python_output'); // Python script's output
  const publicProcessedDir = join(process.cwd(), 'public', 'processed_audio', id); // Final public directory

  // Initial progress variable, to be updated within the scope
  let currentProgress = 0;

  try {
    await mkdir(jobSpecificTmpDir, { recursive: true }); // Ensure base job temp dir is created
    currentProgress = 10;
    await updateProcessingStatus(id, 'processing', currentProgress);

    await mkdir(pythonOutputDir, { recursive: true });
    await mkdir(publicProcessedDir, { recursive: true });

    currentProgress = 20;
    await updateProcessingStatus(id, 'processing', currentProgress);

    const pythonProcess = spawn('python3', [
      pythonScriptPath,
      '--input',
      inputAudioPath,
      '--output-dir',
      pythonOutputDir,
    ], { env: { ...process.env, PYTHONUNBUFFERED: "1" } }); // Added PYTHONUNBUFFERED for real-time stdout/stderr

    let scriptOutput = '';
    let scriptError = '';

    pythonProcess.stdout.on('data', (data) => {
      const outputChunk = data.toString();
      scriptOutput += outputChunk;
      console.log(`Python stdout: ${outputChunk}`); // Log stdout for debugging
      // Simple progress update, can be made more sophisticated
      if (currentProgress < 80) {
        currentProgress = Math.min(80, currentProgress + 5);
        updateProcessingStatus(id, 'processing', currentProgress);
      }
    });

    pythonProcess.stderr.on('data', (data) => {
      const errorChunk = data.toString();
      scriptError += errorChunk;
      console.error(`Python stderr: ${errorChunk}`);
    });

    pythonProcess.on('close', async (code) => {
      console.log(`Python script closed with code ${code}. Full stdout: ${scriptOutput}`);
      if (code !== 0) {
        console.error(`Python script exited with code ${code}. Full stderr: ${scriptError}`);
        await updateProcessingStatus(
          id,
          'error',
          currentProgress,
          [],
          `Python script error: ${scriptError || 'Unknown error'} (exit code: ${code})`,
        );
        // Clean up temporary directory on error
        await rm(jobSpecificTmpDir, { recursive: true, force: true }).catch(err => console.error('Failed to clean up temp dir on error:', err));
        return;
      }

      try {
        const jsonOutputMatch = scriptOutput.match(/{[\\s\\S]*?}/m); // Non-greedy match, multiline
        if (!jsonOutputMatch || !jsonOutputMatch[0]) {
          console.error("Python script output did not contain valid JSON:", scriptOutput);
          throw new Error('Python script did not produce valid JSON output.');
        }
        
        let resultData;
        try {
          resultData = JSON.parse(jsonOutputMatch[0]);
        } catch(jsonParseError) {
          console.error("Failed to parse JSON from Python script output:", jsonOutputMatch[0], jsonParseError);
          throw new Error(`Failed to parse JSON from Python script: ${jsonParseError instanceof Error ? jsonParseError.message : "Unknown JSON parse error"}`);
        }
        

        if (resultData.status !== 'success' || !resultData.files || resultData.files.length === 0) {
          throw new Error(resultData.error_message || 'Python script reported an error or no files processed.');
        }

        currentProgress = 85;
        await updateProcessingStatus(id, 'processing', currentProgress);

        const processedFilesInfo = [];
        for (const fileInfo of resultData.files) {
          const sourcePath = fileInfo.path;
          if (!existsSync(sourcePath)) {
            console.error(`Processed file not found at source: ${sourcePath}`);
            throw new Error(`Processed file ${basename(sourcePath)} not found at source.`);
          }
          const fileName = basename(sourcePath);
          const publicDestPath = join(publicProcessedDir, fileName);
          const publicUrl = `/processed_audio/${id}/${fileName}`;

          await copyFile(sourcePath, publicDestPath);
          processedFilesInfo.push({ label: fileInfo.speaker, url: publicUrl });
        }

        await updateProcessingStatus(id, 'completed', 100, processedFilesInfo);
        
        // Clean up the job-specific temporary directory after successful processing
        await rm(jobSpecificTmpDir, { recursive: true, force: true }).catch(err => console.error('Failed to clean up temp dir on success:', err));


      } catch (processOutputError) {
        console.error('Error processing Python script output or copying files:', processOutputError);
        await updateProcessingStatus(
          id,
          'error',
          currentProgress,
          [],
          processOutputError instanceof Error ? processOutputError.message : 'Error processing script output',
        );
        await rm(jobSpecificTmpDir, { recursive: true, force: true }).catch(err => console.error('Failed to clean up temp dir on processing error:', err));
      }
    });

    pythonProcess.on('error', async (err) => {
      console.error('Failed to start Python script:', err);
      await updateProcessingStatus(
        id,
        'error',
        currentProgress,
        [],
        `Failed to start Python script: ${err.message}`,
      );
      await rm(jobSpecificTmpDir, { recursive: true, force: true }).catch(cleanupErr => console.error('Failed to clean up temp dir on spawn error:', cleanupErr));
    });

  } catch (error) {
    console.error('Critical error in startProcessing:', error);
    await updateProcessingStatus(
      id,
      'error',
      currentProgress, // Use currentProgress as it might have been updated
      [],
      error instanceof Error ? error.message : 'An unexpected error occurred in startProcessing.',
    );
    // Attempt cleanup in case of outer try-catch block error
    await rm(join('/tmp', 'speaker_separation_uploads', id), { recursive: true, force: true }).catch(cleanupErr => console.error('Failed to clean up temp dir in critical error handler:', cleanupErr));
  }
}
