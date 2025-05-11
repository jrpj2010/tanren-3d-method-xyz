'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // TODO: 実際の認証APIと連携
    try {
      // 仮のログイン処理（後で実装）
      console.log('ログイン試行:', { email });
      await new Promise(resolve => setTimeout(resolve, 1000)); // 仮の遅延
      
      // 成功時の処理
      router.push('/dashboard');
    } catch (err) {
      console.error('ログインエラー:', err);
      setError('メールアドレスまたはパスワードが正しくありません');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium">
              パスワード
            </label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              パスワードをお忘れですか？
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
        >
          {isLoading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm">
          アカウントをお持ちでない方は{' '}
          <Link href="/register" className="text-primary hover:underline">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
