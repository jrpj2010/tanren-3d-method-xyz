'use client';

import React, { useState, useEffect, useCallback } from 'react'; // useCallback をインポート
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Slider } from '../components/ui/slider';
import { COLOR_SCHEME, APP_CONFIG } from '../lib/api/config';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, Clock, FileText, Layers, BrainCircuit } from 'lucide-react'; // BrainCircuit アイコンを追加
import { getSystemPrompts } from '../lib/api/systemPrompts'; // API 関数をインポート
// import { SystemPrompt } from '@prisma/client'; // 型エラーのためコメントアウト
type SystemPrompt = Awaited<ReturnType<typeof getSystemPrompts>>[number]; // 型推論に変更
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // パスを修正 (src配下)
import { Progress } from '@/components/ui/progress'; // Progress コンポーネントをインポート

export default function NewProject() {
  const [projectName, setProjectName] = useState('');
  const [content, setContent] = useState('');
  const [slideCount, setSlideCount] = useState(APP_CONFIG.DEFAULT_SLIDE_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string[]>([]);
  const [progressStep, setProgressStep] = useState(0);
  const [currentSlideNum, setCurrentSlideNum] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [startConfirmed, setStartConfirmed] = useState(false);
  const [processingTriggered, setProcessingTriggered] = useState(false); // 新しい state を追加
  const [availablePrompts, setAvailablePrompts] = useState<SystemPrompt[]>([]); // プロンプト一覧
  const [selectedPromptId, setSelectedPromptId] = useState<string | undefined>(undefined); // 選択中のプロンプトID
  const router = useRouter();

  // コンポーネントマウント時にプロンプト一覧を取得
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const prompts = await getSystemPrompts();
        setAvailablePrompts(prompts);
        // デフォルトプロンプトがあれば初期選択状態にする
        const defaultPrompt = prompts.find(p => p.isDefault);
        if (defaultPrompt) {
          setSelectedPromptId(defaultPrompt.id);
        } else if (prompts.length > 0) {
          // デフォルトがなければ最初のプロンプトを選択
          setSelectedPromptId(prompts[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch system prompts:", err);
        // エラー表示は任意
      }
    };
    fetchPrompts();
  }, []); // マウント時に一度だけ実行

  // 初回レンダリング時にすべての状態をリセット
  useEffect(() => {
    setIsLoading(false);
    setIsAnalyzing(false);
    setError(null);
    setDetailedError(null);
    setStartConfirmed(false); // startConfirmed もリセット
    setProcessingTriggered(false); // processingTriggered もリセット
  }, []);

  // テキスト分析情報
  const [textAnalysis, setTextAnalysis] = useState({
    charCount: 0,
    estimatedSlideCount: 0,
    estimatedProcessingTime: 0,
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('ファイルサイズが大きすぎます（最大10MB）');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      
      // テキスト長さチェック
      if (text.length > APP_CONFIG.MAX_TEXT_LENGTH) {
        setError(`テキストが長すぎます（最大${APP_CONFIG.MAX_TEXT_LENGTH.toLocaleString()}文字）`);
        return;
      }
      
      setContent(text);
      setError(null);
      // テキストが読み込まれたら分析結果をリセット
      setShowAnalysis(false);
    };
    reader.onerror = () => {
      setError('ファイルの読み込み中にエラーが発生しました');
    };
    reader.readAsText(file);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    
    // テキスト長さチェック
    if (text.length > APP_CONFIG.MAX_TEXT_LENGTH) {
      setError(`テキストが長すぎます（最大${APP_CONFIG.MAX_TEXT_LENGTH.toLocaleString()}文字）`);
      return;
    }
    
    setContent(text);
    setError(null);
    // テキストが変更されたら分析結果をリセット
    setShowAnalysis(false);
  };

  // テキスト分析を実行
  const analyzeText = () => {
    if (!content.trim()) {
      setError('議事録テキストを入力またはアップロードしてください');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // 単純な分析: 文字数からスライド数と処理時間を推定
      const charCount = content.length;
      
      // スライド数の推定 (ユーザー指定値を尊重しつつ、文字数から最小値を計算)
      const minSlides = Math.max(1, Math.ceil(charCount / 2000)); // 大まかに2000文字あたり1スライド
      const finalSlideCount = Math.max(minSlides, slideCount); // ユーザー指定値が最小値より小さければ最小値を使う

      // 処理時間の推定 (最終的なスライド枚数に基づく)
      // 基本処理時間 + 文字あたりの処理時間 + スライドあたりの処理時間
      const baseTime = 5; // 基本処理時間5秒
      const charProcessingTime = charCount * 0.001; // 1000文字あたり1秒
      const slideProcessingTime = finalSlideCount * 3; // 1スライドあたり3秒 (finalSlideCount を使用)
      const estimatedProcessingTime = Math.ceil(baseTime + charProcessingTime + slideProcessingTime);

      // 分析結果を設定 (表示用と内部処理用で分ける)
      setTextAnalysis({
        charCount,
        estimatedSlideCount: finalSlideCount, // 確認画面表示用に最終的な枚数を設定
        estimatedProcessingTime,
      });

      // 実際に処理で使うスライド枚数を更新
      // setSlideCount(finalSlideCount); // ★削除: ユーザー設定を上書きしない
      setTotalSlides(finalSlideCount); // 処理中の表示用に総枚数を設定 (これは維持)

      setShowAnalysis(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // フォーム送信時のハンドラ: 分析 or 開始トリガー
  const handleSubmit = (e?: React.FormEvent) => { // ボタンクリックからも呼ぶため e をオプショナルに
    e?.preventDefault(); // イベントがあればデフォルト動作を抑制

    if (!projectName.trim()) {
      setError('プロジェクト名を入力してください');
      return;
    }

    if (!content.trim()) {
      setError('議事録テキストを入力またはアップロードしてください');
      return;
    }

    // 分析がまだなら分析を実行
    if (!showAnalysis) {
      analyzeText(); // analyzeText内でエラーチェック済み
      return;
    }

    // 分析済みなら、処理開始のフラグを立てる
    // 実際のAPI呼び出しは useEffect で startConfirmed を監視して行う
    if (showConfirmation) {
      setStartConfirmed(true);
    }
  };


  // API呼び出しとSSE接続を開始する関数 (useEffectから呼び出す)
  const startProcessing = useCallback(async () => {
    if (!projectName.trim() || !content.trim()) {
      setError('プロジェクト名と議事録テキストが必要です。');
      setProcessingTriggered(false); // トリガーをリセット
      return;
    }

    setIsLoading(true);
    setError(null);
    setDetailedError(null);
    setProgress([]);
    setProgressStep(1);
    setCurrentSlideNum(0);
    updateProgress('プロジェクトの作成を開始しています...');

    try {
      console.log('APIリクエスト送信:', {
        name: projectName,
        contentLength: content.length,
        slideCount,
      });

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          content,
          slideCount,
          systemPromptId: selectedPromptId, // ★ 選択されたプロンプトIDを追加
        }),
      });

      console.log('APIレスポンスステータス:', response.status, response.statusText);
      console.log('APIレスポンスヘッダー:', Object.fromEntries([...response.headers.entries()]));

      if (!response.ok) {
        const errorData = await response.json();
        console.error('APIエラーデータ:', errorData);
        throw new Error(errorData.error || 'プロジェクトの作成中にエラーが発生しました');
      }

      const data = await response.json();
      console.log('APIレスポンスデータ:', data);

      setProgressStep(2);
      updateProgress('プロジェクトが作成されました。スライド生成を開始します...');

      listenToProgress(data.id);

    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.message || '不明なエラーが発生しました');
      setDetailedError(JSON.stringify(err, null, 2));
      setIsLoading(false);
      setProgressStep(0);
      setProcessingTriggered(false); // エラー時はトリガーをリセット
    }
  }, [projectName, content, slideCount, router]); // 依存関係を useCallback に設定

  // startConfirmed が true になったら処理を開始する useEffect
  useEffect(() => {
    if (startConfirmed && !isLoading && !processingTriggered) {
      setProcessingTriggered(true); // 処理開始フラグを立てる
      startProcessing(); // API呼び出し処理を開始
    }
  }, [startConfirmed, isLoading, processingTriggered, startProcessing]); // 依存配列に startProcessing を追加

  const updateProgress = (message: string) => {
    setProgress(prev => [...prev, message]);
  };

  // Server-Sent Eventsで進捗状況を取得
  const listenToProgress = (projectId: string) => {
    const eventSource = new EventSource(`/api/projects/${projectId}/progress`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        updateProgress(data.message);
        
        // スライド生成進捗を抽出して表示
        if (data.message.includes('スライド ') && data.message.includes('/')) {
          const match = data.message.match(/スライド (\d+)\/(\d+)/);
          if (match && match.length === 3) {
            setCurrentSlideNum(parseInt(match[1], 10));
            setTotalSlides(parseInt(match[2], 10));
          }
        }
        
        // 完了時の処理
        if (data.completed) {
          eventSource.close();
          setProgressStep(3);
          setTimeout(() => {
            router.push(`/projects/${projectId}`);
          }, 1000);
        }
        
        // エラー発生時
        if (data.error) {
          console.error("SSE received error:", data.error); // エラーログ
          setError(data.error); // エラーメッセージを設定
          setDetailedError(data.detailedError || JSON.stringify(data, null, 2)); // 詳細エラーを設定
          eventSource.close(); // SSE接続を閉じる
          setIsLoading(false); // ローディング解除
          setProcessingTriggered(false); // 処理トリガー解除
          setProgressStep(0); // 進捗ステップをリセット
          return; // エラー時は以降の処理を中断
        }
      } catch (err: any) {
        console.error('Error parsing progress event:', err);
        // 解析エラーの場合も同様に処理を停止
        setError('進捗データの解析中にエラーが発生しました。');
        setDetailedError(JSON.stringify(err, null, 2));
        eventSource.close();
        setIsLoading(false);
        setProcessingTriggered(false);
        setProgressStep(0);
      }
    };

    eventSource.onerror = (err) => {
      console.error('EventSource failed', err);
      setError('進捗状況の取得中にエラーが発生しました');
      setDetailedError(JSON.stringify(err, null, 2));
      eventSource.close();
      setIsLoading(false);
      setProcessingTriggered(false); // エラー時はトリガー解除
      setProgressStep(0); // エラー時はステップリセット
    };
  };

  // 状態を入力フォーム表示時にリセットする関数
  const resetToInput = () => {
    setIsLoading(false);
    setIsAnalyzing(false);
    setError(null);
    setDetailedError(null);
    setStartConfirmed(false);
    setProcessingTriggered(false);
    setProgress([]);
    setProgressStep(0);
    setShowAnalysis(false); // 分析結果も非表示にする
    // projectName, content, slideCount は維持しても良いし、リセットしても良い
  };

  // 入力フォームを表示するかどうか
  const showInputForm = !isLoading && !processingTriggered; // 処理開始後は非表示

  // 分析・確認フォームを表示するかどうか
  const showConfirmation = !isLoading && showAnalysis && !startConfirmed && !processingTriggered; // 分析後、処理開始前のみ表示

  // 処理中表示を表示するかどうか
  const showProcessing = isLoading || processingTriggered; // ローディング中または処理開始後に表示

  // 処理の進捗度を計算
  const calculateProgress = () => {
    if (!showProcessing) return 0; // 処理中でなければ0
    if (progressStep === 0) return 0; // 初期状態
    if (progressStep === 1) return 10; // プロジェクト作成開始
    if (progressStep === 3) return 100;
    
    // スライド生成中
    if (progressStep === 2) {
      // ★ ユーザー指定の slideCount を使うように変更
      if (slideCount === 0) return 20; // 0除算を防ぐ
      // 10%～90%の範囲でスライド生成の進捗を表示
      return 10 + Math.round((currentSlideNum / slideCount) * 80);
    }

    return 0;
  };

  return (
    <MainLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold mb-8 text-center"
          style={{
            fontFamily: 'Noto Serif JP, serif',
            color: COLOR_SCHEME.PRIMARY,
            letterSpacing: '0.05em',
          }}
        >
          新規プロジェクト作成
        </h1>

        <Card>
          {showInputForm && (
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle
                  style={{
                    color: COLOR_SCHEME.ACCENT_1,
                    fontFamily: 'Noto Serif JP, serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  プロジェクト情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name"
                    style={{
                      color: COLOR_SCHEME.PRIMARY,
                      letterSpacing: '0.03em',
                    }}
                  >
                    プロジェクト名
                  </Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="例: 第3四半期営業会議"
                    required
                    disabled={isLoading || isAnalyzing}
                    style={{
                      borderColor: COLOR_SCHEME.PRIMARY,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content"
                    style={{
                      color: COLOR_SCHEME.PRIMARY,
                      letterSpacing: '0.03em',
                    }}
                  >
                    議事録テキスト
                  </Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="ここに議事録テキストを入力するか、ファイルからアップロードしてください。"
                    required
                    rows={10}
                    disabled={isLoading || isAnalyzing}
                    style={{
                      borderColor: COLOR_SCHEME.PRIMARY,
                    }}
                  />
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>最大 {APP_CONFIG.MAX_TEXT_LENGTH.toLocaleString()} 文字</span>
                    <span>現在 {content.length.toLocaleString()} 文字</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="file-upload"
                    style={{
                      color: COLOR_SCHEME.PRIMARY,
                      letterSpacing: '0.03em',
                    }}
                  >
                    または、ファイルからアップロード
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".txt,.md"
                    onChange={handleFileUpload}
                    disabled={isLoading || isAnalyzing}
                    style={{
                      borderColor: COLOR_SCHEME.PRIMARY,
                    }}
                  />
                  <div className="text-xs text-gray-500">
                    .txtまたは.mdファイル（最大10MB）
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label
                      htmlFor="slide-count"
                      style={{
                        color: COLOR_SCHEME.PRIMARY,
                        letterSpacing: '0.03em',
                      }}
                    >
                      スライド枚数
                    </Label>
                    <span className="text-sm font-medium"
                      style={{
                        color: COLOR_SCHEME.PRIMARY,
                      }}
                    >
                      {slideCount}枚
                    </span>
                  </div>
                  <Slider
                    id="slide-count"
                    min={1}
                    max={APP_CONFIG.MAX_SLIDE_COUNT}
                    step={1}
                    value={[slideCount]}
                    onValueChange={(vals) => setSlideCount(vals[0])}
                    disabled={isLoading || isAnalyzing}
                    className="my-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>最小: 1枚</span>
                    <span>最大: {APP_CONFIG.MAX_SLIDE_COUNT}枚</span>
                  </div>
                </div>

                {/* システムプロンプト選択 */}
                <div className="space-y-2">
                   <Label htmlFor="system-prompt" style={{ color: COLOR_SCHEME.PRIMARY, letterSpacing: '0.03em' }}>
                     <BrainCircuit className="inline-block mr-1 h-4 w-4" /> システムプロンプト
                   </Label>
                   <Select
                     value={selectedPromptId}
                     onValueChange={(value) => setSelectedPromptId(value)}
                     disabled={isLoading || isAnalyzing || availablePrompts.length === 0}
                   >
                     <SelectTrigger id="system-prompt" style={{ borderColor: COLOR_SCHEME.PRIMARY }}>
                       <SelectValue placeholder="プロンプトを選択..." />
                     </SelectTrigger>
                     <SelectContent>
                       {availablePrompts.length > 0 ? (
                         availablePrompts.map((prompt) => (
                           <SelectItem key={prompt.id} value={prompt.id}>
                             {prompt.name} {prompt.isDefault && '(デフォルト)'}
                           </SelectItem>
                         ))
                       ) : (
                         <SelectItem value="loading" disabled>
                           読み込み中...
                         </SelectItem>
                       )}
                     </SelectContent>
                   </Select>
                   {availablePrompts.length === 0 && !isLoading && (
                      <p className="text-xs text-muted-foreground">利用可能なシステムプロンプトがありません。設定画面から追加してください。</p>
                   )}
                 </div>

                {error && (
                  <div className="p-3 rounded"
                    style={{
                      backgroundColor: `${COLOR_SCHEME.ACCENT_1}20`,
                      color: COLOR_SCHEME.ACCENT_1,
                      border: `1px solid ${COLOR_SCHEME.ACCENT_1}`,
                    }}
                  >
                    {error}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  variant="accent1"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || isAnalyzing || !content.trim()}
                  style={{
                    letterSpacing: '0.05em',
                  }}
                >
                  {isAnalyzing ? '分析中...' : (showAnalysis ? '実行確認' : 'テキスト分析')}
                </Button>
              </CardFooter>
            </form>
          )}

          {/* テキスト分析と確認画面 */}
          {showConfirmation && (
            <>
              <CardHeader>
                <CardTitle
                  style={{
                    color: COLOR_SCHEME.ACCENT_1,
                    fontFamily: 'Noto Serif JP, serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  分析結果と実行確認
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border" style={{ borderColor: COLOR_SCHEME.PRIMARY }}>
                    <div className="flex items-center mb-2">
                      <FileText className="mr-2" size={18} color={COLOR_SCHEME.PRIMARY} />
                      <h3 className="font-medium" style={{ color: COLOR_SCHEME.PRIMARY }}>入力テキスト</h3>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: COLOR_SCHEME.ACCENT_2 }}>
                      {textAnalysis.charCount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">文字</p>
                  </div>

                  <div className="p-4 rounded-lg border" style={{ borderColor: COLOR_SCHEME.PRIMARY }}>
                    <div className="flex items-center mb-2">
                      <Layers className="mr-2" size={18} color={COLOR_SCHEME.PRIMARY} />
                      <h3 className="font-medium" style={{ color: COLOR_SCHEME.PRIMARY }}>予想スライド数</h3>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: COLOR_SCHEME.ACCENT_2 }}>
                      {textAnalysis.estimatedSlideCount}
                    </p>
                    <p className="text-sm text-gray-500">枚</p>
                  </div>

                  <div className="p-4 rounded-lg border" style={{ borderColor: COLOR_SCHEME.PRIMARY }}>
                    <div className="flex items-center mb-2">
                      <Clock className="mr-2" size={18} color={COLOR_SCHEME.PRIMARY} />
                      <h3 className="font-medium" style={{ color: COLOR_SCHEME.PRIMARY }}>予想処理時間</h3>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: COLOR_SCHEME.ACCENT_2 }}>
                      {textAnalysis.estimatedProcessingTime}
                    </p>
                    <p className="text-sm text-gray-500">秒</p>
                  </div>
                </div>

                {/* スライド枚数調整 (確認画面でも可能に) */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label
                      htmlFor="confirm-slide-count"
                      style={{
                        color: COLOR_SCHEME.PRIMARY,
                        letterSpacing: '0.03em',
                      }}
                    >
                      スライド枚数
                    </Label>
                    <span className="text-sm font-medium"
                      style={{
                        color: COLOR_SCHEME.PRIMARY,
                      }}
                    >
                      {slideCount}枚
                    </span>
                  </div>
                  <Slider
                    id="confirm-slide-count"
                    min={1}
                    max={APP_CONFIG.MAX_SLIDE_COUNT}
                    step={1}
                    value={[slideCount]}
                    onValueChange={(vals) => setSlideCount(vals[0])}
                    disabled={isLoading}
                    className="my-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>最小: 1枚</span>
                    <span>最大: {APP_CONFIG.MAX_SLIDE_COUNT}枚</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-2" style={{ color: COLOR_SCHEME.PRIMARY }}>処理内容</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 flex-shrink-0" size={16} color={COLOR_SCHEME.ACCENT_2} />
                      <span>入力テキストから{slideCount}枚のスライドを生成します</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 flex-shrink-0" size={16} color={COLOR_SCHEME.ACCENT_2} />
                      <span>各スライドには3列の構造化された内容が含まれます</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 flex-shrink-0" size={16} color={COLOR_SCHEME.ACCENT_2} />
                      <span>トークスクリプトと画像生成プロンプトも自動作成されます</span>
                    </li>
                  </ul>
                </div>

                {error && (
                  <div className="p-3 rounded flex items-center"
                    style={{
                      backgroundColor: `${COLOR_SCHEME.ACCENT_1}20`,
                      color: COLOR_SCHEME.ACCENT_1,
                      border: `1px solid ${COLOR_SCHEME.ACCENT_1}`,
                    }}
                  >
                    <AlertCircle className="mr-2" size={16} />
                    {error}
                  </div>
                )}
              </CardContent>
              {/* --- ボタン表示ロジック修正 --- */}
              <CardFooter className="flex justify-end space-x-2">
                {showInputForm && !showConfirmation && ( // 分析ボタンは入力フォーム表示時のみ
                  <Button
                    type="button"
                    onClick={analyzeText}
                    disabled={isLoading || isAnalyzing || !content.trim() || !projectName.trim()}
                    style={{
                      backgroundColor: COLOR_SCHEME.ACCENT_1,
                      color: COLOR_SCHEME.BACKGROUND,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {isAnalyzing ? '分析中...' : '分析'}
                  </Button>
                )}
                {showConfirmation && ( // 確認画面のボタン
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAnalysis(false);
                        setStartConfirmed(false);
                      }}
                      disabled={isLoading}
                      style={{ borderColor: COLOR_SCHEME.PRIMARY, color: COLOR_SCHEME.PRIMARY }}
                    >
                      戻る
                    </Button>
                    <Button
                      onClick={() => setStartConfirmed(true)}
                      disabled={isLoading}
                      style={{
                        backgroundColor: COLOR_SCHEME.ACCENT_1,
                        color: COLOR_SCHEME.BACKGROUND,
                        letterSpacing: '0.05em',
                      }}
                    >
                      作成開始
                    </Button>
                  </>
                )}
                {/* 処理中はボタン非表示 */}
              </CardFooter>
              {/* --- ここまでボタン表示ロジック修正 --- */}
            </>
          )}

          {/* --- 処理中表示の修正 --- */}
          {showProcessing && ( // isLoading から showProcessing に変更
            <>
              <CardHeader>
                <CardTitle
                  style={{
                    color: COLOR_SCHEME.ACCENT_1,
                    fontFamily: 'Noto Serif JP, serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  処理状況
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4 py-10">
                {/* ローディングスピナーは維持 */}
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                <p className="text-lg font-semibold" style={{ color: COLOR_SCHEME.PRIMARY }}>
                  {progressStep === 3 ? '完了処理中...' : 'スライド生成中...'}
                </p>
                <div className="w-full max-w-md">
                  {/* 進捗バー (shadcn/ui の Progress を使用) */}
                  <Progress value={calculateProgress()} className="w-full" />
                  <div className="text-center text-sm mt-2" style={{ color: COLOR_SCHEME.PRIMARY }}>
                    {calculateProgress()}%
                    {/* ★ ユーザー指定の slideCount を使うように変更 */}
                    {progressStep === 2 && slideCount > 0 && ` (スライド ${currentSlideNum}/${slideCount})`}
                  </div>

                  {/* 進捗メッセージ */}
                  <div className="text-sm text-gray-600 space-y-1 max-h-40 overflow-y-auto mt-4 border p-2 rounded">
                    {progress.length > 0 ? (
                      progress.map((msg, index) => (
                        <p key={index}>{msg}</p>
                      ))
                    ) : (
                      <p>処理を開始しています...</p>
                    )}
                  </div>
                </div>

                {/* エラー表示 (処理中画面にも表示) */}
                {error && (
                  <div className="w-full max-w-md mt-4 p-3 rounded flex items-center"
                    style={{
                      backgroundColor: `${COLOR_SCHEME.ACCENT_1}20`,
                      color: COLOR_SCHEME.ACCENT_1,
                      border: `1px solid ${COLOR_SCHEME.ACCENT_1}`,
                    }}
                  >
                    <AlertCircle className="mr-2 flex-shrink-0" size={16} />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                {/* 詳細エラー表示 (処理中画面にも表示) */}
                {detailedError && (
                  <details className="w-full max-w-md mt-2">
                    <summary className="text-xs text-gray-500 cursor-pointer">詳細エラー情報</summary>
                    <pre
                      className="mt-1 p-3 rounded text-xs overflow-auto bg-gray-50 border"
                      style={{ maxHeight: '150px', borderColor: '#eaeaea' }}
                    >
                      {detailedError}
                    </pre>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => navigator.clipboard.writeText(detailedError)}
                      style={{
                        letterSpacing: '0.05em',
                        borderColor: COLOR_SCHEME.PRIMARY,
                        color: COLOR_SCHEME.PRIMARY,
                      }}
                    >
                      エラー情報をコピー
                    </Button>
                  </details>
                )}
              </CardContent>
            </>
          )}

          {/* --- エラー表示部分を独立させる --- */}
          {error && !isLoading && ( // ローディング中でない場合のみエラー表示
            <CardFooter className="bg-red-100 border-t border-red-200 p-4 mt-6 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex items-start space-x-3 flex-1">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                  {detailedError && (
                    <details className="mt-2">
                      <summary className="text-xs text-red-600 cursor-pointer">詳細</summary>
                      <pre className="mt-1 text-xs text-red-500 bg-red-50 p-2 rounded overflow-auto max-h-40">
                        {detailedError}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
              {/* 入力に戻るボタンを追加 */}
              <Button
                variant="outline"
                onClick={resetToInput}
                className="w-full sm:w-auto"
                style={{ borderColor: COLOR_SCHEME.PRIMARY, color: COLOR_SCHEME.PRIMARY }}
              >
                入力に戻る
              </Button>
            </CardFooter>
          )}
          {/* --- ここまでエラー表示部分の修正 --- */}
        </Card>
      </div>
    </MainLayout>
  );
}