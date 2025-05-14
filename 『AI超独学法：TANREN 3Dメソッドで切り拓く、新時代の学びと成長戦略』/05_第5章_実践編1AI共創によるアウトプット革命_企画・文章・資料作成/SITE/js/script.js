// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all animations, scrollspy, and interactive elements
  initScrollAnimations();
  initScrollSpy();
  initCharts();

  // Add any additional initializations here
  console.log('All scripts initialized successfully!');
});

// Scroll animations for sections
function initScrollAnimations() {
  const sections = document.querySelectorAll('.section');

  // Initial check for elements in viewport
  checkVisibility(sections);

  // Check on scroll
  window.addEventListener('scroll', function () {
    checkVisibility(sections);
  });
}

// Helper function to check if elements are in viewport
function checkVisibility(elements) {
  const windowHeight = window.innerHeight;
  const windowTopPosition = window.scrollY;
  const windowBottomPosition = windowTopPosition + windowHeight;

  elements.forEach(function (element) {
    const elementHeight = element.offsetHeight;
    const elementTopPosition = element.offsetTop;
    const elementBottomPosition = elementTopPosition + elementHeight;

    // Check if element is in viewport
    if (
      (elementBottomPosition >= windowTopPosition) &&
      (elementTopPosition <= windowBottomPosition)
    ) {
      element.classList.add('visible');
    }
  });
}

// Scroll spy for navigation
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for fixed header

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize all Chart.js charts
function initCharts() {
  // Enterprise Planning Process Chart
  if (document.getElementById('enterprisePlanningChart')) {
    const ctx = document.getElementById('enterprisePlanningChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['従来のプロセス', 'AI共創プロセス'],
        datasets: [{
          label: '企画作成時間 (時間)',
          data: [20, 5],
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(236, 72, 153, 0.7)'
          ],
          borderColor: [
            'rgb(99, 102, 241)',
            'rgb(236, 72, 153)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '企画書作成時間の比較'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}時間`;
              }
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  // Writing Process Improvement Chart
  if (document.getElementById('writingImprovementChart')) {
    const ctx = document.getElementById('writingImprovementChart').getContext('2d');
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          '文章の論理性',
          '表現の豊かさ',
          '作成時間の短縮',
          '説得力',
          '一貫性',
          '個性の反映'
        ],
        datasets: [{
          label: 'AIのみで作成',
          data: [90, 70, 95, 80, 85, 30],
          fill: true,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgb(99, 102, 241)',
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(99, 102, 241)'
        }, {
          label: 'AIパーソナル添削を活用',
          data: [90, 85, 90, 95, 85, 90],
          fill: true,
          backgroundColor: 'rgba(236, 72, 153, 0.2)',
          borderColor: 'rgb(236, 72, 153)',
          pointBackgroundColor: 'rgb(236, 72, 153)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(236, 72, 153)'
        }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '文章作成手法の比較'
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  // Presentation Creation Evolution Chart
  if (document.getElementById('presentationEvolutionChart')) {
    const ctx = document.getElementById('presentationEvolutionChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['手作業', 'テンプレート活用', 'AIのみ', 'AI+SVG/HTML共創'],
        datasets: [{
          label: '制作時間 (時間)',
          data: [10, 6, 3, 2],
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          tension: 0.4
        }, {
          label: 'クオリティ (10点満点)',
          data: [6, 7, 8, 9.5],
          borderColor: 'rgb(236, 72, 153)',
          backgroundColor: 'rgba(236, 72, 153, 0.5)',
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
            text: 'プレゼン資料作成の進化'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 12
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 80; // Adjust based on your fixed header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});
