'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Send, Paperclip, MoreVertical, Clock } from 'lucide-react';
import Link from 'next/link';

type Message = {
  id: number;
  sender: 'user' | 'other';
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
};

export default function MessageDetail() {
  const params = useParams();
  const id = params.id as string;
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // ダミーユーザーデータ
  const contactUser = {
    id: parseInt(id),
    name: id === '1' ? '佐藤先生' : id === '2' ? '山田さん' : id === '3' ? 'AI Assistant' : '鈴木先生',
    online: id === '1' || id === '3',
    lastSeen: id === '2' ? '10分前' : id === '4' ? '3時間前' : '',
  };

  // ダミーメッセージデータ
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'other',
      text: 'こんにちは！何か質問はありますか？',
      time: '13:42',
      status: 'read',
    },
    {
      id: 2,
      sender: 'user',
      text: 'はい、明日の課題について確認したいことがあります。',
      time: '13:45',
      status: 'read',
    },
    {
      id: 3,
      sender: 'other',
      text: 'もちろん、どのような内容ですか？',
      time: '13:47',
      status: 'read',
    },
    {
      id: 4,
      sender: 'user',
      text: '数学の問題集ページ15-20は提出必須ですか？それとも任意ですか？',
      time: '13:50',
      status: 'read',
    },
    {
      id: 5,
      sender: 'other',
      text: 'ページ15-17は必須提出です。18-20は挑戦問題なので任意提出になります。ただし、可能であれば全て取り組むことをお勧めします。',
      time: '13:55',
      status: 'read',
    },
    {
      id: 6,
      sender: 'user',
      text: '分かりました。提出期限は明日の授業前でいいですか？',
      time: '14:00',
      status: 'delivered',
    },
  ]);

  // 新しいメッセージを送信
  const sendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // AIまたは相手からの返信をシミュレート
    if (contactUser.name === 'AI Assistant') {
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          sender: 'other',
          text: 'ご質問ありがとうございます。詳しく調べて回答いたします。少々お待ちください。',
          time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered',
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  // 新しいメッセージが追加されたら自動的に下にスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // メッセージを時間によってグループ化する関数
  const groupMessagesByDate = (messages: Message[]) => {
    // 実際のアプリでは日付ごとのグループ化を実装する
    // 簡略化のため、今回はすべて「今日」とする
    return { '今日': messages };
  };

  const groupedMessages = groupMessagesByDate(messages);

  // エンターキーで送信
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* ヘッダー */}
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/messages" className="md:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600"></div>
            {contactUser.online && (
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
            )}
          </div>
          <div>
            <div className="font-medium">{contactUser.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {contactUser.online ? 'オンライン' : `最終オンライン ${contactUser.lastSeen}`}
            </div>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center mb-4">
              <div className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-500 dark:text-gray-400">
                {date}
              </div>
            </div>
            <div className="space-y-4">
              {dateMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <div className="text-sm">{message.text}</div>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <div className="text-xs opacity-70">{message.time}</div>
                      {message.sender === 'user' && (
                        <div className="text-xs opacity-70">
                          {message.status === 'sent' && '✓'}
                          {message.status === 'delivered' && '✓✓'}
                          {message.status === 'read' && (
                            <span className="text-blue-400 dark:text-blue-300">✓✓</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* メッセージ入力 */}
      <div className="border-t dark:border-gray-700 p-4">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="メッセージを入力..."
              className="w-full p-3 pr-12 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-12 max-h-40"
              rows={1}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-primary text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
