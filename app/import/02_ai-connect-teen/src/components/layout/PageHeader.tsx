'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'mb-6 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0',
        className
      )}
      {...props}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center space-x-4">{actions}</div>
      )}
    </div>
  );
}
