'use client'; // ★ クライアントコンポーネントとしてマーク

import React, { useState, useEffect } from 'react'; // useEffect をインポート
import Link from 'next/link';
import { COLOR_SCHEME } from '../../lib/api/config';
// import { SystemPrompt } from '@prisma/client'; // 型エラーのためコメントアウト
import { getSystemPrompts, createSystemPrompt, updateSystemPrompt, deleteSystemPrompt } from '../../lib/api/systemPrompts'; // API 関数をインポート
// getSystemPrompts の戻り値の型から SystemPrompt 型を推論させる
type SystemPrompt = Awaited<ReturnType<typeof getSystemPrompts>>[number];
import { Settings } from 'lucide-react'; // Settings アイコンをインポート
import { Button } from '../ui/button'; // Button をインポート
import { Input } from '../ui/input'; // Input をインポート
import { useToast } from "@/hooks/use-toast"; // パスを修正 (src/hooks)
import { Toaster } from "@/components/ui/toaster"; // パスを修正 (src/components/ui)
import { SystemPromptForm } from '../settings/SystemPromptForm'; // フォームコンポーネントをインポート
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../ui/dialog'; // Dialog コンポーネントをインポート
import { // ★ 正しいインポート文
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Table コンポーネントをインポート (src配下を想定)

// interface MainLayoutProps { // ★ 重複定義を削除
//   children: React.ReactNode;
// }
// import { SystemPromptForm } from '../settings/SystemPromptForm'; // ★ 削除 (正しい位置に移動済み)

// ... (他のインポート) // ★ この行も不要なので削除

interface MainLayoutProps { // ★ こちらの定義を残す
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { toast } = useToast(); // toast フックを初期化
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [prompts, setPrompts] = useState<SystemPrompt[]>([]);
  const [editingPrompt, setEditingPrompt] = useState<SystemPrompt | null>(null);
  const [showPromptForm, setShowPromptForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState(''); // APIキー入力用 state
  const [apiKeySaveStatus, setApiKeySaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle'); // 保存状態

  // コンポーネントマウント時にローカルストレージからAPIキーを読み込む
  useEffect(() => {
    const savedApiKey = localStorage.getItem('anthropic_api_key');
    if (savedApiKey) {
      setApiKeyInput(savedApiKey);
    }
  }, []);


  // 設定ダイアログが開かれたときにプロンプト一覧を取得
  useEffect(() => {
    if (showSettingsDialog) {
      fetchPrompts();
    }
  }, [showSettingsDialog]);

  const fetchPrompts = async () => {
    setError(null);
    try {
      const fetchedPrompts = await getSystemPrompts();
      setPrompts(fetchedPrompts);
    } catch (err: any) {
      setError('プロンプト一覧の取得に失敗しました。');
      console.error(err);
    }
  };

  // APIキー保存処理
  const handleApiKeySave = async () => {
    setApiKeySaveStatus('saving');
    setError(null);
    try {
      // ここでは localStorage に保存するだけ
      localStorage.setItem('anthropic_api_key', apiKeyInput);
      setApiKeySaveStatus('saved');
      toast({ // トースト表示
        title: "成功",
        description: "APIキーをローカルストレージに保存しました。",
      });
      // 3秒後にステータスをリセット
      setTimeout(() => setApiKeySaveStatus('idle'), 3000);
    } catch (err) {
      console.error("Failed to save API key:", err);
      setError("APIキーの保存に失敗しました。");
      setApiKeySaveStatus('error');
    }
  };

  // フォーム送信処理
  const handlePromptSubmit = async (data: { name: string; content: string; isDefault: boolean }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (editingPrompt) {
        // 更新
        await updateSystemPrompt(editingPrompt.id, data);
      } else {
        // 新規作成
        await createSystemPrompt(data);
      }
      await fetchPrompts(); // 一覧を再取得
      setShowPromptForm(false); // フォームを閉じる
      setEditingPrompt(null); // 編集中データをクリア
    } catch (err: any) {
      setError(err.message || 'プロンプトの保存に失敗しました。');
      console.error(err);
      // エラーが発生してもフォームは閉じない
    } finally {
      setIsSubmitting(false);
    }
  };

  // フォームキャンセル処理
  const handlePromptCancel = () => {
    setShowPromptForm(false);
    setEditingPrompt(null);
    setError(null); // エラーもクリア
  };

  // 新規追加ボタンクリック
  const handleAddNewClick = () => {
    setEditingPrompt(null); // 新規作成モード
    setShowPromptForm(true);
  };

  // 編集ボタンクリック処理
  const handleEditClick = (prompt: SystemPrompt) => {
    setEditingPrompt(prompt); // 編集対象データをセット
    setShowPromptForm(true); // フォームを表示
  };

  // 削除ボタンクリック処理
  const handleDeleteClick = async (promptId: string) => {
    if (window.confirm('このシステムプロンプトを削除してもよろしいですか？デフォルトのプロンプトは削除できません。')) {
      setError(null);
      try {
        await deleteSystemPrompt(promptId);
        await fetchPrompts(); // 削除後に一覧を再取得
      } catch (err: any) {
        setError(err.message || 'プロンプトの削除に失敗しました。');
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: COLOR_SCHEME.BACKGROUND }}>
      {/* ヘッダー */}
      <header
        className="py-4 px-6 shadow-md"
        style={{
          background: COLOR_SCHEME.PRIMARY,
          color: COLOR_SCHEME.SECONDARY,
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/"
              className="text-2xl font-bold tracking-wider"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                letterSpacing: '0.1em',
                color: COLOR_SCHEME.SECONDARY,
              }}
            >
              VibeCoding
              <span
                className="ml-2 text-xs px-2 py-0.5 rounded"
                style={{
                  background: COLOR_SCHEME.ACCENT_1,
                  color: COLOR_SCHEME.SECONDARY,
                  fontFamily: 'Noto Sans JP, sans-serif',
                  letterSpacing: '0.05em',
                }}
              >
                β版
              </span>
            </Link>
          </div>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/"
                  className="hover:opacity-80 transition-opacity"
                  style={{
                    color: COLOR_SCHEME.SECONDARY,
                    fontFamily: 'Noto Sans JP, sans-serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/new-project"
                  className="hover:opacity-80 transition-opacity"
                  style={{
                    color: COLOR_SCHEME.SECONDARY,
                    fontFamily: 'Noto Sans JP, sans-serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  新規プロジェクト
                </Link>
              </li>
              <li>
                <Link href="/projects"
                  className="hover:opacity-80 transition-opacity"
                  style={{
                    color: COLOR_SCHEME.SECONDARY,
                    fontFamily: 'Noto Sans JP, sans-serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  プロジェクト一覧
                </Link>
              </li>
            </ul>
          </nav>

          {/* 設定アイコンボタン */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettingsDialog(true)}
            style={{ color: COLOR_SCHEME.SECONDARY }}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 py-8 px-4">
        {children}
      </main>

      {/* フッター */}
      <footer
        className="py-4 px-6 text-center text-sm"
        style={{
          background: COLOR_SCHEME.PRIMARY,
          color: COLOR_SCHEME.SECONDARY,
          fontFamily: 'Noto Sans JP, sans-serif',
          letterSpacing: '0.03em',
        }}
      >
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} VibeCoding - 議事録自動スライド変換アプリケーション</p>
        </div>
      </footer>

      {/* 設定ダイアログ */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{showPromptForm ? (editingPrompt ? 'プロンプト編集' : '新規プロンプト追加') : '設定'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {showPromptForm ? (
              <SystemPromptForm
                initialData={editingPrompt}
                onSubmit={handlePromptSubmit}
                onCancel={handlePromptCancel}
                isLoading={isSubmitting}
              />
            ) : (
              <>
                {/* APIキー設定 */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">APIキー設定</h3>
                  <p className="text-sm text-muted-foreground">
                    Anthropic APIキーをローカルストレージに保存します。サーバーサイドでの処理には環境変数が必要です。
                  </p>
                  <div className="flex space-x-2">
                    <Input
                      type="password" // パスワードタイプにして見えないようにする
                      placeholder="sk-ant-..."
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleApiKeySave}
                      disabled={apiKeySaveStatus === 'saving' || !apiKeyInput.trim()}
                    >
                      {apiKeySaveStatus === 'saving' ? '保存中...' : (apiKeySaveStatus === 'saved' ? '保存済' : '保存')}
                    </Button>
                  </div>
                   {apiKeySaveStatus === 'error' && error && <p className="text-sm text-red-500">{error}</p>}
                   {/* 保存状態に応じてメッセージを表示しても良い */}
                   {apiKeySaveStatus === 'saved' && <p className="text-sm text-green-600">APIキーを保存しました。</p>}
                </div>

                <hr className="my-4" />

                {/* システムプロンプト管理 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">システムプロンプト管理</h3>
                    <Button onClick={handleAddNewClick} size="sm">新規追加</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">使用するシステムプロンプトを管理します。</p>
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  {/* プロンプト一覧表示 */}
                  <div className="border rounded-md max-h-[300px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>名前</TableHead>
                          <TableHead>デフォルト</TableHead>
                          <TableHead className="text-right">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prompts.length > 0 ? (
                          prompts.map((prompt) => (
                            <TableRow key={prompt.id}>
                              <TableCell className="font-medium">{prompt.name}</TableCell>
                              <TableCell>{prompt.isDefault ? 'はい' : 'いいえ'}</TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleEditClick(prompt)}>編集</Button>
                                <Button variant="destructive" size="sm" disabled={prompt.isDefault} onClick={() => handleDeleteClick(prompt.id)}>削除</Button> {/* onClick を修正 */}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                              システムプロンプトがありません。
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* フォーム表示時はフッターを非表示にするか、フォーム内に移動 */}
          {!showPromptForm && (
            <DialogFooter>
              <DialogClose asChild>
              <Button type="button" variant="secondary">
                閉じる
              </Button>
            </DialogClose>
            {/* <Button type="submit">変更を保存</Button> */}
          </DialogFooter>
         )} {/* ★ 閉じ括弧を追加 */}
        </DialogContent>
      </Dialog>
      <Toaster /> {/* Toaster を追加 */}
    </div>
  );
}