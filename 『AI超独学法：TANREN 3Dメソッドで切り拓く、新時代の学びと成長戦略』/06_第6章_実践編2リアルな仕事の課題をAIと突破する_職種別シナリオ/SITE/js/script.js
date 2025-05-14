// AI超独学法：TANREN 3Dメソッド - 第6章 スクリプト

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
  // 営業成果グラフ
  const salesCtx = document.getElementById('salesPerformanceChart');
  if (salesCtx) {
    new Chart(salesCtx, {
      type: 'bar',
      data: {
        labels: ['従来の営業活動', 'AI活用営業活動'],
        datasets: [{
          label: '提案件数（月間）',
          data: [8, 24],
          backgroundColor: [
            'rgba(117, 117, 117, 0.7)',
            'rgba(25, 118, 210, 0.7)'
          ],
          borderColor: [
            'rgb(117, 117, 117)',
            'rgb(25, 118, 210)'
          ],
          borderWidth: 1
        }, {
          label: '成約率',
          data: [20, 35],
          backgroundColor: [
            'rgba(117, 117, 117, 0.5)',
            'rgba(25, 118, 210, 0.5)'
          ],
          borderColor: [
            'rgb(117, 117, 117)',
            'rgb(25, 118, 210)'
          ],
          borderWidth: 1
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
            text: 'AI活用による営業成果の比較'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y;
                  if (context.datasetIndex === 1) {
                    label += '%';
                  }
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // マーケティング変数グラフ
  const marketingCtx = document.getElementById('marketingStrategyChart');
  if (marketingCtx) {
    new Chart(marketingCtx, {
      type: 'radar',
      data: {
        labels: [
          '市場分析',
          '独自性',
          '顧客理解',
          '差別化戦略',
          '実行速度'
        ],
        datasets: [{
          label: 'AIのみの分析',
          data: [90, 40, 70, 50, 95],
          fill: true,
          backgroundColor: 'rgba(117, 117, 117, 0.2)',
          borderColor: 'rgb(117, 117, 117)',
          pointBackgroundColor: 'rgb(117, 117, 117)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(117, 117, 117)'
        }, {
          label: 'AI+独自変数の共創',
          data: [95, 90, 95, 85, 90],
          fill: true,
          backgroundColor: 'rgba(25, 118, 210, 0.2)',
          borderColor: 'rgb(25, 118, 210)',
          pointBackgroundColor: 'rgb(25, 118, 210)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(25, 118, 210)'
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
            text: '「変数」を活かした差別化戦略の効果'
          }
        }
      }
    });
  }

  // キャリア発展グラフ
  const careerCtx = document.getElementById('careerGrowthChart');
  if (careerCtx) {
    new Chart(careerCtx, {
      type: 'line',
      data: {
        labels: ['現在', '6ヶ月後', '1年後', '2年後', '3年後'],
        datasets: [{
          label: '従来の専門特化キャリア',
          data: [50, 60, 65, 70, 72],
          borderColor: 'rgb(117, 117, 117)',
          backgroundColor: 'rgba(117, 117, 117, 0.5)',
          tension: 0.3
        }, {
          label: 'シン・ジェネラリストへの成長',
          data: [50, 65, 75, 85, 95],
          borderColor: 'rgb(25, 118, 210)',
          backgroundColor: 'rgba(25, 118, 210, 0.5)',
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
            text: 'シン・ジェネラリストとしての成長予測'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + ' (市場価値指数)';
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            suggestedMin: 40,
            suggestedMax: 100,
            title: {
              display: true,
              text: '市場価値指数'
            }
          }
        }
      }
    });
  }

  // 人材育成フィードバックの効果
  const feedbackCtx = document.getElementById('feedbackEffectivenessChart');
  if (feedbackCtx) {
    new Chart(feedbackCtx, {
      type: 'doughnut',
      data: {
        labels: [
          '従来型フィードバック',
          'AI支援の個別最適化フィードバック'
        ],
        datasets: [{
          label: '成長速度の比較',
          data: [35, 65],
          backgroundColor: [
            'rgba(117, 117, 117, 0.7)',
            'rgba(25, 118, 210, 0.7)'
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
            text: 'フィードバック効果の比較'
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
