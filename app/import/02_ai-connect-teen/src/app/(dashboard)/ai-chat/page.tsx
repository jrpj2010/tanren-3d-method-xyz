'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCcw, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'こんにちは！何を手伝いましょうか？勉強の質問、アドバイス、または会話したいことがあれば教えてください。',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージを送信
  const sendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // AIからの応答をシミュレート
    setTimeout(() => {
      let response = '';

      // 簡単なデモ応答ロジック
      if (input.toLowerCase().includes('数学') || input.toLowerCase().includes('math')) {
        response = '数学の質問ですね。どのような問題で困っていますか？方程式、幾何学、統計など、具体的に教えていただけると詳しくサポートできます。';
      } else if (input.toLowerCase().includes('英語') || input.toLowerCase().includes('english')) {
        response = '英語についての質問ですね。文法、単語、スピーキングなど、どのような点でお手伝いできますか？';
      } else if (input.toLowerCase().includes('科学') || input.toLowerCase().includes('science')) {
        response = '科学に関する質問ですね。物理、化学、生物学など、より具体的な分野について教えていただけますか？';
      } else if (input.toLowerCase().includes('こんにちは') || input.toLowerCase().includes('hello')) {
        response = 'こんにちは！今日はどのようなお手伝いができますか？';
      } else if (input.includes('?') || input.includes('？')) {
        response = 'ご質問ありがとうございます。より具体的に説明いただけると、正確な情報を提供できます。';
      } else {
        response = 'なるほど、理解しました。もう少し詳しく教えていただけますか？そうすれば、より的確にお手伝いできます。';
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  // メッセージ欄の自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // エンターキーでメッセージ送信
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 会話をクリア
  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      role: 'assistant',
      content: '新しい会話を始めましょう！何かお手伝いできることはありますか？',
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">AIアシスタント</h1>
          <p className="text-gray-500 dark:text-gray-400">安全なAIアシスタントと学習について相談しましょう</p>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
          aria-label="会話をクリア"
        >
          <RefreshCcw className="h-5 w-5" />
        </button>
      </div>

      {/* チャットエリア */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${
              message.role === 'assistant' 
                ? 'bg-primary/10 text-primary' 
                : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              {message.role === 'assistant' ? (
                <Bot className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium">
                {message.role === 'assistant' ? 'AIアシスタント' : 'あなた'}
              </div>
              <div className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {message.content}
              </div>
              
              {/* タイムスタンプとアクション */}
              <div className="mt-2 flex items-center text-xs text-gray-500 gap-4">
                <span>{message.timestamp.toLocaleTimeString('ja-JP', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false
                })}</span>
                
                {message.role === 'assistant' && (
                  <div className="flex gap-3">
                    <button className="flex items-center gap-1 hover:text-primary">
                      <Copy className="h-3.5 w-3.5" />
                      <span>コピー</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <ThumbsDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* 返信中のインジケーター */}
        {isProcessing && (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">AIアシスタント</div>
              <div className="flex gap-1 mt-2">
                <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce delay-100"></div>
                <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <div className="mt-4">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力してください..."
            className="w-full p-4 pr-12 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-[80px]"
            disabled={isProcessing}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isProcessing}
            className="absolute right-3 bottom-3 p-2 rounded-md bg-primary text-white disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          このAIは学習サポート用に設計されています。個人情報は共有しないでください。
        </p>
      </div>
    </div>
  );
}
