'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  duration?: number;
  className?: string;
}

export function Toast({
  title,
  description,
  action,
  variant = 'default',
  onClose,
  duration = 5000,
  className,
}: ToastProps) {
  const [visible, setVisible] = React.useState(true);

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900',
  };

  const iconVariants = {
    default: null,
    success: (
      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1 text-green-700 dark:text-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    error: (
      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-1 text-red-700 dark:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    warning: (
      <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-1 text-yellow-700 dark:text-yellow-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    info: (
      <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-1 text-blue-700 dark:text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 000-2H9z" clipRule="evenodd" />
        </svg>
      </div>
    ),
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'pointer-events-auto flex w-full max-w-sm rounded-lg border shadow-lg',
        variantClasses[variant],
        className
      )}
    >
      <div className="flex flex-1 items-center p-4">
        {iconVariants[variant] && (
          <div className="flex shrink-0 mr-3">{iconVariants[variant]}</div>
        )}
        <div className="flex-1">
          {title && <div className="font-medium">{title}</div>}
          {description && (
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</div>
          )}
          {action && <div className="mt-3">{action}</div>}
        </div>
        <button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          className="ml-4 h-6 w-6 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
