'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MessageSquare, Bot, User, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'ダッシュボード', icon: <Menu className="w-5 h-5" /> },
    { href: '/messages', label: 'メッセージ', icon: <MessageSquare className="w-5 h-5" /> },
    { href: '/ai-chat', label: 'AIチャット', icon: <Bot className="w-5 h-5" /> },
    { href: '/profile', label: 'プロフィール', icon: <User className="w-5 h-5" /> },
    { href: '/settings', label: '設定', icon: <Settings className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* モバイルヘッダー */}
      <div className="md:hidden p-4 bg-white dark:bg-gray-800 shadow-sm flex justify-between items-center">
        <div className="text-xl font-bold">AI Connect Teen</div>
        <button onClick={toggleSidebar} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* サイドバー (PC) */}
      <aside
        className={`bg-white dark:bg-gray-800 w-64 md:flex flex-col fixed md:sticky top-0 h-screen transition-all duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold">AI Connect Teen</h1>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t dark:border-gray-700">
          <button className="flex items-center space-x-2 w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            <LogOut className="w-5 h-5" />
            <span>ログアウト</span>
          </button>
        </div>
      </aside>

      {/* オーバーレイ (モバイル用) */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* メインコンテンツ */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
