const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const http = require('http');

// グローバル参照を保持します。そうしないと、JavaScriptのGCによってウィンドウが自動的に閉じられます。
let mainWindow;
let pythonProcess;
let backendReady = false;
let backendPort = 8001; // デフォルトポート

// .envファイルから環境変数を読み込む関数
function loadEnvFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const envContent = fs.readFileSync(filePath, 'utf8');
      const envVars = {};
      
      // 各行を解析
      envContent.split('\n').forEach(line => {
        // コメントや空行をスキップ
        if (!line || line.startsWith('#')) return;
        
        // KEY=VALUE形式を解析
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || '';
          
          // 値の前後の引用符を削除
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.substring(1, value.length - 1);
          }
          
          envVars[key] = value;
        }
      });
      
      return envVars;
    }
  } catch (error) {
    console.error(`Error loading .env file: ${error.message}`);
  }
  
  return {};
}

// バックエンドサーバーが起動しているかチェックする関数
function checkBackendServer(port, callback) {
  const options = {
    hostname: 'localhost',
    port: port,
    path: '/api/status',
    method: 'GET',
    timeout: 2000 // タイムアウトを2秒に設定
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        if (res.statusCode === 200) {
          const status = JSON.parse(data);
          callback(null, status);
        } else {
          callback(new Error(`Server returned status code ${res.statusCode}`), null);
        }
      } catch (e) {
        callback(e, null);
      }
    });
  });
  
  req.on('error', (e) => {
    callback(e, null);
  });
  
  req.on('timeout', () => {
    req.destroy();
    callback(new Error('Request timed out'), null);
  });
  
  req.end();
}

// システムのPythonパスを探す関数
function findPythonPath() {
  // macOSの場合、一般的なPythonのパスを試す
  const pythonPaths = [
    '/usr/bin/python3',
    '/usr/local/bin/python3',
    '/opt/homebrew/bin/python3',
    '/usr/bin/python',
    '/usr/local/bin/python',
    '/opt/homebrew/bin/python',
    'python3',
    'python'
  ];
  
  for (const pythonPath of pythonPaths) {
    try {
      // パスが絶対パスの場合は存在チェック
      if (path.isAbsolute(pythonPath) && fs.existsSync(pythonPath)) {
        return pythonPath;
      } else if (!path.isAbsolute(pythonPath)) {
        // コマンド名の場合はチェックできないのでそのまま返す
        return pythonPath;
      }
    } catch (error) {
      console.error(`Error checking Python path ${pythonPath}: ${error.message}`);
    }
  }
  
  // デフォルトのパスを返す
  return 'python3';
}

// Pythonの依存関係をインストールする関数
function installPythonDependencies(callback) {
  console.log('Installing Python dependencies...');
  
  // install-python-deps.jsを実行
  const installScript = path.join(__dirname, 'install-python-deps.js');
  
  try {
    // スクリプトを実行
    const { execSync } = require('child_process');
    execSync(`node "${installScript}"`, { stdio: 'inherit' });
    console.log('Python dependencies installed successfully!');
    callback(null);
  } catch (error) {
    console.error(`Error installing Python dependencies: ${error.message}`);
    callback(error);
  }
}

