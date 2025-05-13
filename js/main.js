/**
 * AI超独学法：TANREN 3Dメソッド 統合LP
 * メインJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初期化処理
  initializeNavigation();
  initializeScrollAnimations();
  initializeHeaderScroll();
  initializeChaptersGrid();
});

/**
 * ナビゲーション初期化
 */
function initializeNavigation() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  }
  
  // ナビゲーションリンクの現在のページをアクティブにする
  const navLinks = document.querySelectorAll('.main-nav a');
  const currentLocation = window.location.pathname;
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    // 現在のパスがリンクと一致するか、または chapters/ 内のページの場合は対応するリンクをアクティブにする
    if (currentLocation === linkPath || 
        (currentLocation.includes('/chapters/') && linkPath.includes('#chapters'))) {
      link.classList.add('active');
    }
    
    // リンククリック時にモバイルメニューを閉じる
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/**
 * スクロールアニメーション初期化
 */
function initializeScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  
  if (elements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '-20px 0px'
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * ヘッダースクロール効果
 */
function initializeHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * チャプターデータ
 */
const chaptersData = [
  {
    id: "prologue",
    number: "プロローグ",
    title: "なぜ今、あなたの学び方をアップデートする必要があるのか",
    description: "情報爆発、AI格差…独学力が生存戦略となる時代の学びについて考えます。",
    path: "chapters/00-prologue.html"
  },
  {
    id: "chapter1",
    number: "第1章",
    title: "AI超独学を起動するマインドセット",
    description: "AIと話せる人はなぜ指数関数的に成長するのか、AIを使っているつもりが陥る罠とは？",
    path: "chapters/01-mindset.html"
  },
  {
    id: "chapter2",
    number: "第2章",
    title: "核理論独学OSTANREN 3Dメソッド完全インストール",
    description: "思考OSTANREN 3Dメソッドの全貌と、X軸・Y軸・Z軸の使い方を解説します。",
    path: "chapters/02-3dmethod.html"
  },
  {
    id: "chapter3",
    number: "第3章",
    title: "AIとの対話設計術",
    description: "プロンプトの本質と、AIとの対話を設計するための6つの必須要素について学びます。",
    path: "chapters/03-promptengineering.html"
  },
  {
    id: "chapter4",
    number: "第4章",
    title: "AIエージェント活用術",
    description: "AIエージェントとは何か、その自律性がもたらすインパクトと活用の注意点を解説します。",
    path: "chapters/04-aiagent.html"
  },
  {
    id: "chapter5",
    number: "第5章",
    title: "実践編1：AI共創によるアウトプット革命",
    description: "企画立案、文章作成、プレゼン資料作成などのアウトプットをAIと共に革新する方法を紹介します。",
    path: "chapters/05-aioutput.html"
  },
  {
    id: "chapter6",
    number: "第6章",
    title: "実践編2：リアルな仕事の課題をAIと突破する",
    description: "営業、マーケティング、人材育成、キャリア開発など、職種別のAI活用シナリオを解説します。",
    path: "chapters/06-realjobs.html"
  },
  {
    id: "chapter7",
    number: "第7章",
    title: "学習習慣の壁を壊す",
    description: "なぜ継続は難しいのか、そのメカニズムと解決策を、AI時代の学習継続の視点から考えます。",
    path: "chapters/07-continuity.html"
  },
  {
    id: "chapter8",
    number: "エピローグ",
    title: "AIと共に進化し続けるあなたへ",
    description: "TANREN 3Dメソッドを羅針盤に、未来を創り出す方法と、AI時代の超独学のスタート方法を解説します。",
    path: "chapters/08-epilogue.html"
  }
];

/**
 * チャプターグリッドの初期化
 */
function initializeChaptersGrid() {
  const container = document.getElementById('chapters-grid');
  if (!container) return;
  
  // コンテナを一度クリア
  container.innerHTML = '';
  
  // グリッドクラスを設定（すべての章カードをグリッド表示するため）
  container.className = 'chapters-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8';
  
  // 各章のカードを追加（サムネイル画像付き）
  chaptersData.forEach((chapter, index) => {
    const card = document.createElement('div');
    card.className = 'chapter-card reveal-on-scroll';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // 章ごとにイメージを設定
    const chapterImage = `images/chapters/${chapter.id}.jpg`;
    // 章ごとにイメージ背景色を設定
    const bgColors = [
      'bg-blue-100', 'bg-purple-100', 'bg-green-100', 'bg-orange-100',
      'bg-indigo-100', 'bg-pink-100', 'bg-yellow-100', 'bg-cyan-100', 'bg-red-100'
    ];
    const bgColor = bgColors[index % bgColors.length];
    
    // 準備ができている章かどうかを確認
  const isChapterReady = chapter.path && (
    chapter.path === 'chapters/00-prologue.html' ||
    chapter.path === 'chapters/01-mindset.html' ||
    chapter.path === 'chapters/02-3dmethod.html' ||
    chapter.path === 'chapters/03-promptengineering.html' ||
    chapter.path === 'chapters/04-aiagent.html' ||
    chapter.path === 'chapters/05-aioutput.html' ||
    chapter.path === 'chapters/06-realjobs.html' ||
    chapter.path === 'chapters/07-continuity.html' ||
    chapter.path === 'chapters/08-epilogue.html'
  );
  
  card.innerHTML = `
      <div class="chapter-thumbnail ${bgColor} flex items-center justify-center">
        <div class="chapter-icon">
          <i class="fas ${getIconForChapter(chapter.id)} text-4xl"></i>
        </div>
        ${!isChapterReady ? '<div class="coming-soon-badge">準備中</div>' : ''}
      </div>
      <div class="chapter-header">
        <span class="chapter-number">${chapter.number}</span>
        <h3 class="chapter-title">${chapter.title}</h3>
      </div>
      <div class="chapter-content">
        <p class="chapter-description">${chapter.description}</p>
      </div>
      <div class="chapter-footer">
        ${isChapterReady 
          ? `<a href="${chapter.path}" class="btn btn-primary">詳細を見る</a>`
          : `<span class="btn btn-disabled">準備中</span>`
        }
      </div>
    `;
    
    container.appendChild(card);
    
    // コンソールで確認
    console.log(`Added chapter card: ${chapter.number}`);
  });
  
  // チャプターグリッドが表示されているかコンソールで確認
  console.log(`Chapter grid container found: ${container !== null}`);
  console.log(`Chapters added: ${container.children.length}`);
  
  // チャプタービジビリティ更新を上書き
  window.updateChapterVisibility = function() {
    // すべてのカードを表示
    const cards = document.querySelectorAll('#chapters-grid .chapter-card');
    cards.forEach(card => {
      card.style.display = 'flex';
    });
    
    // ナビゲーションボタンを非表示
    const prevBtn = document.getElementById('prev-chapter');
    const nextBtn = document.getElementById('next-chapter');
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  };
  
  // 初期表示を更新
  updateChapterVisibility();
}

/**
 * 章IDに基づいてアイコンクラスを返す
 * @param {string} chapterId - 章のID
 * @returns {string} - FontAwesomeのアイコンクラス
 */
function getIconForChapter(chapterId) {
  const iconMap = {
    'prologue': 'fa-book-open',
    'chapter1': 'fa-brain',
    'chapter2': 'fa-cube',
    'chapter3': 'fa-comments',
    'chapter4': 'fa-robot',
    'chapter5': 'fa-lightbulb',
    'chapter6': 'fa-briefcase',
    'chapter7': 'fa-chart-line',
    'chapter8': 'fa-rocket'
  };
  
  return iconMap[chapterId] || 'fa-book';
}

/**
 * 3D立方体の初期化と描画
 * @param {string} containerId - 3Dキューブを配置する要素のID
 */
function initialize3DCube(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;
  
  let scene, camera, renderer, cube;
  let isInitialized = false;
  
  function initCube() {
    if (isInitialized) return;
    
    // シーン作成
    scene = new THREE.Scene();
    
    // カメラ作成
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 1; // カメラのY位置を変更（元は2）
    camera.position.x = 1; // カメラのX位置を変更（元は2）
    
    // レンダラー作成
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // キューブ作成
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    
    // マテリアル作成（半透明）
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 }),  // X軸 (青)
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 }),  // Y軸 (緑)
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 }),  // Z軸 (紫)
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 })
    ];
    
    // キューブを中央に配置
    cube = new THREE.Mesh(geometry, materials);
    cube.position.set(0, 0, 0); // キューブを原点に配置
    scene.add(cube);
    
    // 軸の作成
    const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(4, 0, 0)
    ]);
    
    const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 4, 0)
    ]);
    
    const zAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -3),
      new THREE.Vector3(0, 0, 4)
    ]);
    
    const xAxisMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 3 });
    const yAxisMaterial = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 3 });
    const zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x8b5cf6, linewidth: 3 });
    
    const xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);
    const yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial);
    const zAxis = new THREE.Line(zAxisGeometry, zAxisMaterial);
    
    scene.add(xAxis);
    scene.add(yAxis);
    scene.add(zAxis);
    
    // 軸ラベルの追加
    const makeTextSprite = function(message, color) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 100;
      
      context.font = "Bold 40px Arial";
      context.fillStyle = color;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(message, 50, 50);
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1, 1, 1);
      
      return sprite;
    };
    
    const xLabel = makeTextSprite("X", "#3b82f6");
    xLabel.position.set(4, 0, 0);
    
    const yLabel = makeTextSprite("Y", "#10b981");
    yLabel.position.set(0, 4, 0);
    
    const zLabel = makeTextSprite("Z", "#8b5cf6");
    zLabel.position.set(0, 0, 4);
    
    scene.add(xLabel);
    scene.add(yLabel);
    scene.add(zLabel);
    
    isInitialized = true;
    
    // ウィンドウリサイズ対応
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    
    // シーンを中央に配置
    scene.position.set(0, 0, 0);
    
    // アニメーションループ
    function animate() {
      requestAnimationFrame(animate);
      
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.007;
      
      renderer.render(scene, camera);
    }
    
    animate();
  }
  
  // 要素が視界に入ったときに初期化
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isInitialized) {
      initCube();
    }
  }, { threshold: 0.1 });
  
  observer.observe(container);
}

