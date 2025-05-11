// AI超独学法：TANREN 3Dメソッド Infographic Website

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Mobile Menu Toggle
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

// Scroll Spy Implementation
function activateScrollSpy() {
    const scrollPosition = window.scrollY + 100; // Add offset for header

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
}

// Scroll Animation
function initScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add fade-in class to elements that should animate
function setupAnimations() {
    const elementsToAnimate = document.querySelectorAll('section > div > h2, section > div > p, .card-hover, .bg-white');
    elementsToAnimate.forEach(element => {
        if (!element.classList.contains('fade-in')) {
            element.classList.add('fade-in');
        }
    });
}

// Simplified 3D visualization with Canvas API
function setup3DVisualization() {
    const container = document.getElementById('visualization-container');
    
    if (container) {
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        container.appendChild(canvas);
        
        // Simple static 3D axes visualization
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, 300, 300);
        
        // Center point
        const centerX = 150;
        const centerY = 150;
        
        // Draw X-axis (red)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + 100, centerY);
        ctx.strokeStyle = '#b3322b'; // accent-red
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // X-axis label
        ctx.fillStyle = '#b3322b';
        ctx.font = 'bold 14px Noto Sans JP';
        ctx.fillText('X軸', centerX + 110, centerY + 5);
        
        // Draw Y-axis (blue)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY - 100);
        ctx.strokeStyle = '#1a5b66'; // accent-blue
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Y-axis label
        ctx.fillStyle = '#1a5b66';
        ctx.font = 'bold 14px Noto Sans JP';
        ctx.fillText('Y軸', centerX - 25, centerY - 110);
        
        // Draw Z-axis (purple)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX - 70, centerY + 70);
        ctx.strokeStyle = '#653a5e'; // accent-purple
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Z-axis label
        ctx.fillStyle = '#653a5e';
        ctx.font = 'bold 14px Noto Sans JP';
        ctx.fillText('Z軸', centerX - 95, centerY + 85);
        
        // Draw center point
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#4f46e5'; // primary-color
        ctx.fill();
    }
}

// Create a chart with Chart.js
function createChart() {
    const chartElement = document.getElementById('learning-curve-chart');
    
    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 30'],
                datasets: [
                    {
                        label: '従来の学習法',
                        data: [0, 10, 20, 25, 30, 35],
                        borderColor: 'rgba(203, 213, 225, 1)',
                        backgroundColor: 'rgba(203, 213, 225, 0.2)',
                        pointBorderColor: 'rgba(203, 213, 225, 1)',
                        pointBackgroundColor: '#fff',
                        tension: 0.4
                    },
                    {
                        label: 'TANREN 3Dメソッド',
                        data: [0, 15, 35, 50, 70, 90],
                        borderColor: 'rgba(79, 70, 229, 1)',
                        backgroundColor: 'rgba(79, 70, 229, 0.2)',
                        pointBorderColor: 'rgba(79, 70, 229, 1)',
                        pointBackgroundColor: '#fff',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '習熟度 (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '学習期間'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    setupAnimations();
    initScrollAnimation();
    
    // Initialize chart if needed
    if (document.getElementById('learning-curve-chart')) {
        createChart();
    }
    
    // Initialize 3D visualization
    setup3DVisualization();
    
    // Active scroll spy
    window.addEventListener('scroll', activateScrollSpy);
    activateScrollSpy(); // Initial call
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Enhance interactivity on touch devices
if ('ontouchstart' in window) {
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('hover');
        });
    });
} 