// Pythonバックエンドを起動する関数
function startPythonBackend() {
  // アプリケーションのリソースパスを取得
  const resourcesPath = process.resourcesPath;
  const isDev = process.env.NODE_ENV === 'development';
  
  // 開発環境とビルド環境でのパスの違いを処理
  let pythonPath;
  let scriptPath;
  let pythonModulesPath;
  let envFilePath;
  
  if (isDev) {
    // 開発環境では、クローンしたリポジトリのパスを使用
    pythonPath = findPythonPath(); // システムのPythonパスを探す
    scriptPath = path.join(__dirname, '..', 'youtube_transcript', 'backend', 'app.py');
    pythonModulesPath = path.join(__dirname, 'python_modules');
    envFilePath = path.join(__dirname, '.env');
    
    // スクリプトが存在するか確認
    if (!fs.existsSync(scriptPath)) {
      console.error(`Python script not found at ${scriptPath}, trying alternative path...`);
      // 代替パスを試す
      scriptPath = path.join(__dirname, 'backend', 'app.py');
      
      // バックエンドディレクトリが存在しない場合は作成
      const backendDir = path.join(__dirname, 'backend');
      if (!fs.existsSync(backendDir)) {
        fs.mkdirSync(backendDir, { recursive: true });
        console.log(`Created backend directory at ${backendDir}`);
      }
      
      // app.pyファイルが存在しない場合は、youtube_transcript/backend/app.pyからコピー
      if (!fs.existsSync(scriptPath)) {
        const sourceScriptPath = path.join(__dirname, '..', 'youtube_transcript', 'backend', 'app.py');
        if (fs.existsSync(sourceScriptPath)) {
          fs.copyFileSync(sourceScriptPath, scriptPath);
          console.log(`Copied app.py from ${sourceScriptPath} to ${scriptPath}`);
        } else {
          console.error(`Source Python script not found at ${sourceScriptPath}`);
        }
      }
    }
  } else {
    // ビルド環境では、バンドルされたリソースのパスを使用
    pythonPath = findPythonPath(); // システムのPythonパスを探す
    scriptPath = path.join(resourcesPath, 'backend', 'app.py');
    pythonModulesPath = path.join(resourcesPath, 'python_modules');
    envFilePath = path.join(resourcesPath, '.env');
    
    // バックエンドディレクトリが存在しない場合は作成
    const backendDir = path.join(resourcesPath, 'backend');
    if (!fs.existsSync(backendDir)) {
      fs.mkdirSync(backendDir, { recursive: true });
      console.log(`Created backend directory at ${backendDir}`);
    }
    
    // app.pyファイルが存在しない場合は、開発環境のapp.pyからコピー
    if (!fs.existsSync(scriptPath)) {
      const sourceScriptPath = path.join(__dirname, '..', 'youtube_transcript', 'backend', 'app.py');
      if (fs.existsSync(sourceScriptPath)) {
        fs.copyFileSync(sourceScriptPath, scriptPath);
        console.log(`Copied app.py from ${sourceScriptPath} to ${scriptPath}`);
      } else {
        console.error(`Source Python script not found at ${sourceScriptPath}`);
      }
    }
    
    // .envファイルがない場合は作成
    if (!fs.existsSync(envFilePath)) {
      try {
        fs.writeFileSync(envFilePath, 'YOUTUBE_API_KEY=dummy_key\n');
        console.log(`Created .env file at ${envFilePath}`);
      } catch (error) {
        console.error(`Error creating .env file: ${error.message}`);
      }
    }
  }
  
  console.log(`Starting Python backend: ${pythonPath} ${scriptPath}`);
  console.log(`Python modules path: ${pythonModulesPath}`);
  
  // 環境変数を設定（PYTHONPATHにpython_modulesディレクトリを追加）
  const env = Object.assign({}, process.env);
  
  // .envファイルから環境変数を読み込む
  const envVars = loadEnvFile(envFilePath);
  Object.assign(env, envVars);
  
  // 既存のPYTHONPATHがある場合は、それに追加する
  if (env.PYTHONPATH) {
    env.PYTHONPATH = `${pythonModulesPath}${path.delimiter}${env.PYTHONPATH}`;
  } else {
    env.PYTHONPATH = pythonModulesPath;
  }
  
  console.log(`PYTHONPATH: ${env.PYTHONPATH}`);
  console.log(`YOUTUBE_API_KEY: ${env.YOUTUBE_API_KEY ? 'Set' : 'Not set'}`);
  
  // スクリプトが存在するか確認
  if (!fs.existsSync(scriptPath)) {
    console.error(`Python script not found: ${scriptPath}`);
    
    // 開発環境のapp.pyファイルをコピー
    const sourceScriptPath = path.join(__dirname, '..', 'youtube_transcript', 'backend', 'app.py');
    if (fs.existsSync(sourceScriptPath)) {
      try {
        // バックエンドディレクトリが存在しない場合は作成
        const backendDir = path.dirname(scriptPath);
        if (!fs.existsSync(backendDir)) {
          fs.mkdirSync(backendDir, { recursive: true });
          console.log(`Created backend directory at ${backendDir}`);
        }
        
        // app.pyファイルをコピー
        fs.copyFileSync(sourceScriptPath, scriptPath);
        console.log(`Copied app.py from ${sourceScriptPath} to ${scriptPath}`);
      } catch (error) {
        console.error(`Error copying app.py: ${error.message}`);
        if (mainWindow) {
          dialog.showErrorBox(
            'Python Script Error',
            `Failed to copy Python script: ${error.message}`
          );
        }
        return;
      }
    } else {
      console.error(`Source Python script not found at ${sourceScriptPath}`);
      if (mainWindow) {
        dialog.showErrorBox(
          'Python Script Error',
          `Python script not found: ${scriptPath}`
        );
      }
      return;
    }
  }
  
  // Pythonモジュールディレクトリが存在するか確認
  if (!fs.existsSync(pythonModulesPath)) {
    console.log(`Python modules directory not found: ${pythonModulesPath}, creating it...`);
    try {
      fs.mkdirSync(pythonModulesPath, { recursive: true });
      console.log(`Created Python modules directory at ${pythonModulesPath}`);
    } catch (error) {
      console.error(`Error creating Python modules directory: ${error.message}`);
      if (mainWindow) {
        dialog.showErrorBox(
          'Python Modules Error',
          `Failed to create Python modules directory: ${error.message}`
        );
      }
      return;
    }
  }
  
  // Pythonプロセスを起動
  try {
    pythonProcess = spawn(pythonPath, [scriptPath], { env });
    
    // 標準出力のリスニング
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python stdout: ${data}`);
      
      // バックエンドの準備ができたことを検出
      if (data.toString().includes('Running on http')) {
        // バックエンドサーバーが起動したことを検出したら、実際にサーバーが応答するまで待機
        waitForBackendServer();
      }
    });
    
    // 標準エラー出力のリスニング
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
      
      // バックエンドの準備ができたことを検出（stderr経由の場合もある）
      if (data.toString().includes('Running on http')) {
        // バックエンドサーバーが起動したことを検出したら、実際にサーバーが応答するまで待機
        waitForBackendServer();
      }
    });
    
    // プロセス終了時のハンドリング
    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      pythonProcess = null;
      
      if (code !== 0 && mainWindow) {
        dialog.showErrorBox(
          'Python Process Error',
          `Python process exited with code ${code}`
        );
      }
    });
    
    // エラーハンドリング
    pythonProcess.on('error', (err) => {
      console.error(`Failed to start Python process: ${err.message}`);
      
      if (err.code === 'ENOENT') {
        console.error(`The '${pythonPath}' command was not found.`);
        
        // 別のPythonパスを試す
        const alternativePythonPath = pythonPath === 'python3' ? 'python' : 'python3';
        console.log(`Trying with ${alternativePythonPath} instead...`);
        
        try {
          pythonProcess = spawn(alternativePythonPath, [scriptPath], { env });
          
          // 標準出力のリスニング
          pythonProcess.stdout.on('data', (data) => {
            console.log(`Python stdout: ${data}`);
            
            // バックエンドの準備ができたことを検出
            if (data.toString().includes('Running on http')) {
              // バックエンドサーバーが起動したことを検出したら、実際にサーバーが応答するまで待機
              waitForBackendServer();
            }
          });
          
          // 標準エラー出力のリスニング
          pythonProcess.stderr.on('data', (data) => {
            console.error(`Python stderr: ${data}`);
            
            // バックエンドの準備ができたことを検出（stderr経由の場合もある）
            if (data.toString().includes('Running on http')) {
              // バックエンドサーバーが起動したことを検出したら、実際にサーバーが応答するまで待機
              waitForBackendServer();
            }
          });
          
          // プロセス終了時のハンドリング
          pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            pythonProcess = null;
            
            if (code !== 0 && mainWindow) {
              dialog.showErrorBox(
                'Python Process Error',
                `Python process exited with code ${code}`
              );
            }
          });
          
          // エラーハンドリング
          pythonProcess.on('error', (err) => {
            console.error(`Failed to start Python process: ${err.message}`);
            if (mainWindow) {
              dialog.showErrorBox(
                'Python Error',
                'Failed to start Python backend. Please make sure Python is installed.'
              );
            }
          });
        } catch (error) {
          console.error(`Error starting alternative Python process: ${error.message}`);
          if (mainWindow) {
            dialog.showErrorBox(
              'Python Error',
              'Failed to start Python backend. Please make sure Python is installed.'
            );
          }
        }
      } else {
        if (mainWindow) {
          dialog.showErrorBox(
            'Python Error',
            'Failed to start Python backend. Please make sure Python is installed.'
          );
        }
      }
    });
  } catch (error) {
    console.error(`Error starting Python process: ${error.message}`);
    if (mainWindow) {
      dialog.showErrorBox(
        'Python Error',
        `Failed to start Python backend: ${error.message}`
      );
    }
  }
}

// バックエンドサーバーが応答するまで待機する関数
function waitForBackendServer() {
  console.log(`Waiting for backend server to be ready on port ${backendPort}...`);
  
  let attempts = 0;
  const maxAttempts = 240; // 最大試行回数を240回に増やす（2分）
  const interval = 500; // 500ミリ秒ごとにチェック
  
  // Pythonプロセスの標準出力をチェックして、サーバーが起動したことを確認
  let serverStarted = false;
  
  // Pythonプロセスの標準出力をチェックするイベントリスナーを追加
  if (pythonProcess) {
    pythonProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`Python stdout: ${output}`);
      
      // Flaskサーバーが起動したことを示すメッセージをチェック
      if (output.includes('Running on http') || output.includes('Flask server thread started')) {
        serverStarted = true;
        console.log('Flask server started message detected!');
      }
    });
    
    pythonProcess.stderr.on('data', (data) => {
      const output = data.toString();
      console.log(`Python stderr: ${output}`);
      
      // Flaskサーバーが起動したことを示すメッセージをチェック（stderr経由の場合もある）
      if (output.includes('Running on http') || output.includes('Flask server thread started')) {
        serverStarted = true;
        console.log('Flask server started message detected in stderr!');
      }
    });
  }
  
  // Pythonプロセスが終了した場合でも、サーバーが起動している可能性があるため、
  // 少し待ってからサーバーに接続を試みる
  setTimeout(() => {
    console.log('Waiting a bit before checking server connection...');
    serverStarted = true;
  }, 5000); // 5秒待つ
  
  const checkInterval = setInterval(() => {
    attempts++;
    
    // サーバーが起動したことが確認できた場合のみ、接続を試みる
    if (serverStarted || attempts > 20) { // 最初の10秒間は待機
      checkBackendServer(backendPort, (err, status) => {
        if (err) {
          console.log(`Backend server not ready (attempt ${attempts}/${maxAttempts}): ${err.message}`);
          
          if (attempts >= maxAttempts) {
            clearInterval(checkInterval);
            console.error('Backend server failed to start after maximum attempts');
            
            if (mainWindow) {
              dialog.showErrorBox(
                'バックエンドエラー',
                'バックエンドサーバーの起動がタイムアウトしました。アプリケーションを再起動してください。'
              );
            }
          }
        } else {
          clearInterval(checkInterval);
          console.log('Backend server is ready!');
          console.log(`Status: ${JSON.stringify(status)}`);
          
          backendReady = true;
          
          // メインウィンドウにバックエンドの準備ができたことを通知
          if (mainWindow) {
            mainWindow.webContents.send('backend-ready', { port: backendPort });
            
            // ウィンドウをリロード
            mainWindow.loadURL(`http://localhost:${backendPort}/`);
            
            // 開発ツールを開く（デバッグ用）
            mainWindow.webContents.openDevTools();
          }
        }
      });
    } else {
      console.log(`Waiting for Flask server to start (attempt ${attempts}/${maxAttempts})...`);
    }
  }, interval);
}

