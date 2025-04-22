import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dayjs } from 'dayjs';

// 動画の型定義
export interface Video {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  channelTitle: string;
  thumbnail: string;
  duration: number;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  link: string;
}

// APIログエントリの型定義
export interface ApiLogEntry {
  timestamp?: string;
  type: 'request' | 'response' | 'error' | 'info';
  url: string;
  method?: string;
  params?: any;
  data?: any;
  status?: number;
  error?: string;
}

// 検索コンテキストの型定義
interface SearchContextType {
  keyword: string;
  setKeyword: (keyword: string) => void;
  dateFrom: Dayjs | null;
  setDateFrom: (date: Dayjs | null) => void;
  dateTo: Dayjs | null;
  setDateTo: (date: Dayjs | null) => void;
  duration: string;
  setDuration: (duration: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  videos: Video[];
  setVideos: (videos: Video[]) => void;
  nextPageToken: string | undefined;
  setNextPageToken: (token: string | undefined) => void;
  useScraping: boolean;
  setUseScraping: (useScraping: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  hasSearched: boolean;
  setHasSearched: (hasSearched: boolean) => void;
  viewMode: 'card' | 'list';
  setViewMode: (viewMode: 'card' | 'list') => void;
  apiLogs: ApiLogEntry[];
  addApiLog: (log: ApiLogEntry) => void;
  clearApiLogs: () => void;
  showDebugPanel: boolean;
  setShowDebugPanel: (show: boolean) => void;
}

// コンテキストの作成
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// コンテキストプロバイダーの型定義
interface SearchProviderProps {
  children: ReactNode;
}

// コンテキストプロバイダーコンポーネント
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [keyword, setKeyword] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [duration, setDuration] = useState<string>('any');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [useScraping, setUseScraping] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  const [apiLogs, setApiLogs] = useState<ApiLogEntry[]>([]);
  const [showDebugPanel, setShowDebugPanel] = useState<boolean>(true);

  // APIログを追加する関数
  const addApiLog = (log: ApiLogEntry) => {
    // タイムスタンプがない場合はISO 8601形式で追加
    if (!log.timestamp) {
      log.timestamp = new Date().toISOString();
    }
    setApiLogs(prevLogs => [...prevLogs, log]);
  };

  // APIログをクリアする関数
  const clearApiLogs = () => {
    setApiLogs([]);
  };

  const value = {
    keyword,
    setKeyword,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    duration,
    setDuration,
    sortBy,
    setSortBy,
    videos,
    setVideos,
    nextPageToken,
    setNextPageToken,
    useScraping,
    setUseScraping,
    loading,
    setLoading,
    hasSearched,
    setHasSearched,
    viewMode,
    setViewMode,
    apiLogs,
    addApiLog,
    clearApiLogs,
    showDebugPanel,
    setShowDebugPanel
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

// カスタムフック
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
