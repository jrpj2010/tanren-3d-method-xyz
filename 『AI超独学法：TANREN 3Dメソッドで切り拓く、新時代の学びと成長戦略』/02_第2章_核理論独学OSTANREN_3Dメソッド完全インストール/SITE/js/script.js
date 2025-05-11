// AI超独学法 Chapter 2 - TANREN 3D Method - JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initMobileMenu();
  initScrollSpy();
  initScrollAnimation();
  init3DCube();
  createXAxisDiagram();
  createTimelineChart();
  createLevelChart();
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
      link.classList.remove('text-white', 'active-nav');
      link.classList.add('text-dark-300');
      
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.remove('text-dark-300');
        link.classList.add('text-white', 'active-nav');
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

// 3D Cube with Three.js
function init3DCube() {
  const container = document.getElementById('3d-cube');
  if (!container) return;
  
  let scene, camera, renderer, cube;
  let isInitialized = false;
  
  function initCube() {
    if (isInitialized) return;
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create cube
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    
    // Create materials (semi-transparent)
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 }),  // X-axis (blue)
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 }),  // Y-axis (green)
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 }),  // Z-axis (purple)
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 })
    ];
    
    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Create axes
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
    
    // Add axis labels
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
    
    // Handle window resize
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.007;
      
      renderer.render(scene, camera);
    }
    
    animate();
  }
  
  // Initialize cube when it comes into view
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isInitialized) {
      initCube();
    }
  }, { threshold: 0.1 });
  
  observer.observe(container);
}

// Create X-Axis diagram (abstract to concrete cycle)
function createXAxisDiagram() {
  const container = document.getElementById('xaxis-diagram');
  if (!container) return;
  
  // Mermaid-style diagram using Chart.js
  const ctx = document.createElement('canvas');
  container.appendChild(ctx);
  
  const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Thinking Cycle',
          data: [
            { x: 0, y: 7 },   // Abstract
            { x: 5, y: 3 },   // Concrete
            { x: 10, y: 7 },  // Abstract again
          ],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 12,
          showLine: true,
          tension: 0.4,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: -1,
          max: 11,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)'
          }
        },
        y: {
          min: 0,
          max: 10,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const point = context.dataIndex;
              if (point === 0) return '抽象化（WHY?）';
              if (point === 1) return '具体化（HOW?）';
              if (point === 2) return '再抽象化（次のレベル）';
            }
          }
        },
        annotation: {
          annotations: {
            abstractLabel: {
              type: 'label',
              content: '抽象',
              position: 'start',
              xValue: 0,
              yValue: 9,
              color: 'rgba(59, 130, 246, 1)'
            },
            concreteLabel: {
              type: 'label',
              content: '具体',
              position: 'center',
              xValue: 5,
              yValue: 1,
              color: 'rgba(59, 130, 246, 1)'
            }
          }
        }
      }
    }
  });
  
  // Add text annotations manually
  const abstractLabel = document.createElement('div');
  abstractLabel.textContent = '抽象化（WHY?）';
  abstractLabel.style.position = 'absolute';
  abstractLabel.style.top = '10%';
  abstractLabel.style.left = '10%';
  abstractLabel.style.color = '#60a5fa';
  abstractLabel.style.fontWeight = 'bold';
  container.appendChild(abstractLabel);
  
  const concreteLabel = document.createElement('div');
  concreteLabel.textContent = '具体化（HOW?）';
  concreteLabel.style.position = 'absolute';
  concreteLabel.style.bottom = '10%';
  concreteLabel.style.left = '50%';
  concreteLabel.style.transform = 'translateX(-50%)';
  concreteLabel.style.color = '#60a5fa';
  concreteLabel.style.fontWeight = 'bold';
  container.appendChild(concreteLabel);
  
  const cycleLabel = document.createElement('div');
  cycleLabel.textContent = '往復運動';
  cycleLabel.style.position = 'absolute';
  cycleLabel.style.top = '50%';
  cycleLabel.style.right = '10%';
  cycleLabel.style.color = '#ffffff';
  cycleLabel.style.fontWeight = 'bold';
  container.appendChild(cycleLabel);
}

// Create Y-Axis Timeline Chart
function createTimelineChart() {
  const container = document.getElementById('timeline-chart');
  if (!container) return;
  
  const ctx = document.createElement('canvas');
  container.appendChild(ctx);
  
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['過去', '', '現在', '', '未来'],
      datasets: [{
        label: '時間軸の視座',
        data: [2, 4, 6, 9, 12],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const point = context.dataIndex;
              if (point === 0) return '履歴力：過去の知識・経験';
              if (point === 2) return '観察力：現在の状況';
              if (point === 4) return '予測力・構想力：未来の可能性';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            font: {
              weight: 'bold'
            }
          }
        },
        y: {
          display: false
        }
      }
    }
  });
}

// Create Z-Axis Level Chart (Radar Chart)
function createLevelChart() {
  const container = document.getElementById('level-chart');
  if (!container) return;
  
  const ctx = document.createElement('canvas');
  container.appendChild(ctx);
  
  const chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['思考力', 'AIとの対話', '知識', '情報収集', '構造化', '表現力'],
      datasets: [
        {
          label: '現在のレベル',
          data: [3, 4, 5, 6, 4, 5],
          backgroundColor: 'rgba(168, 85, 247, 0.2)',
          borderColor: 'rgba(168, 85, 247, 1)',
          pointBackgroundColor: 'rgba(168, 85, 247, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(168, 85, 247, 1)'
        },
        {
          label: '目標レベル',
          data: [8, 9, 8, 8, 9, 8],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: 'rgba(255, 255, 255, 0.7)',
            font: {
              size: 12
            }
          },
          ticks: {
            backdropColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.5)',
            z: 100
          },
          min: 0,
          max: 10,
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(255, 255, 255, 0.7)',
            boxWidth: 15,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            title: function(tooltipItems) {
              return tooltipItems[0].label;
            },
            label: function(context) {
              return context.dataset.label + ': レベル ' + context.raw + '/10';
            }
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