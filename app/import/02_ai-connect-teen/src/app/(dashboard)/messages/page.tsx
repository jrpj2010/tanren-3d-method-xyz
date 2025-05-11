import React from 'react';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';

export default function MessagesPage() {
  // ダミーデータ
  const conversations = [
    {
      id: 1,
      user: {
        name: '佐藤先生',
        avatar: '/avatars/teacher1.png',
        online: true,
      },
      lastMessage: {
        text: '明日の課題について質問があります。提出期限は延長されますか？',
        time: '14:30',
        unread: true,
      },
    },
    {
      id: 2,
      user: {
        name: '山田さん',
        avatar: '/avatars/student1.png',
        online: false,
      },
      lastMessage: {
        text: '数学の問題の解き方が分かりません。こちらの方程式はどう解けばいいでしょうか...',
        time: '昨日',
        unread: true,
      },
    },
    {
      id: 3,
      user: {
        name: 'AI Assistant',
        avatar: '/avatars/ai.png',
        online: true,
      },
      lastMessage: {
        text: '前回の英語の質問の続きです。関係代名詞の使い方について詳しく説明します。',
        time: '2日前',
        unread: false,
      },
    },
    {
      id: 4,
      user: {
        name: '鈴木先生',
        avatar: '/avatars/teacher2.png',
        online: false,
      },
      lastMessage: {
        text: '先日のテストの結果についてフィードバックしました。次回の対策も含めて確認してください。',
        time: '3日前',
        unread: false,
      },
    },
    {
      id: 5,
      user: {
        name: '田中さん',
        avatar: '/avatars/student2.png',
        online: true,
      },
      lastMessage: {
        text: '放課後の勉強会について確認したいことがあります。何時からになりますか？',
        time: '1週間前',
        unread: false,
      },
    },
  ];

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">メッセージ</h1>
        <p className="text-gray-500 dark:text-gray-400">友達や先生とチャットしましょう</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="ユーザーを検索..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="p-2 bg-primary text-white rounded-md">
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {conversations.map((conv) => (
          <Link
            href={`/messages/${conv.id}`}
            key={conv.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b last:border-0 dark:border-gray-700"
          >
            <div className="relative flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600"></div>
              {conv.user.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{conv.user.name}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                  {conv.lastMessage.time}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                {conv.lastMessage.text}
              </p>
            </div>
            
            {conv.lastMessage.unread && (
              <div className="ml-2 h-2.5 w-2.5 rounded-full bg-primary"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
