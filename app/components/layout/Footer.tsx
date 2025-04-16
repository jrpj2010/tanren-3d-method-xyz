import React from 'react';
import { COLOR_SCHEME } from '../../lib/api/config';

export function Footer() {
  return (
    <footer
      className="py-4 mt-16"
      style={{
        backgroundColor: COLOR_SCHEME.SECONDARY,
        borderTop: `1px solid ${COLOR_SCHEME.PRIMARY}`,
        color: COLOR_SCHEME.PRIMARY,
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs"
          style={{
            letterSpacing: '0.03em',
            fontFamily: 'Noto Sans JP, sans-serif',
          }}
        >
          &copy; {new Date().getFullYear()} VibeCoding - 議事録自動スライド変換アプリケーション
        </p>
      </div>
    </footer>
  );
} 