// Main JavaScript for AI Super Independent Learning Website

document.addEventListener('DOMContentLoaded', function() {
    // コンソールにロード完了のメッセージを表示
    console.log('Document loaded and ready');
    
    // Initialize Preline UI components
    if (typeof HSStaticMethods !== 'undefined') {
        HSStaticMethods.autoInit();
        console.log('Preline UI initialized');
    } else {
        console.warn('Preline UI not available');
    }

    // チャートの初期化
    initCharts();
    
    // Initialize scroll spy for navigation
    initScrollSpy();
    
    // アニメーション機能は任意で有効化（デフォルトでコンテンツは表示されている）
    // document.body.classList.add('animate-ready');
    // initScrollAnimations();
});

// Scroll-based Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fadeIn');
    console.log(`Found ${animatedElements.length} animated elements`);
    
    // 初期表示時にすべての要素を可視化
    animatedElements.forEach(el => {
        el.classList.add('is-visible');
    });
    
    // スクロールに応じたアニメーション効果（オプション）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 一度表示されたら監視を解除するオプション
                // observer.unobserve(entry.target);
            } else {
                // 画面外に出たときにクラスを削除するオプション
                // entry.target.classList.remove('is-visible');
            }
        });
    }, { 
        threshold: 0.1, // 10%表示されたら発火
        rootMargin: '0px 0px -50px 0px' // 下部マージンを調整
    });
    
    // 監視の開始
    if (document.body.classList.contains('animate-ready')) {
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Scroll Spy for Navigation Highlighting
function initScrollSpy() {
    const sections = document.querySelectorAll('[data-section]');
    const navLinks = document.querySelectorAll('.nav-scrollspy ul li a');
    
    console.log(`Found ${sections.length} sections for scroll spy`);
    
    // Generate navigation links if they don't exist
    if (navLinks.length === 0) {
        generateNavLinks(sections);
    }
    
    const navContainer = document.querySelector('.nav-scrollspy ul');
    if (!navContainer || !sections.length) {
        console.warn('Navigation container or sections not found');
        return;
    }
    
    // Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSection = entry.target.id;
                document.querySelectorAll('.nav-scrollspy ul li a').forEach(link => {
                    if (link.getAttribute('href') === `#${activeSection}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { 
        threshold: 0.4, // When 40% of the section is visible
        rootMargin: '-60px 0px -40% 0px' // Adjust for header height
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Generate Navigation Links
function generateNavLinks(sections) {
    const navContainer = document.querySelector('.nav-scrollspy ul');
    if (!navContainer) {
        console.warn('Navigation container not found');
        return;
    }
    
    navContainer.innerHTML = '';
    
    sections.forEach(section => {
        const sectionId = section.id;
        if (!sectionId) return;
        
        // Try to get the title from the section's heading
        const sectionHeading = section.querySelector('h2, h3');
        let sectionTitle = sectionId.replace(/-/g, ' ');
        sectionTitle = sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1);
        
        if (sectionHeading) {
            sectionTitle = sectionHeading.textContent.trim();
            // Truncate if too long
            if (sectionTitle.length > 15) {
                sectionTitle = sectionTitle.substring(0, 13) + '...';
            }
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${sectionId}`;
        link.textContent = sectionTitle;
        link.classList.add('px-3', 'py-1.5', 'text-sm', 'font-medium', 'rounded-md', 'hover:bg-gray-100');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.querySelector(`#${sectionId}`);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
        
        listItem.appendChild(link);
        navContainer.appendChild(listItem);
    });
    
    console.log('Navigation links generated');
}

// Initialize Charts
function initCharts() {
    console.log('Initializing charts');
    
    initTranslationKonnyakuChart();
    initAIGrowthChart();
    initMindsetComparisonChart();
}

// 翻訳こんにゃく効果チャート
function initTranslationKonnyakuChart() {
    const ctx = document.getElementById('translationKonnyakuChart');
    if (!ctx) {
        console.warn('Translation Konnyaku chart canvas not found');
        return;
    }
    
    try {
        const data = {
            labels: ['情報アクセス', '理解深度', 'コミュニケーション効率', '知識の統合', '学習スピード'],
            datasets: [
                {
                    label: 'AI登場前',
                    data: [40, 35, 30, 25, 35],
                    backgroundColor: 'rgba(156, 163, 175, 0.2)', // gray-400
                    borderColor: 'rgba(156, 163, 175, 1)',
                    borderWidth: 2,
                    borderRadius: 6,
                },
                {
                    label: 'AI登場後',
                    data: [85, 80, 90, 75, 85],
                    backgroundColor: 'rgba(79, 70, 229, 0.2)', // indigo-600
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 2,
                    borderRadius: 6,
                }
            ]
        };
        
        new Chart(ctx, {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12,
                                family: "'Noto Sans JP', sans-serif"
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        titleFont: {
                            size: 14,
                            family: "'Noto Sans JP', sans-serif",
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13,
                            family: "'Noto Sans JP', sans-serif"
                        },
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(156, 163, 175, 0.3)'
                        },
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                family: "'Noto Sans JP', sans-serif"
                            }
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            stepSize: 20
                        },
                        beginAtZero: true,
                        max: 100
                    }
                },
                elements: {
                    line: {
                        tension: 0.2
                    }
                }
            }
        });
        
        console.log('Translation Konnyaku chart initialized');
    } catch (error) {
        console.error('Error initializing Translation Konnyaku chart:', error);
    }
}

