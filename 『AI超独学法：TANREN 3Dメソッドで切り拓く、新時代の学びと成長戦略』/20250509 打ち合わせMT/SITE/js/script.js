// Main JavaScript for AI超独学法 Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initializeMobileMenu();
    initializeScrollAnimation();
    initializeScrollSpy();
    setupCharts();
    
    // Handle any "detail" buttons that scroll to relevant sections
    document.querySelector('.hero-btn').addEventListener('click', function() {
        document.querySelector('#intro').scrollIntoView({ behavior: 'smooth' });
    });
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Scroll Animation for Sections
function initializeScrollAnimation() {
    // Add the section-transition class to all main sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.classList.contains('section-transition')) {
            section.classList.add('section-transition');
        }
    });
    
    // Initialize Intersection Observer for scroll animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all sections with section-transition class
    document.querySelectorAll('.section-transition').forEach(section => {
        observer.observe(section);
    });
    
    // Also observe other animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// Scroll Spy for Navigation
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');
    
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // Initialize active state
    updateActiveLink();
}

// Chart.js Initialization
function setupCharts() {
    // Check if charts exist on the page
    if (document.getElementById('aiAdoptionChart')) {
        initializeAIAdoptionChart();
    }
    
    if (document.getElementById('learningComparisonChart')) {
        initializeLearningComparisonChart();
    }
    
    if (document.getElementById('skillGrowthChart')) {
        initializeSkillGrowthChart();
    }
}

// AI Adoption Rate Chart
function initializeAIAdoptionChart() {
    const ctx = document.getElementById('aiAdoptionChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'AI採用率 (%)',
                data: [15, 25, 45, 65, 78, 90],
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
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

// Traditional vs AI Learning Comparison Chart
function initializeLearningComparisonChart() {
    const ctx = document.getElementById('learningComparisonChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['知識獲得', '情報整理', '応用力', '学習速度', '継続率'],
            datasets: [
                {
                    label: '従来の学習法',
                    data: [50, 45, 60, 30, 40],
                    backgroundColor: 'rgba(156, 163, 175, 0.7)',
                    borderColor: 'rgba(156, 163, 175, 1)',
                    borderWidth: 1
                },
                {
                    label: 'TANREN 3D学習法',
                    data: [85, 90, 75, 95, 80],
                    backgroundColor: 'rgba(79, 70, 229, 0.7)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            animation: {
                delay: function(context) {
                    return context.dataIndex * 100;
                }
            }
        }
    });
}

// Skill Growth Chart
function initializeSkillGrowthChart() {
    const ctx = document.getElementById('skillGrowthChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['思考の深度', '時間軸思考', 'レベル感認識', '問題解決', '知識統合', '創造性'],
            datasets: [
                {
                    label: '導入前',
                    data: [30, 40, 35, 45, 30, 25],
                    backgroundColor: 'rgba(156, 163, 175, 0.2)',
                    borderColor: 'rgba(156, 163, 175, 0.8)',
                    pointBackgroundColor: 'rgba(156, 163, 175, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(156, 163, 175, 1)'
                },
                {
                    label: '3か月後',
                    data: [70, 75, 65, 80, 70, 60],
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: 'rgba(79, 70, 229, 0.8)',
                    pointBackgroundColor: 'rgba(79, 70, 229, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(79, 70, 229, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    gridLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        backdropColor: 'transparent',
                        callback: function(value) {
                            return value + '%';
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

// Timeline Reveal Animation
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 200); // Staggered animation delay
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Progress Bar Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = targetWidth + '%';
                }, 300);
            }
        });
    }, {
        threshold: 0.1
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize additional features if they exist on the page
window.addEventListener('load', function() {
    if (document.querySelector('.timeline-item')) {
        initializeTimeline();
    }
    
    if (document.querySelector('.progress-bar')) {
        initializeProgressBars();
    }
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 