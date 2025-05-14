// AI Super Learning Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Preline UI components
  if (typeof HSStaticMethods !== 'undefined') {
    HSStaticMethods.autoInit();
  }

  // Scroll Animations
  initScrollAnimations();

  // Scroll Spy for Navigation
  initScrollSpy();

  // Initialize Chart.js charts if any exist
  initCharts();
});

// Initialize animations for elements that should animate when scrolled into view
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-right, .animate-slide-left, .animate-scale-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start the animation when the element comes into view
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

  animatedElements.forEach(element => {
    element.style.animationPlayState = 'paused'; // Pause animations initially
    observer.observe(element);
  });
}

// Scroll Spy functionality for the navigation
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize Chart.js charts
function initCharts() {
  // AI Agent Level Comparison Chart
  const levelChartElement = document.getElementById('levelComparisonChart');
  if (levelChartElement) {
    new Chart(levelChartElement, {
      type: 'radar',
      data: {
        labels: ['自律性', '情報収集', '問題解決', '学習能力', '連携性', '汎用性'],
        datasets: [
          {
            label: 'Level 0.5',
            data: [20, 30, 25, 30, 15, 20],
            fill: true,
            backgroundColor: 'rgba(233, 185, 73, 0.2)',
            borderColor: 'rgba(233, 185, 73, 1)',
            pointBackgroundColor: 'rgba(233, 185, 73, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(233, 185, 73, 1)'
          },
          {
            label: 'Level 1',
            data: [30, 70, 40, 45, 35, 30],
            fill: true,
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: 'rgba(52, 152, 219, 1)',
            pointBackgroundColor: 'rgba(52, 152, 219, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
          },
          {
            label: 'Level 2',
            data: [70, 75, 80, 60, 65, 60],
            fill: true,
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            borderColor: 'rgba(46, 204, 113, 1)',
            pointBackgroundColor: 'rgba(46, 204, 113, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(46, 204, 113, 1)'
          },
          {
            label: 'Level 3',
            data: [95, 90, 95, 85, 90, 95],
            fill: true,
            backgroundColor: 'rgba(101, 58, 94, 0.2)',
            borderColor: 'rgba(101, 58, 94, 1)',
            pointBackgroundColor: 'rgba(101, 58, 94, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(101, 58, 94, 1)'
          }
        ]
      },
      options: {
        elements: {
          line: {
            borderWidth: 2
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true
            },
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.raw + '%';
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

  // Risks vs Benefits Chart
  const risksChartElement = document.getElementById('risksVsBenefitsChart');
  if (risksChartElement) {
    new Chart(risksChartElement, {
      type: 'bar',
      data: {
        labels: ['レベル0.5', 'レベル1', 'レベル2', 'レベル3'],
        datasets: [
          {
            label: 'メリット',
            data: [30, 50, 75, 95],
            backgroundColor: 'rgba(26, 91, 102, 0.6)', // primary color
          },
          {
            label: 'リスク',
            data: [15, 30, 60, 85],
            backgroundColor: 'rgba(179, 50, 43, 0.6)', // secondary color
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: '相対的な比率 (%)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.raw + '%';
              }
            }
          }
        },
        animation: {
          duration: 1500
        }
      }
    });
  }
}

// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');

  // Save preference to local storage
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

  // Update button text
  const darkModeBtn = document.getElementById('darkModeToggle');
  if (darkModeBtn) {
    darkModeBtn.innerHTML = isDarkMode ?
      '<i class="fas fa-sun"></i> ライトモード' :
      '<i class="fas fa-moon"></i> ダークモード';
  }
}

// Check for saved dark mode preference when page loads
window.addEventListener('load', () => {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (darkModeBtn) {
      darkModeBtn.innerHTML = '<i class="fas fa-sun"></i> ライトモード';
    }
  }
});
