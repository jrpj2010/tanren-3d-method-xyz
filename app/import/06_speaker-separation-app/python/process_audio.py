#!/usr/bin/env python3
import os
import sys
import json
import torch
import torchaudio
from pyannote.audio import Pipeline
from pydub import AudioSegment
import argparse
import uuid
from pathlib import Path

def process_audio(input_file, output_dir, silence_level_dbfs=-100):
    """
    音声ファイルを処理して話者分離を行い、各話者の音声ファイルを生成する
    
    Args:
        input_file: 入力音声ファイルのパス
        output_dir: 出力ディレクトリのパス
        silence_level_dbfs: 無音部分の音量レベル (dBFS)
    
    Returns:
        生成されたファイルのリスト
    """
    # 出力ディレクトリが存在しない場合は作成
    os.makedirs(output_dir, exist_ok=True)
    
    # デバイスの設定
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")
    
    # 話者分離モデルの読み込み
    print("Loading diarization model...")
    try:
        diar_pipeline = Pipeline.from_pretrained(
            "pyannote/speaker-diarization-3.1",
            use_auth_token=os.environ.get("HUGGINGFACE_TOKEN")
        ).to(device)
        print("Diarization model loaded.")
    except Exception as e:
        print(f"Error loading diarization model: {e}")
        sys.exit(1)
    
    # 音声ファイルの読み込み
    print(f"Processing audio file: {input_file}")
    try:
        waveform, sample_rate = torchaudio.load(input_file)
        
        # waveformを適切な次元数に調整
        if waveform.ndim == 1:
            waveform = waveform.unsqueeze(0)
        elif waveform.ndim == 2:
            # 最初のチャンネルを使用
            waveform = waveform[0, :].unsqueeze(0)
            print("Stereo audio detected, using the first channel for diarization.")
        
        # 話者分離の実行
        with torch.no_grad():
            diarization = diar_pipeline({"waveform": waveform, "sample_rate": sample_rate})
        
        print("Diarization complete.")
        
        # 不要なテンソルを解放
        del waveform
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
        
    except Exception as e:
        print(f"Error processing audio file: {e}")
        sys.exit(1)
    
    # 元の音声ファイルをpydubで読み込む
    try:
        original_audio = AudioSegment.from_file(input_file)
        total_duration_ms = len(original_audio)
        print(f"Audio loaded successfully ({total_duration_ms / 1000:.2f} seconds).")
    except Exception as e:
        print(f"Error loading audio file with pydub: {e}")
        sys.exit(1)
    
    # 話者分離結果から、検出された話者のリストを取得
    speaker_labels = diarization.labels()
    print(f"Detected speakers: {speaker_labels}")
    
    if not speaker_labels:
        print("No speakers detected in the diarization result.")
        sys.exit(1)
    
    output_files = []
    
    # 各話者について処理
    for speaker_idx, speaker_label in enumerate(speaker_labels):
        print(f"Processing speaker: {speaker_label}...")
        
        try:
            # 無音トラックのベースを作成
            silent_track = original_audio.apply_gain(silence_level_dbfs - original_audio.dBFS)
        except Exception as e:
            print(f"Error creating silent track for {speaker_label}: {e}")
            continue
        
        # この話者が話しているセグメントを取得
        num_segments_processed = 0
        try:
            # 特定の話者のセグメント群を取得
            speaker_timeline = diarization.label_timeline(speaker_label)
            if not speaker_timeline:
                print(f"No segments found for speaker {speaker_label}. Skipping overlay.")
            else:
                print(f"Found {len(speaker_timeline)} segments for {speaker_label}. Overlaying...")
                # 各セグメントに対してループ
                for segment in speaker_timeline:
                    start_ms = int(segment.start * 1000)
                    end_ms = int(segment.end * 1000)
                    
                    # 境界チェック
                    if end_ms > total_duration_ms:
                        end_ms = total_duration_ms
                    if start_ms >= end_ms or start_ms >= total_duration_ms:
                        print(f"Skipping invalid segment: start={start_ms}ms, end={end_ms}ms")
                        continue
                    
                    # 元の音声から該当セグメントを切り出す
                    try:
                        segment_audio = original_audio[start_ms:end_ms]
                    except Exception as slice_e:
                        print(f"Warning: Could not slice segment {start_ms}-{end_ms}ms for {speaker_label}. Skipping. Error: {slice_e}")
                        continue
                    
                    # 無音トラックの対応する位置に、切り出したセグメントを重ねる
                    try:
                        silent_track = silent_track.overlay(segment_audio, position=start_ms)
                        num_segments_processed += 1
                    except Exception as overlay_e:
                        print(f"Warning: Could not overlay segment {start_ms}-{end_ms}ms for {speaker_label}. Skipping. Error: {overlay_e}")
                        continue
                
                print(f"Processed {num_segments_processed} segments for overlay.")
        
        except Exception as e:
            print(f"Error processing segments for {speaker_label}: {e}")
            continue
        
        # 生成された音声トラックをファイルに保存
        # ファイル名を生成
        output_filename = os.path.join(output_dir, f"speaker_{speaker_idx}_{uuid.uuid4()}.wav")
        
        try:
            print(f"Saving: {output_filename} ({len(silent_track)/1000:.2f} seconds)")
            silent_track.export(output_filename, format="wav")
            output_files.append(output_filename)
        except Exception as e:
            print(f"Error saving {output_filename}: {e}")
        
        # メモリ解放
        del silent_track
    
    return output_files

def main():
    parser = argparse.ArgumentParser(description="Process audio file for speaker separation")
    parser.add_argument("--input", required=True, help="Input audio file path")
    parser.add_argument("--output-dir", required=True, help="Output directory for separated audio files")
    parser.add_argument("--silence-level", type=float, default=-100, help="Silence level in dBFS")
    
    args = parser.parse_args()
    
    # 処理の実行
    output_files = process_audio(args.input, args.output_dir, args.silence_level)
    
    # 結果をJSON形式で出力
    result = {
        "status": "success",
        "files": [{"path": f, "speaker": f"Speaker_{i}"} for i, f in enumerate(output_files)]
    }
    
    print(json.dumps(result))

if __name__ == "__main__":
    main()
