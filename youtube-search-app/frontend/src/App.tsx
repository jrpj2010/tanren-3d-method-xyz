import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { jaJP } from '@mui/material/locale';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';

import SearchPage from './pages/SearchPage';
import VideoDetailPage from './pages/VideoDetailPage';
import { SearchProvider } from './context/SearchContext';

// ライトテーマの作成
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
}, jaJP);

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
        <CssBaseline />
        <SearchProvider>
          <Router>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/video/:videoId" element={<VideoDetailPage />} />
            </Routes>
          </Router>
        </SearchProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