// AI成長エンジンチャート
function initAIGrowthChart() {
    const ctx = document.getElementById('aiGrowthChart');
    if (!ctx) {
        console.warn('AI Growth Engine chart canvas not found');
        return;
    }
    
    try {
        const data = {
            labels: ['今日', '1ヶ月後', '3ヶ月後', '6ヶ月後', '1年後'],
            datasets: [
                {
                    label: '従来型学習',
                    data: [10, 15, 21, 28, 38],
                    fill: true,
                    backgroundColor: 'rgba(96, 165, 250, 0.1)', // blue-400 with transparency
                    borderColor: 'rgba(96, 165, 250, 1)',
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(96, 165, 250, 1)',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    borderDash: [5, 5]
                },
                {
                    label: 'AI活用型学習',
                    data: [10, 25, 45, 80, 140],
                    fill: true,
                    backgroundColor: 'rgba(139, 92, 246, 0.1)', // purple-500 with transparency
                    borderColor: 'rgba(139, 92, 246, 1)',
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        };
        
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12,
                                family: "'Noto Sans JP', sans-serif"
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        titleFont: {
                            size: 14,
                            family: "'Noto Sans JP', sans-serif",
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13,
                            family: "'Noto Sans JP', sans-serif"
                        },
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '相対的成長スコア',
                            font: {
                                size: 13,
                                family: "'Noto Sans JP', sans-serif"
                            }
                        },
                        ticks: {
                            font: {
                                size: 12,
                                family: "'Noto Sans JP', sans-serif"
                            }
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '時間経過',
                            font: {
                                size: 13,
                                family: "'Noto Sans JP', sans-serif"
                            }
                        },
                        ticks: {
                            font: {
                                size: 12,
                                family: "'Noto Sans JP', sans-serif"
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
        
        console.log('AI Growth Engine chart initialized');
    } catch (error) {
        console.error('Error initializing AI Growth Engine chart:', error);
    }
}

// マインドセット比較チャート
function initMindsetComparisonChart() {
    const ctx = document.getElementById('mindsetComparisonChart');
    if (!ctx) {
        console.warn('Mindset Comparison chart canvas not found');
        return;
    }
    
    try {
        const data = {
            labels: ['主体性', '創造性', '成長スピード', 'AI活用度', '将来性'],
            datasets: [
                {
                    label: '使う側',
                    data: [30, 20, 35, 50, 25],
                    backgroundColor: 'rgba(239, 68, 68, 0.2)', // red-500
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 2,
                    hoverBackgroundColor: 'rgba(239, 68, 68, 0.3)',
                    borderRadius: 6,
                },
                {
                    label: '共創する側',
                    data: [85, 90, 80, 95, 90],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)', // emerald-500
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                    hoverBackgroundColor: 'rgba(16, 185, 129, 0.3)',
                    borderRadius: 6,
                }
            ]
        };
        
        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12,
                                family: "'Noto Sans JP', sans-serif"
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        titleFont: {
                            size: 14,
                            family: "'Noto Sans JP', sans-serif",
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13,
                            family: "'Noto Sans JP', sans-serif"
                        },
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: {
                                size: 12,
                                family: "'Noto Sans JP', sans-serif"
                            }
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 11,
                                family: "'Noto Sans JP', sans-serif"
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
        
        console.log('Mindset Comparison chart initialized');
    } catch (error) {
        console.error('Error initializing Mindset Comparison chart:', error);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('[data-toggle="mobile-menu"]');
const mobileMenu = document.querySelector('[data-menu="mobile-menu"]');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
} 