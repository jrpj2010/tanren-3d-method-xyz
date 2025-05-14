// AI超独学法：TANREN 3Dメソッド - 第7章 スクリプト

document.addEventListener('DOMContentLoaded', function () {
  // ナビゲーションのスクロールスパイ機能
  initScrollSpy();

  // アニメーション要素の初期化
  initAnimations();

  // グラフの初期化（存在する場合）
  initCharts();

  // Preline UI の初期化
  if (typeof HSStaticMethods !== 'undefined') {
    HSStaticMethods.autoInit();
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
  // 挫折メカニズムグラフ
  const failureCtx = document.getElementById('failureMechanismChart');
  if (failureCtx) {
    new Chart(failureCtx, {
      type: 'bar',
      data: {
        labels: ['モチベーション', '習慣化', '環境要因', 'ストレス', '時間管理', '計画不足'],
        datasets: [{
          label: '挫折要因の影響度',
          data: [65, 85, 70, 60, 75, 55],
          backgroundColor: [
            'rgba(103, 58, 183, 0.7)',
            'rgba(103, 58, 183, 0.9)',
            'rgba(103, 58, 183, 0.7)',
            'rgba(103, 58, 183, 0.6)',
            'rgba(103, 58, 183, 0.8)',
            'rgba(103, 58, 183, 0.6)'
          ],
          borderColor: [
            'rgb(103, 58, 183)',
            'rgb(103, 58, 183)',
            'rgb(103, 58, 183)',
            'rgb(103, 58, 183)',
            'rgb(103, 58, 183)',
            'rgb(103, 58, 183)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: '学習挫折の主な要因'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: '影響度'
            }
          }
        }
      }
    });
  }

  // マイクロラーニング効果グラフ
  const microLearningCtx = document.getElementById('microLearningChart');
  if (microLearningCtx) {
    new Chart(microLearningCtx, {
      type: 'line',
      data: {
        labels: ['1週間', '2週間', '1ヶ月', '2ヶ月', '3ヶ月', '6ヶ月'],
        datasets: [{
          label: '従来の学習法（長時間集中）',
          data: [80, 65, 50, 30, 20, 10],
          borderColor: 'rgb(149, 117, 205)',
          backgroundColor: 'rgba(149, 117, 205, 0.2)',
          tension: 0.3
        }, {
          label: 'マイクロラーニング（短時間分散）',
          data: [70, 72, 75, 78, 80, 85],
          borderColor: 'rgb(103, 58, 183)',
          backgroundColor: 'rgba(103, 58, 183, 0.2)',
          tension: 0.3
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
            text: '学習継続率の比較'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: '継続率 (%)'
            }
          }
        }
      }
    });
  }

  // インプットとアウトプットのバランスグラフ
  const inOutBalanceCtx = document.getElementById('inputOutputChart');
  if (inOutBalanceCtx) {
    new Chart(inOutBalanceCtx, {
      type: 'radar',
      data: {
        labels: [
          'インプット量',
          '記憶定着率',
          '理解の深さ',
          '応用力',
          '転移可能性',
          '満足度'
        ],
        datasets: [{
          label: 'インプットのみの学習',
          data: [90, 40, 50, 30, 20, 35],
          fill: true,
          backgroundColor: 'rgba(149, 117, 205, 0.2)',
          borderColor: 'rgb(149, 117, 205)',
          pointBackgroundColor: 'rgb(149, 117, 205)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(149, 117, 205)'
        }, {
          label: 'インプット + アウトプット',
          data: [70, 85, 90, 80, 75, 90],
          fill: true,
          backgroundColor: 'rgba(103, 58, 183, 0.2)',
          borderColor: 'rgb(103, 58, 183)',
          pointBackgroundColor: 'rgb(103, 58, 183)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(103, 58, 183)'
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
            text: 'インプット・アウトプットバランスの効果'
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

  // リフレクションの効果チャート
  const reflectionCtx = document.getElementById('reflectionEffectChart');
  if (reflectionCtx) {
    new Chart(reflectionCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'リフレクションなし',
          'AIリフレクションあり'
        ],
        datasets: [{
          label: '知識定着率',
          data: [35, 65],
          backgroundColor: [
            'rgba(149, 117, 205, 0.7)',
            'rgba(103, 58, 183, 0.7)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'AIリフレクション対話の効果'
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

  // 継続力成長チャート
  const continuityCtx = document.getElementById('continuityGrowthChart');
  if (continuityCtx) {
    new Chart(continuityCtx, {
      type: 'line',
      data: {
        labels: ['開始時', '1ヶ月後', '3ヶ月後', '6ヶ月後', '1年後'],
        datasets: [{
          label: '従来の継続法',
          data: [30, 45, 40, 25, 15],
          borderColor: 'rgb(149, 117, 205)',
          backgroundColor: 'rgba(149, 117, 205, 0.2)',
          tension: 0.3
        }, {
          label: 'AI支援型継続システム',
          data: [30, 50, 65, 75, 85],
          borderColor: 'rgb(103, 58, 183)',
          backgroundColor: 'rgba(103, 58, 183, 0.2)',
          tension: 0.3
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
            text: '継続力の成長推移'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 100,
            title: {
              display: true,
              text: '継続力スコア'
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
