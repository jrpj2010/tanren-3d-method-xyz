import React, { useState, useEffect } from 'react';
import { 
  Container, Box, TextField, Button, Card, CardContent, 
  CardMedia, Typography, FormControl, InputLabel,
  Select, MenuItem, SelectChangeEvent, Paper, CircularProgress,
  IconButton, ToggleButtonGroup, ToggleButton, List, ListItem, ListItemText,
  ListItemAvatar, Avatar, Divider, Switch, FormControlLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import BugReportIcon from '@mui/icons-material/BugReport';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearch, Video } from '../context/SearchContext';
import DebugPanel from '../components/DebugPanel';

// APIのベースURL
// 本番環境のバックエンドURLを使用（最新のURLに更新）
const API_BASE_URL = 'http://8000-iyazuhca5sscfudr3levp-853b7697.manus.computer/api';

// 検索結果の型定義
interface SearchResponse {
  items: Video[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  
  // グローバル状態を使用
  const {
    keyword, setKeyword,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    duration, setDuration,
    sortBy, setSortBy,
    videos, setVideos,
    nextPageToken, setNextPageToken,
    useScraping, setUseScraping,
    loading, setLoading,
    hasSearched, setHasSearched,
    viewMode, setViewMode
  } = useSearch();
  
  // ローカル状態
  const [downloadLoading, setDownloadLoading] = useState<string>('');
  
  // 動画の長さオプション
  const durationOptions = [
    { value: 'any', label: '指定なし' },
    { value: 'short', label: '4-20分' },
    { value: 'long', label: '20分以上' }
  ];
  
  // 並び順オプション
  const sortOptions = [
    { value: 'relevance', label: '関連度順' },
    { value: 'date', label: 'アップロード日時順' },
    { value: 'viewCount', label: '視聴回数順' },
    { value: 'rating', label: '評価順' }
  ];
  
  // 検索実行関数
  const handleSearch = async () => {
    if (!keyword.trim()) return;
    
    setLoading(true);
    
    try {
      // 検索パラメータの構築
      const params = new URLSearchParams();
      params.append('keyword', keyword);
      params.append('useScraping', useScraping ? '1' : '0');
      params.append('sortBy', sortBy);
      params.append('maxResults', '50'); // 一度に50件取得
      
      if (dateFrom) {
        params.append('publishedAfter', dateFrom.format('YYYY-MM-DD'));
      }
      
      if (dateTo) {
        params.append('publishedBefore', dateTo.format('YYYY-MM-DD'));
      }
      
      if (duration !== 'any') {
        params.append('videoDuration', duration);
      }
      
      // リクエストログを追加
      const requestUrl = `${API_BASE_URL}/search`;
      addApiLog({
        type: 'request',
        url: requestUrl,
        method: 'GET',
        params: Object.fromEntries(params)
      });
      
      // 検索APIの呼び出し
      const response = await axios.get(requestUrl, { params });
      
      // レスポンスログを追加
      addApiLog({
        type: 'response',
        url: requestUrl,
        status: response.status,
        data: response.data
      });
      
      setVideos(response.data.items || []);
      setNextPageToken(response.data.nextPageToken);
      setHasSearched(true);
    } catch (error) {
      console.error('検索エラー:', error);
      
      // エラーログを追加
      addApiLog({
        type: 'error',
        url: `${API_BASE_URL}/search`,
        error: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setLoading(false);
    }
  };
  
  // 初期表示時に検索結果が保存されていれば表示
  useEffect(() => {
    if (hasSearched && videos.length > 0) {
      // 検索結果が既に存在する場合は何もしない
      return;
    }
  }, [hasSearched, videos.length]);

  // 次のページを読み込む関数
  const loadMoreVideos = async () => {
    if (!nextPageToken) return;
    
    setLoading(true);
    
    try {
      // 検索パラメータの構築
      const params = new URLSearchParams();
      params.append('keyword', keyword);
      params.append('useScraping', useScraping ? '1' : '0');
      params.append('sortBy', sortBy);
      params.append('maxResults', '50'); // 一度に50件取得
      
      if (dateFrom) {
        params.append('publishedAfter', dateFrom.format('YYYY-MM-DD'));
      }
      
      if (dateTo) {
        params.append('publishedBefore', dateTo.format('YYYY-MM-DD'));
      }
      
      if (duration !== 'any') {
        params.append('videoDuration', duration);
      }
      
      params.append('pageToken', nextPageToken);
      
      // リクエストログを追加
      const requestUrl = `${API_BASE_URL}/search`;
      addApiLog({
        type: 'request',
        url: requestUrl,
        method: 'GET',
        params: Object.fromEntries(params)
      });
      
      // 検索APIの呼び出し
      const response = await axios.get(requestUrl, { params });
      
      // レスポンスログを追加
      addApiLog({
        type: 'response',
        url: requestUrl,
        status: response.status,
        data: response.data
      });
      
      setVideos([...videos, ...(response.data.items || [])]);
      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.error('検索エラー:', error);
      
      // エラーログを追加
      addApiLog({
        type: 'error',
        url: `${API_BASE_URL}/search`,
        error: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setLoading(false);
    }
  };
  
  // 動画詳細ページへの遷移
  const handleVideoClick = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };
  
  // 動画の長さフィルター変更ハンドラ
  const handleDurationChange = (event: SelectChangeEvent) => {
    setDuration(event.target.value);
  };
  
  // 並び順変更ハンドラ
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  
  // スクレイピング方式切り替えハンドラ
  const handleScrapingToggle = () => {
    setUseScraping(!useScraping);
  };
  
  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 再生回数をフォーマットする関数
  const formatViewCount = (count: string) => {
    const num = parseInt(count, 10);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M回視聴`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K回視聴`;
    }
    return `${num}回視聴`;
  };
  
  // 動画時間をフォーマットする関数
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    
    if (hours > 0) {
      return `${hours}時間${mins}分`;
    }
    return `${mins}分`;
  };
  
  // 字幕とコメントをダウンロードする関数
  const handleDownload = async (videoId: string, title: string, publishedAt: string) => {
    try {
      setDownloadLoading(videoId);
      
      // リクエストログを追加
      const requestUrl = `${API_BASE_URL}/download`;
      const requestParams = { videoId, useScraping: useScraping ? 1 : 0 };
      addApiLog({
        type: 'request',
        url: requestUrl,
        method: 'GET',
        params: requestParams
      });
      
      const response = await axios.get(requestUrl, {
        params: requestParams,
        responseType: 'blob'
      });
      
      // レスポンスログを追加（Blobデータなので詳細は表示しない）
      addApiLog({
        type: 'response',
        url: requestUrl,
        status: response.status,
        data: 'Blob data (not displayed)'
      });
      
      // 日付フォーマット変換
      const date = new Date(publishedAt);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      
      // ファイル名を[日付]_[タイトル].mdに設定
      const fileName = `${formattedDate}_${title.replace(/[\\/:*?"<>|]/g, '_')}.md`;
      
      // Blobをダウンロード
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('ダウンロードエラー:', error);
      
      // エラーログを追加
      addApiLog({
        type: 'error',
        url: `${API_BASE_URL}/download`,
        error: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setDownloadLoading('');
    }
  };
  
  // グローバル状態から追加のプロパティを取得
  const { 
    apiLogs, 
    addApiLog, 
    clearApiLogs, 
    showDebugPanel, 
    setShowDebugPanel 
  } = useSearch();

  // 初期表示時にAPIのベースURLをログに記録
  useEffect(() => {
    addApiLog({
      type: 'info',
      url: 'Configuration',
      data: { API_BASE_URL }
    });
  }, [addApiLog]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        YouTube字幕マネージャー
      </Typography>
      
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <TextField
              fullWidth
              label="検索キーワード"
              variant="outlined"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              sx={{ fontSize: { xs: '16px', sm: 'inherit' } }}
            />
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>動画の長さ</InputLabel>
              <Select
                value={duration}
                label="動画の長さ"
                onChange={handleDurationChange}
              >
                {durationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          
            <FormControl fullWidth>
              <InputLabel>並び順</InputLabel>
              <Select
                value={sortBy}
                label="並び順"
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
              <DatePicker
                label="開始日"
                value={dateFrom}
                onChange={(newValue) => setDateFrom(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <DatePicker
                label="終了日"
                value={dateTo}
                onChange={(newValue) => setDateTo(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newMode) => newMode && setViewMode(newMode)}
                aria-label="表示モード"
                size="small"
              >
                <ToggleButton value="card" aria-label="カード表示">
                  <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="リスト表示">
                  <ViewListIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={showDebugPanel}
                    onChange={(e) => setShowDebugPanel(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <BugReportIcon fontSize="small" />
                    <Typography variant="body2">デバッグ</Typography>
                  </Box>
                }
              />
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={loading}
              sx={{ minWidth: { xs: '100px', sm: '120px' } }}
            >
              検索
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* デバッグパネル */}
      {showDebugPanel && (
        <DebugPanel apiLogs={apiLogs} onClearLogs={clearApiLogs} />
      )}
      
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      
      {videos.length > 0 && (
        <>
          {viewMode === 'card' ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              {videos.map((video) => (
                <Card key={video.videoId} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleVideoClick(video.videoId)}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={video.thumbnail}
                      alt={video.title}
                    />
                    <Box sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'rgba(0, 0, 0, 0.7)', color: 'white', px: 1, py: 0.5, borderTopLeftRadius: 4 }}>
                      {formatDuration(video.duration)}
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {video.channelTitle}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        👁️ {formatViewCount(video.viewCount)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(video.publishedAt)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1" color="secondary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        👍 {video.likeCount}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        💬 {video.commentCount}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={downloadLoading === video.videoId ? <CircularProgress size={16} /> : <DownloadIcon />}
                      onClick={() => handleDownload(video.videoId, video.title, video.publishedAt)}
                      disabled={downloadLoading === video.videoId}
                    >
                      字幕とコメント
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          ) : (
            <List sx={{ bgcolor: 'background.paper' }}>
              {videos.map((video) => (
                <React.Fragment key={video.videoId}>
                  <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                    <ListItemAvatar sx={{ mr: 2 }}>
                      <Box sx={{ position: 'relative', width: 160, height: 90, cursor: 'pointer' }} onClick={() => handleVideoClick(video.videoId)}>
                        <Avatar variant="rounded" src={video.thumbnail} sx={{ width: 160, height: 90 }} />
                        <Box sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'rgba(0, 0, 0, 0.7)', color: 'white', px: 1, py: 0.5, borderTopLeftRadius: 4 }}>
                          {formatDuration(video.duration)}
                        </Box>
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" component="div" sx={{ cursor: 'pointer' }} onClick={() => handleVideoClick(video.videoId)}>
                          {video.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {video.channelTitle}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={2} mt={1}>
                            <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                              👁️ {formatViewCount(video.viewCount)}
                            </Typography>
                            <Typography variant="body2" color="secondary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                              👍 {video.likeCount}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                              💬 {video.commentCount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(video.publishedAt)}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={downloadLoading === video.videoId ? <CircularProgress size={16} /> : <DownloadIcon />}
                      onClick={() => handleDownload(video.videoId, video.title, video.publishedAt)}
                      disabled={downloadLoading === video.videoId}
                      sx={{ alignSelf: 'center', ml: 2, whiteSpace: 'nowrap' }}
                    >
                      字幕とコメント
                    </Button>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          )}
          
          {nextPageToken && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={loadMoreVideos}
                disabled={loading}
              >
                もっと読み込む
              </Button>
            </Box>
          )}
        </>
      )}
      
      {hasSearched && videos.length === 0 && !loading && (
        <Paper elevation={3} sx={{ p: 3, mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            検索結果がありません
          </Typography>
          <Typography variant="body1">
            検索条件を変更して、再度お試しください。
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default SearchPage;
