'use client';

import { useState } from 'react';
import { Bell, Moon, Sun, Shield, Eye, EyeOff, Globe, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';

type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

type PrivacySetting = {
  id: string;
  label: string;
  description: string;
  value: string;
  options: { value: string; label: string }[];
};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  
  // 通知設定
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'new_messages',
      label: '新着メッセージ通知',
      description: '新しいメッセージを受信したときに通知する',
      enabled: true,
    },
    {
      id: 'ai_responses',
      label: 'AIレスポンス通知',
      description: 'AIアシスタントからの返信があったときに通知する',
      enabled: true,
    },
    {
      id: 'system_updates',
      label: 'システム更新通知',
      description: 'アプリの更新やメンテナンス情報を通知する',
      enabled: false,
    },
    {
      id: 'educational_content',
      label: '教育コンテンツ通知',
      description: '新しい学習リソースや教材が追加されたときに通知する',
      enabled: true,
    },
  ]);

  // プライバシー設定
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: 'online_status',
      label: 'オンラインステータス',
      description: '他のユーザーにオンライン状態を表示するかどうか',
      value: 'all',
      options: [
        { value: 'all', label: '全員に表示' },
        { value: 'contacts', label: '連絡先のみ' },
        { value: 'none', label: '表示しない' },
      ],
    },
    {
      id: 'last_seen',
      label: '最終オンライン表示',
      description: '最後にオンラインだった時間を表示するかどうか',
      value: 'contacts',
      options: [
        { value: 'all', label: '全員に表示' },
        { value: 'contacts', label: '連絡先のみ' },
        { value: 'none', label: '表示しない' },
      ],
    },
    {
      id: 'read_receipts',
      label: '既読表示',
      description: 'メッセージを読んだことを相手に通知するかどうか',
      value: 'all',
      options: [
        { value: 'all', label: '全員に表示' },
        { value: 'contacts', label: '連絡先のみ' },
        { value: 'none', label: '表示しない' },
      ],
    },
  ]);

  // 通知設定の切り替え
  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  // プライバシー設定の変更
  const changePrivacySetting = (id: string, value: string) => {
    setPrivacySettings(prev =>
      prev.map(item => (item.id === id ? { ...item, value } : item))
    );
  };

  // テーマオプション
  const themeOptions = [
    { value: 'light', label: 'ライト', icon: <Sun className="h-5 w-5" /> },
    { value: 'dark', label: 'ダーク', icon: <Moon className="h-5 w-5" /> },
    { value: 'system', label: 'システム', icon: <Laptop className="h-5 w-5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">設定</h1>

      <div className="space-y-8">
        {/* 外観設定 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">外観</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              アプリケーションのテーマを選択してください
            </p>
            <div className="flex flex-wrap gap-4">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    theme === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 通知設定 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">通知設定</h2>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {notifications.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.enabled}
                    onChange={() => toggleNotification(item.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* プライバシー設定 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">プライバシー設定</h2>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {privacySettings.map((item) => (
              <div key={item.id} className="py-4">
                <div className="mb-2">
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <select
                  value={item.value}
                  onChange={(e) => changePrivacySetting(item.id, e.target.value)}
                  className="w-full md:w-64 p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {item.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* アカウント設定 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">アカウント設定</h2>
          <div className="space-y-4">
            <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
              <Globe className="h-4 w-4" />
              言語設定を変更
            </button>
            <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
              <Eye className="h-4 w-4" />
              サポートセンターにアクセス
            </button>
            <button className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:underline">
              <EyeOff className="h-4 w-4" />
              すべてのセッションからログアウト
            </button>
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            設定を保存
          </button>
        </div>
      </div>
    </div>
  );
}
