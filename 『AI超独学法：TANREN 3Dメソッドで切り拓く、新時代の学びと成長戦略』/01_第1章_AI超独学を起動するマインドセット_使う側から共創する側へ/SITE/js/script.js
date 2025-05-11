// AI超独学法 Chapter 1 - JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initMobileMenu();
  initScrollSpy();
  initScrollAnimation();
  createGrowthChart();
});

// Mobile menu toggle
function initMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Scroll spy implementation
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');
  
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
      link.classList.remove('text-primary', 'active-nav');
      link.classList.add('text-gray-600');
      
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.remove('text-gray-600');
        link.classList.add('text-primary', 'active-nav');
      }
    });
  });
}

// Scroll animation for sections
function initScrollAnimation() {
  const sections = document.querySelectorAll('section');
  
  // Make first section visible immediately
  if (sections.length > 0) {
    sections[0].classList.add('visible');
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Initialize Chart.js for growth chart
function createGrowthChart() {
  const ctx = document.getElementById('growthChart');
  
  if (!ctx) return;
  
  const growthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['0', '1ヶ月', '2ヶ月', '3ヶ月', '4ヶ月', '5ヶ月', '6ヶ月'],
      datasets: [
        {
          label: 'AIと話せる人の成長曲線',
          data: [1, 3, 9, 20, 45, 100, 220],
          borderColor: 'rgba(0, 102, 204, 1)',
          backgroundColor: 'rgba(0, 102, 204, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        },
        {
          label: '従来の学習法での成長曲線',
          data: [1, 2, 3, 4, 5, 6, 7],
          borderColor: 'rgba(150, 150, 150, 0.8)',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + ' (成長度)';
              }
              return label;
            }
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        title: {
          display: true,
          text: '指数関数的成長のイメージ',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '成長度',
            color: '#666'
          },
          grid: {
            color: 'rgba(200, 200, 200, 0.2)'
          }
        },
        x: {
          title: {
            display: true,
            text: '時間',
            color: '#666'
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Close mobile menu if open
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
      
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
}); 