/**
 * チャプターカードの表示状態を更新する
 */
function updateChapterVisibility() {
  const cards = document.querySelectorAll('#chapters-grid .chapter-card');
  const prevBtn = document.getElementById('prev-chapter');
  const nextBtn = document.getElementById('next-chapter');
  
  if (cards.length === 0 || !prevBtn || !nextBtn) return;
  
  let currentChapter = 0;
  const visibleCount = window.innerWidth < 768 ? 1 : (window.innerWidth < 1024 ? 2 : 3);
  
  // 表示の更新関数
  function updateDisplay() {
    cards.forEach((card, index) => {
      if (index >= currentChapter && index < currentChapter + visibleCount) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
    
    // ボタンの状態更新
    prevBtn.disabled = currentChapter === 0;
    prevBtn.style.opacity = currentChapter === 0 ? 0.5 : 1;
    
    nextBtn.disabled = currentChapter + visibleCount >= cards.length;
    nextBtn.style.opacity = currentChapter + visibleCount >= cards.length ? 0.5 : 1;
  }
  
  // 初期表示
  updateDisplay();
  
  // ボタンイベント
  prevBtn.addEventListener('click', () => {
    currentChapter = Math.max(0, currentChapter - 1);
    updateDisplay();
  });
  
  nextBtn.addEventListener('click', () => {
    currentChapter = Math.min(cards.length - visibleCount, currentChapter + 1);
    updateDisplay();
  });
  
  // リサイズ時に再計算
  window.addEventListener('resize', () => {
    const newVisibleCount = window.innerWidth < 768 ? 1 : (window.innerWidth < 1024 ? 2 : 3);
    if (newVisibleCount !== visibleCount) {
      visibleCount = newVisibleCount;
      currentChapter = 0;
      updateDisplay();
    }
  });
}