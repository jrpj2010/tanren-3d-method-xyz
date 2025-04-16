'use client';

import React, { useState, useEffect } from 'react';
import { SystemPrompt } from '@prisma/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label'; // 元のパスに戻す
import { Textarea } from '../ui/textarea'; // 元のパスに戻す
import { Checkbox } from '@/components/ui/checkbox'; // Checkbox は src 配下から

interface SystemPromptFormProps {
  initialData?: SystemPrompt | null; // 編集時は既存データ、新規作成時は null
  onSubmit: (data: { name: string; content: string; isDefault: boolean }) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean; // 親コンポーネントから API 呼び出し中の状態を受け取る
}

export function SystemPromptForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: SystemPromptFormProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setContent(initialData.content);
      setIsDefault(initialData.isDefault);
    } else {
      // 新規作成時はフォームをクリア
      setName('');
      setContent('');
      setIsDefault(false);
    }
    setError(null); // データが変わったらエラーをクリア
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !content.trim()) {
      setError('プロンプト名と内容は必須です。');
      return;
    }

    try {
      await onSubmit({ name, content, isDefault });
      // 成功時は親コンポーネント側でフォームを閉じるなどの処理を行う
    } catch (err: any) {
      console.error('Error submitting prompt:', err);
      setError(err.message || 'プロンプトの保存中にエラーが発生しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="space-y-2">
        <Label htmlFor="prompt-name">プロンプト名</Label>
        <Input
          id="prompt-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例: デフォルト設定"
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="prompt-content">プロンプト内容</Label>
        <Textarea
          id="prompt-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Claude に指示するシステムプロンプトを入力..."
          rows={10}
          disabled={isLoading}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="prompt-isDefault"
          checked={isDefault}
          onCheckedChange={(checked) => setIsDefault(checked === true)}
          disabled={isLoading}
        />
        <Label htmlFor="prompt-isDefault" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          デフォルトとして使用する
        </Label>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          キャンセル
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '保存中...' : (initialData ? '更新' : '作成')}
        </Button>
      </div>
    </form>
  );
}