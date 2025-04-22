import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Paper, Tabs, Tab, CircularProgress,
  Divider, List, ListItem, ListItemText, Card, CardContent, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import { useSearch } from '../context/SearchContext';

// APIのベースURL
const API_BASE_URL = 'https://8000-ik33pltbkz5hc4iud5ths-853b7697.manus.computer/api';

// 動画の型定義
interface Video {
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

// 字幕の型定義
interface TranscriptEntry {
  start: number;
  duration?: number;
  text: string;
}

// コメントの型定義
interface Comment {
  id: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  textOriginal: string;
  likeCount: number;
  publishedAt: string;
  totalReplyCount: number;
  replies: Reply[];
}

// 返信コメントの型定義
interface Reply {
  id: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  textOriginal: string;
  likeCount: number;
  publishedAt: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// タブパネルコンポーネント
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const VideoDetailPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  
  // 状態管理
  const [loading, setLoading] = useState<boolean>(true);
  const [video, setVideo] = useState<Video | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [tabValue, setTabValue] = useState<number>(0);
  const [transcriptLanguage, setTranscriptLanguage] = useState<string>('');
  const [hostCountry, setHostCountry] = useState<string>('');
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  
  // タブ変更ハンドラ
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // グローバル状態を使用
  const { hasSearched } = useSearch();

  // 戻るボタンハンドラ
  const handleBack = () => {
    navigate('/');
  };
  
  // 動画情報の取得
  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!videoId) return;
      
      setLoading(true);
      
      try {
        // 検索APIを使用して動画情報を取得
        const searchResponse = await axios.get(`${API_BASE_URL}/search`, {
          params: { keyword: `https://www.youtube.com/watch?v=${videoId}` }
        });
        
        if (searchResponse.data.items.length > 0) {
          setVideo(searchResponse.data.items[0]);
          
          // 字幕を取得
          const transcriptResponse = await axios.get(`${API_BASE_URL}/video/${videoId}/transcript`);
          setTranscript(transcriptResponse.data.transcript);
          setTranscriptLanguage(transcriptResponse.data.language);
          setHostCountry(transcriptResponse.data.hostCountry);
          
          // コメントを取得
          const commentsResponse = await axios.get(`${API_BASE_URL}/video/${videoId}/comments`);
          setComments(commentsResponse.data.comments);
        }
      } catch (error) {
        console.error('動画詳細の取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideoDetails();
  }, [videoId]);
  
  // Markdownエクスポート
  const handleExport = async () => {
    if (!video) return;
    
    setExportLoading(true);
    
    try {
      // ダウンロードAPIを呼び出し
      const response = await axios.get(`${API_BASE_URL}/download`, {
        params: { videoId: video.videoId },
        responseType: 'blob'
      });
      
      // 日付を取得してフォーマット (YYYY-MM-DD)
      const publishDate = new Date(video.publishedAt);
      const dateStr = publishDate.toISOString().split('T')[0];
      
      // ファイル名を設定
      const fileName = `${dateStr}_${video.title.replace(/[^\w\s]/gi, '_')}.md`;
      
      // Markdownファイルをダウンロード
      const blob = new Blob([response.data], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('エクスポートエラー:', error);
    } finally {
      setExportLoading(false);
    }
  };
  
  // 時間をフォーマットする関数
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
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
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (!video) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          動画が見つかりませんでした
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            検索に戻る
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
          {video.title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
          disabled={exportLoading}
        >
          字幕・コメントをダウンロード
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Box sx={{ p: 2 }}>
          <Box
            component="iframe"
            src={`https://www.youtube.com/embed/${videoId}`}
            width="100%"
            height="500px"
            sx={{ border: 0 }}
            allowFullScreen
          />
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              {video.channelTitle}
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                {video.viewCount}回視聴
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(video.publishedAt)}
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Typography variant="body2" color="text.secondary">
                👍 {video.likeCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                💬 {video.commentCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ⏱️ {Math.floor(video.duration)}分
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      
      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="video details tabs">
            <Tab label="説明" />
            <Tab label={`字幕 (${transcriptLanguage.toUpperCase()})`} />
            <Tab label={`コメント (${comments.length})`} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
            {video.description}
          </Typography>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {transcript.length > 0 ? (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                ホスト国: {hostCountry || '不明'} / 言語: {transcriptLanguage.toUpperCase()}
              </Typography>
              <List>
                {transcript.map((entry, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                              component="span"
                              variant="body2"
                              color="primary"
                              sx={{ mr: 2, minWidth: '50px' }}
                            >
                              {formatTime(entry.start)}
                            </Typography>
                            <Typography component="span" variant="body1">
                              {entry.text}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < transcript.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          ) : (
            <Typography variant="body1">
              字幕が利用できません
            </Typography>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          {comments.length > 0 ? (
            <List>
              {comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Box
                          component="img"
                          src={comment.authorProfileImageUrl}
                          alt={comment.authorDisplayName}
                          sx={{ width: 40, height: 40, borderRadius: '50%', mr: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle1">
                            {comment.authorDisplayName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(comment.publishedAt)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {comment.textOriginal}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        👍 {comment.likeCount}
                      </Typography>
                      
                      {comment.replies && comment.replies.length > 0 && (
                        <Box sx={{ ml: 4, mt: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            返信 ({comment.replies.length})
                          </Typography>
                          
                          {comment.replies.map((reply) => (
                            <Box key={reply.id} sx={{ mb: 2 }}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <Box
                                  component="img"
                                  src={reply.authorProfileImageUrl}
                                  alt={reply.authorDisplayName}
                                  sx={{ width: 30, height: 30, borderRadius: '50%', mr: 1 }}
                                />
                                <Box>
                                  <Typography variant="subtitle2">
                                    {reply.authorDisplayName}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {formatDate(reply.publishedAt)}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {reply.textOriginal}
                              </Typography>
                              
                              <Typography variant="caption" color="text.secondary">
                                👍 {reply.likeCount}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body1">
              コメントがありません
            </Typography>
          )}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default VideoDetailPage;
