import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-6">
          AI Connect Teen
        </h1>
        <p className="text-xl mb-12">
          中高生のための安全なAIアシストDMアプリケーション
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 rounded-md bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            ログイン
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            新規登録
          </Link>
        </div>
      </div>
    </main>
  );
}
