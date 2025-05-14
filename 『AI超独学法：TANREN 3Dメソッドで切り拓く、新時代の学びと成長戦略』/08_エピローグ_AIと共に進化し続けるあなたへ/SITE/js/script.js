// AI超独学法：TANREN 3Dメソッド - エピローグ スクリプト

document.addEventListener('DOMContentLoaded', function () {
  // ナビゲーションのスクロールスパイ機能
  initScrollSpy();

  // アニメーション要素の初期化
  initAnimations();

  // グラフの初期化（存在する場合）
  initCharts();

  // タイプライター効果の初期化
  initTypewriter();

  // Preline UI の初期化
  if (typeof HSStaticMethods !== 'undefined') {
    HSStaticMethods.autoInit();
  } else {
    console.warn('Preline UI not loaded. Trying to initialize manually.');
    // Preline UI のスクリプトを動的に読み込む
    const prelineScript = document.createElement('script');
    prelineScript.src = 'https://cdn.jsdelivr.net/npm/preline/dist/preline.js';
    prelineScript.onload = function () {
      if (typeof HSStaticMethods !== 'undefined') {
        HSStaticMethods.autoInit();
      }
    };
    document.body.appendChild(prelineScript);
  }
});

// スクロールスパイ機能の初期化
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// スクロールアニメーションの初期化
function initAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// グラフの初期化
function initCharts() {
  // 成長軌跡グラフ
  const growthCtx = document.getElementById('growthTrajectoryChart');
  if (growthCtx) {
    new Chart(growthCtx, {
      type: 'line',
      data: {
        labels: ['従来の学習', 'AI活用初期', 'AI対話の習得', 'AI共創力向上', 'シン・ジェネラリスト'],
        datasets: [{
          label: '学習効率',
          data: [30, 45, 65, 80, 95],
          borderColor: 'rgb(0, 137, 123)',
          backgroundColor: 'rgba(0, 137, 123, 0.2)',
          tension: 0.4
        }, {
          label: '創造性',
          data: [40, 35, 55, 75, 90],
          borderColor: 'rgb(255, 160, 0)',
          backgroundColor: 'rgba(255, 160, 0, 0.2)',
          tension: 0.4
        }, {
          label: '人間らしさ',
          data: [70, 60, 75, 85, 95],
          borderColor: 'rgb(77, 182, 172)',
          backgroundColor: 'rgba(77, 182, 172, 0.2)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'AI超独学の成長軌跡'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: '能力指数'
            }
          }
        }
      }
    });
  }

  // AI活用スキルバランス
  const skillBalanceCtx = document.getElementById('skillBalanceChart');
  if (skillBalanceCtx) {
    new Chart(skillBalanceCtx, {
      type: 'radar',
      data: {
        labels: [
          'プロンプト設計',
          '思考整理力',
          '批判的思考',
          'メタ認知',
          'AI共創力',
          '継続力'
        ],
        datasets: [{
          label: '学習開始時',
          data: [20, 40, 50, 30, 10, 35],
          fill: true,
          backgroundColor: 'rgba(77, 182, 172, 0.2)',
          borderColor: 'rgb(77, 182, 172)',
          pointBackgroundColor: 'rgb(77, 182, 172)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(77, 182, 172)'
        }, {
          label: 'AI超独学マスター',
          data: [90, 85, 80, 95, 90, 85],
          fill: true,
          backgroundColor: 'rgba(0, 137, 123, 0.2)',
          borderColor: 'rgb(0, 137, 123)',
          pointBackgroundColor: 'rgb(0, 137, 123)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(0, 137, 123)'
        }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'AI超独学マスターのスキルバランス'
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    });
  }

  // 未来展望グラフ
  const futureVisionCtx = document.getElementById('futureVisionChart');
  if (futureVisionCtx) {
    new Chart(futureVisionCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'AIと共に可能になる未来',
          'まだ発見されていない可能性'
        ],
        datasets: [{
          label: '未来の可能性',
          data: [40, 60],
          backgroundColor: [
            'rgba(0, 137, 123, 0.7)',
            'rgba(255, 160, 0, 0.7)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'AI時代の無限の可能性'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.parsed + '%';
                return label;
              }
            }
          }
        }
      }
    });
  }
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// タイプライター効果
function initTypewriter() {
  const typewriterElement = document.querySelector('.typewriter-text');
  if (!typewriterElement) return;

  const text = typewriterElement.textContent;
  typewriterElement.textContent = '';
  typewriterElement.style.display = 'block';

  let i = 0;
  const typeSpeed = 50; // 文字表示速度（ミリ秒）

  function type() {
    if (i < text.length) {
      typewriterElement.textContent += text.charAt(i);
      i++;
      setTimeout(type, typeSpeed);
    }
  }

  // 画面に表示されたら開始
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(type, 500); // 少し遅延させて開始
        observer.disconnect();
      }
    });
  });

  observer.observe(typewriterElement);
}