// アプリケーションメニューを作成する関数
function createApplicationMenu() {
  const template = [
    {
      label: 'ファイル',
      submenu: [
        { role: 'quit', label: '終了' }
      ]
    },
    {
      label: '編集',
      submenu: [
        { role: 'undo', label: '元に戻す' },
        { role: 'redo', label: 'やり直す' },
        { type: 'separator' },
        { role: 'cut', label: '切り取り' },
        { role: 'copy', label: 'コピー' },
        { role: 'paste', label: '貼り付け' },
        { role: 'delete', label: '削除' },
        { type: 'separator' },
        { role: 'selectAll', label: 'すべて選択' }
      ]
    },
    {
      label: '表示',
      submenu: [
        { role: 'reload', label: '再読み込み' },
        { role: 'forceReload', label: '強制再読み込み' },
        { role: 'toggleDevTools', label: '開発者ツール' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'ズームをリセット' },
        { role: 'zoomIn', label: '拡大' },
        { role: 'zoomOut', label: '縮小' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'フルスクリーン' }
      ]
    },
    {
      label: 'ウィンドウ',
      submenu: [
        { role: 'minimize', label: '最小化' },
        { role: 'zoom', label: 'ズーム' },
        { role: 'close', label: '閉じる' }
      ]
    },
    {
      label: 'ヘルプ',
      submenu: [
        {
          label: 'YouTubeトランスクリプトについて',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://github.com/yourusername/youtube-transcript');
          }
        }
      ]
    }
  ];
  
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// メインウィンドウを作成する関数
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // 開発中は無効化（本番環境では適切に設定する）
    },
    title: 'YouTube Transcript',
    icon: path.join(__dirname, 'icons', 'icon.png')
  });
  
  // 開発環境とビルド環境でのロード方法の違いを処理
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    // 開発環境では、ローディング画面を表示
    mainWindow.loadFile(path.join(__dirname, 'frontend', 'index.html'));
  } else {
    // ビルド環境では、バンドルされたHTMLファイルをロード
    mainWindow.loadFile(path.join(__dirname, 'frontend', 'index.html'));
  }
  
  // 開発ツールを開く（開発環境のみ）
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  
  // ウィンドウが閉じられたときのイベント
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Electronアプリケーションの準備ができたときのイベント
app.on('ready', () => {
  // アプリケーションメニューを作成
  createApplicationMenu();
  
  // メインウィンドウを作成
  createWindow();
  
  // Pythonの依存関係をインストールしてからバックエンドを起動
  installPythonDependencies((err) => {
    if (err) {
      console.error(`Failed to install Python dependencies: ${err.message}`);
      if (mainWindow) {
        dialog.showErrorBox(
          'Python Dependencies Error',
          'Failed to install Python dependencies. Please make sure Python is installed.'
        );
      }
      return;
    }
    
    // Pythonバックエンドを起動
    startPythonBackend();
  });
});

// すべてのウィンドウが閉じられたときのイベント
app.on('window-all-closed', () => {
  // macOSでは、ユーザーがCmd + Qで明示的に終了するまでアプリケーションを終了しないのが一般的
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// アプリケーションがアクティブになったときのイベント（macOS）
app.on('activate', () => {
  // macOSでは、ドックアイコンがクリックされたときにウィンドウがない場合は新しいウィンドウを作成するのが一般的
  if (mainWindow === null) {
    createWindow();
  }
});

// アプリケーションが終了する前のイベント
app.on('before-quit', () => {
  // Pythonプロセスを終了
  if (pythonProcess) {
    pythonProcess.kill();
  }
});

// IPCイベントのハンドリング
ipcMain.on('check-backend-status', (event) => {
  event.reply('backend-status', { ready: backendReady, port: backendPort });
});
