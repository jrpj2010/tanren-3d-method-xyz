'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showAttachments?: boolean;
  showEmoji?: boolean;
  maxLength?: number;
}

export function MessageInput({
  onSend,
  placeholder = 'メッセージを入力...',
  disabled = false,
  className,
  showAttachments = true,
  showEmoji = true,
  maxLength = 1000,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // テキストエリアの高さを内容に合わせて調整
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      
      const newHeight = Math.min(textarea.scrollHeight, 200); // 最大高さを設定
      textarea.style.height = `${newHeight}px`;
      
      // 行数を計算（およそ）
      const lineHeight = 24; // 1行あたりのピクセル高さ（推定）
      const newRows = Math.max(1, Math.min(Math.ceil(newHeight / lineHeight), 8)); // 最大8行
      setRows(newRows);
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      // 送信後にテキストエリアのサイズをリセット
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn('relative flex items-end', className)}>
      {showAttachments && (
        <button
          type="button"
          disabled={disabled}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Paperclip className="h-5 w-5" />
        </button>
      )}
      
      <div className="relative flex-1 mx-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          className="w-full p-3 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 resize-none transition-all duration-200 disabled:opacity-50"
        />
        
        {maxLength && (
          <div className={cn(
            "absolute bottom-1 right-2 text-xs",
            message.length > maxLength * 0.8 ? "text-amber-500" : "text-gray-400",
            message.length > maxLength * 0.95 ? "text-red-500" : ""
          )}>
            {message.length}/{maxLength}
          </div>
        )}
      </div>
      
      {showEmoji && (
        <button
          type="button"
          disabled={disabled}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Smile className="h-5 w-5" />
        </button>
      )}
      
      <button
        type="button"
        disabled={!message.trim() || disabled}
        onClick={handleSend}
        className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary"
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
}
