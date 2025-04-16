import { SystemPrompt } from '@prisma/client'; // Prisma で生成された型をインポート

// API エラーを処理するための共通関数 (必要に応じて拡張)
async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `API request failed with status ${response.status}`);
  }
  // 204 No Content の場合は null を返す
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

// GET: すべてのシステムプロンプトを取得
export async function getSystemPrompts(): Promise<SystemPrompt[]> {
  const response = await fetch('/api/system-prompts');
  return handleApiResponse(response);
}

// POST: 新しいシステムプロンプトを作成
export async function createSystemPrompt(data: {
  name: string;
  content: string;
  isDefault?: boolean;
}): Promise<SystemPrompt> {
  const response = await fetch('/api/system-prompts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse(response);
}

// PUT: 特定のシステムプロンプトを更新
export async function updateSystemPrompt(
  promptId: string,
  data: {
    name: string;
    content: string;
    isDefault?: boolean;
  }
): Promise<SystemPrompt> {
  const response = await fetch(`/api/system-prompts/${promptId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse(response);
}

// DELETE: 特定のシステムプロンプトを削除
export async function deleteSystemPrompt(promptId: string): Promise<null> {
  const response = await fetch(`/api/system-prompts/${promptId}`, {
    method: 'DELETE',
  });
  // DELETE は 204 No Content を返す想定なので、handleApiResponse を使う
  return handleApiResponse(response);
}