import React from 'react';
import Link from 'next/link';
import { MessageSquare, Bot, Bell, Users, BookOpen } from 'lucide-react';

export default function DashboardPage() {
  // ダミーデータ
  const stats = [
    { label: '新着メッセージ', value: 3, icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'AIセッション', value: 12, icon: <Bot className="w-5 h-5" /> },
    { label: '未読通知', value: 2, icon: <Bell className="w-5 h-5" /> },
  ];

  const recentMessages = [
    { id: 1, user: '佐藤先生', preview: '明日の課題について質問があります', time: '14:30' },
    { id: 2, user: '山田さん', preview: '数学の問題の解き方が分かりません', time: '昨日' },
    { id: 3, user: 'AI Assistant', preview: '前回の英語の質問の続きです', time: '2日前' },
  ];

  const studyResources = [
    { title: '数学 - 微分積分の基礎', category: '数学', level: '高校2年' },
    { title: '英語 - 関係代名詞の使い方', category: '英語', level: '中学3年' },
    { title: '理科 - 化学反応の種類', category: '理科', level: '高校1年' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">ダッシュボード</h1>
        <p className="text-gray-500 dark:text-gray-400">今日のアクティビティ一覧</p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 text-primary rounded-full">
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近のメッセージ */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
            <div>
              <h2 className="font-bold">最近のメッセージ</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">直近のやり取り</p>
            </div>
            <Link
              href="/messages"
              className="text-primary text-sm hover:underline"
            >
              すべて表示
            </Link>
          </div>
          <div>
            {recentMessages.map((message) => (
              <Link
                href={`/messages/${message.id}`}
                key={message.id}
                className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b last:border-0 dark:border-gray-700"
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium">{message.user}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{message.time}</div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                  {message.preview}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 学習リソース */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
            <div>
              <h2 className="font-bold">オススメ学習リソース</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">あなたに合わせた教材</p>
            </div>
            <Link
              href="/resources"
              className="text-primary text-sm hover:underline"
            >
              すべて表示
            </Link>
          </div>
          <div>
            {studyResources.map((resource, i) => (
              <div
                key={i}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b last:border-0 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                    <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium">{resource.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {resource.category} • {resource.level}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* クイックアクセス */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="font-bold mb-4">クイックアクセス</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/messages"
            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <MessageSquare className="w-6 h-6 mb-2 text-primary" />
            <span className="text-sm">メッセージ</span>
          </Link>
          <Link
            href="/ai-chat"
            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <Bot className="w-6 h-6 mb-2 text-primary" />
            <span className="text-sm">AIチャット</span>
          </Link>
          <Link
            href="/community"
            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <Users className="w-6 h-6 mb-2 text-primary" />
            <span className="text-sm">コミュニティ</span>
          </Link>
          <Link
            href="/resources"
            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <BookOpen className="w-6 h-6 mb-2 text-primary" />
            <span className="text-sm">学習リソース</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
