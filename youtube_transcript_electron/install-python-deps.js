const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Pythonのパス（macOSでは通常python3）
const pythonPath = 'python3';

// バックエンドのディレクトリ
const backendDir = path.join(__dirname, '..', 'youtube_transcript', 'backend');

// requirements.txtのパス
const requirementsPath = path.join(backendDir, 'requirements.txt');

// 依存関係をインストールするディレクトリ
const isDev = process.env.NODE_ENV === 'development';
let resourcesPath;

// process.resourcesPathが定義されていない場合（開発環境）は、代替パスを使用
if (typeof process.resourcesPath === 'undefined') {
  resourcesPath = path.join(__dirname, 'resources');
} else {
  resourcesPath = process.resourcesPath;
}

// 依存関係をインストールするディレクトリを決定
let depsDir = path.join(__dirname, 'python_modules');

// Electronアプリケーションのリソースディレクトリ内のpython_modulesディレクトリも作成
const electronResourcesDir = path.join(__dirname, 'node_modules', 'electron', 'dist', 'Electron.app', 'Contents', 'Resources', 'python_modules');
if (!fs.existsSync(electronResourcesDir)) {
  try {
    fs.mkdirSync(electronResourcesDir, { recursive: true });
    console.log(`Created Electron resources Python modules directory at ${electronResourcesDir}`);
  } catch (error) {
    console.error(`Error creating Electron resources Python modules directory: ${error.message}`);
  }
}

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(depsDir)) {
  fs.mkdirSync(depsDir, { recursive: true });
}

console.log('Installing Python dependencies...');
console.log(`Python path: ${pythonPath}`);
console.log(`Requirements file: ${requirementsPath}`);
console.log(`Target directory: ${depsDir}`);

// pipコマンドを実行して依存関係をインストール
const pipProcess = spawn(pythonPath, [
  '-m',
  'pip',
  'install',
  '-r',
  requirementsPath,
  '--target',
  depsDir,
  '--upgrade'
]);

// 標準出力のリスニング
pipProcess.stdout.on('data', (data) => {
  console.log(`pip stdout: ${data}`);
});

// 標準エラー出力のリスニング
pipProcess.stderr.on('data', (data) => {
  console.error(`pip stderr: ${data}`);
});

// プロセス終了時のハンドリング
pipProcess.on('close', (code) => {
  if (code === 0) {
    console.log('Python dependencies installed successfully!');
    
    // 依存関係をElectronアプリケーションのリソースディレクトリにもコピー
    try {
      // electronResourcesDirが存在することを確認
      if (!fs.existsSync(electronResourcesDir)) {
        fs.mkdirSync(electronResourcesDir, { recursive: true });
      }
      
      // 依存関係をコピー
      const { execSync } = require('child_process');
      
      // macOSの場合はcpコマンドを使用
      if (process.platform === 'darwin') {
        execSync(`cp -R ${depsDir}/* ${electronResourcesDir}/`, { stdio: 'inherit' });
      } 
      // Windowsの場合はxcopyコマンドを使用
      else if (process.platform === 'win32') {
        execSync(`xcopy "${depsDir}\\*" "${electronResourcesDir}\\" /E /I /Y`, { stdio: 'inherit' });
      }
      
      console.log(`Copied Python dependencies to Electron resources directory: ${electronResourcesDir}`);
    } catch (error) {
      console.error(`Error copying Python dependencies to Electron resources directory: ${error.message}`);
    }
  } else {
    console.error(`pip process exited with code ${code}`);
  }
});

// エラーハンドリング
pipProcess.on('error', (err) => {
  console.error(`Failed to start pip process: ${err.message}`);
  
  if (err.code === 'ENOENT') {
    console.error(`The '${pythonPath}' command was not found. Please make sure Python is installed and in your PATH.`);
    console.error('On macOS, you might need to use "python3" instead of "python".');
    
    // python3でも試してみる（pythonPath === 'python'の場合）
    if (pythonPath === 'python') {
      console.log('Trying with python3 instead...');
      
      const python3Process = spawn('python3', [
        '-m',
        'pip',
        'install',
        '-r',
        requirementsPath,
        '--target',
        depsDir,
        '--upgrade'
      ]);
      
      python3Process.stdout.on('data', (data) => {
        console.log(`pip stdout: ${data}`);
      });
      
      python3Process.stderr.on('data', (data) => {
        console.error(`pip stderr: ${data}`);
      });
      
      python3Process.on('close', (code) => {
        if (code === 0) {
          console.log('Python dependencies installed successfully with python3!');
        } else {
          console.error(`pip process exited with code ${code}`);
        }
      });
      
      python3Process.on('error', (err) => {
        console.error(`Failed to start python3 process: ${err.message}`);
        console.error('Please make sure Python is installed and in your PATH.');
      });
    }
  }
});
