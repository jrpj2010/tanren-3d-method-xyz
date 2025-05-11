// Custom JavaScript for AI超独学法 Chapter 3 - AIとの対話設計術

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Scroll spy for navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');
    
    function activateNavByScroll() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-nav', 'text-white');
                    link.classList.add('text-dark-300');
                });
                
                document.querySelector(`header nav a[href="#${sectionId}"]`).classList.add('active-nav', 'text-white');
                document.querySelector(`header nav a[href="#${sectionId}"]`).classList.remove('text-dark-300');
            }
        });
    }
    
    // Reveal sections on scroll
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        activateNavByScroll();
    });
    
    // Initialize scroll position on page load
    activateNavByScroll();
    
    // Initialize charts if they exist
    initializeCharts();
});

// Function to initialize charts
function initializeCharts() {
    // Check if prompt effectiveness chart exists
    const promptEffectivenessChart = document.getElementById('prompt-effectiveness-chart');
    if (promptEffectivenessChart) {
        new Chart(promptEffectivenessChart, {
            type: 'radar',
            data: {
                labels: ['明確性', '構造化', '詳細度', '目的合致', '制約付与', '例示'],
                datasets: [{
                    label: '基本プロンプト',
                    data: [30, 20, 40, 35, 20, 15],
                    backgroundColor: 'rgba(0, 188, 212, 0.2)',
                    borderColor: 'rgba(0, 188, 212, 0.8)',
                    pointBackgroundColor: 'rgba(0, 188, 212, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 188, 212, 1)'
                }, {
                    label: '改良プロンプト',
                    data: [80, 90, 85, 95, 75, 85],
                    backgroundColor: 'rgba(156, 39, 176, 0.2)',
                    borderColor: 'rgba(156, 39, 176, 0.8)',
                    pointBackgroundColor: 'rgba(156, 39, 176, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(156, 39, 176, 1)'
                }]
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
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#b0bec5',
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            color: '#b0bec5',
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0e0e0'
                        }
                    }
                }
            }
        });
    }
    
    // Check if prompt patterns chart exists
    const promptPatternsChart = document.getElementById('prompt-patterns-chart');
    if (promptPatternsChart) {
        new Chart(promptPatternsChart, {
            type: 'pie',
            data: {
                labels: ['ロールプレイ型', '構造指定型', 'ステップバイステップ型', 'フィードバック型', '創造型'],
                datasets: [{
                    data: [25, 20, 30, 15, 10],
                    backgroundColor: [
                        'rgba(0, 188, 212, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(156, 39, 176, 0.8)',
                        'rgba(0, 150, 136, 0.8)',
                        'rgba(233, 30, 99, 0.8)'
                    ],
                    borderColor: 'rgba(38, 50, 56, 0.8)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e0e0e0',
                            padding: 15
                        }
                    }
                }
            }
        });
    }
}

// AI Dialog Simulation
let dialogSimulator = {
    init: function(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.humanInput = this.container.querySelector('.human-input');
        this.aiOutput = this.container.querySelector('.ai-output');
        this.sendButton = this.container.querySelector('.send-button');
        
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.processPrompt());
        }
        
        this.presetPrompts = [
            "AIテクノロジーの最新トレンドを3つ教えてください。",
            "効果的なプロンプトの書き方のコツを5つ教えてください。",
            "TANRENメソッドについて簡潔に説明してください。"
        ];
        
        this.initPresets();
    },
    
    initPresets: function() {
        const presetsContainer = this.container.querySelector('.preset-prompts');
        if (!presetsContainer) return;
        
        this.presetPrompts.forEach(prompt => {
            const button = document.createElement('button');
            button.textContent = prompt.substring(0, 20) + "...";
            button.className = "px-3 py-1 bg-primary-800 text-white text-sm rounded-md hover:bg-primary-700";
            button.addEventListener('click', () => {
                this.humanInput.value = prompt;
            });
            presetsContainer.appendChild(button);
        });
    },
    
    processPrompt: function() {
        if (!this.humanInput || !this.aiOutput) return;
        
        const promptText = this.humanInput.value.trim();
        if (promptText === "") return;
        
        // Display thinking state
        this.aiOutput.innerHTML = '<div class="thinking-animation"><span>思考中</span><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>';
        
        // Simulate AI processing
        setTimeout(() => {
            this.generateResponse(promptText);
        }, 1500);
    },
    
    generateResponse: function(prompt) {
        let response = "";
        
        // Simple response generation based on prompt content
        if (prompt.includes("トレンド") || prompt.includes("trend")) {
            response = `
                <p class="mb-3">AIテクノロジーの最新トレンドとして、以下の3つが特に注目されています：</p>
                <ol class="list-decimal pl-5 mb-3">
                    <li class="mb-2"><strong>マルチモーダルAI：</strong>テキスト、画像、音声など複数の形式のデータを同時に処理・理解するAIシステムが急速に発展しています。</li>
                    <li class="mb-2"><strong>AI自律エージェント：</strong>複雑なタスクを自律的に計画・実行できるAIシステムが実用化されつつあります。</li>
                    <li class="mb-2"><strong>省エネルギーAI：</strong>計算効率が高く、環境負荷の少ないAIモデルの開発が進んでいます。</li>
                </ol>
                <p>これらのトレンドは互いに連携しながら、AIの活用領域をさらに広げていくでしょう。</p>
            `;
        } else if (prompt.includes("プロンプト") || prompt.includes("prompt")) {
            response = `
                <p class="mb-3">効果的なプロンプトの書き方のコツを5つご紹介します：</p>
                <ol class="list-decimal pl-5 mb-3">
                    <li class="mb-2"><strong>明確な目的を設定する：</strong>何を達成したいのかを具体的に伝えましょう。</li>
                    <li class="mb-2"><strong>適切な役割を与える：</strong>AIに特定の専門家や立場を指定すると、適切な視点からの回答が得られます。</li>
                    <li class="mb-2"><strong>構造を指定する：</strong>回答の形式や構造を明示すると、整理された情報が得られます。</li>
                    <li class="mb-2"><strong>具体例を示す：</strong>期待する回答のスタイルや内容の例を示すと、AIがパターンを理解しやすくなります。</li>
                    <li class="mb-2"><strong>制約条件を設ける：</strong>文字数制限や使用すべき/避けるべき表現などを指定すると、より焦点の絞られた回答が得られます。</li>
                </ol>
                <p>これらのコツを組み合わせて実践することで、AIとの対話の質が格段に向上します。</p>
            `;
        } else if (prompt.includes("TANREN") || prompt.includes("タンレン")) {
            response = `
                <p class="mb-3">TANRENメソッドは、AIと共創するための思考フレームワークで、3つの軸で構成されています：</p>
                <ul class="list-disc pl-5 mb-3">
                    <li class="mb-2"><strong>X軸（思考の深度と構造）：</strong>超抽象化・超具体化・超構造化の3つの思考プロセスを行き来することで、思考の質を高めます。</li>
                    <li class="mb-2"><strong>Y軸（時間軸の視座）：</strong>過去・現在・未来を線として捉え、時間を俯瞰する視点を獲得します。</li>
                    <li class="mb-2"><strong>Z軸（レベル感の把握）：</strong>知識やスキルのレベルを正確に把握し、効率的な成長経路を設計します。</li>
                </ul>
                <p>この3次元思考法により、AIとの共創を効果的に行い、複雑な問題解決や創造的な取り組みを加速させることができます。</p>
            `;
        } else {
            response = `
                <p>ご質問ありがとうございます。より具体的な情報をいただけると、より適切な回答ができます。</p>
                <p class="mt-3">例えば、以下のような情報を追加していただくと助かります：</p>
                <ul class="list-disc pl-5 mt-2">
                    <li>探している情報の具体的な内容</li>
                    <li>情報の用途や目的</li>
                    <li>ご自身の知識レベルや背景</li>
                </ul>
                <p class="mt-3">お気軽に詳細をお知らせください。</p>
            `;
        }
        
        this.aiOutput.innerHTML = response;
    }
};

// Initialize dialog simulator when the page is fully loaded
window.addEventListener('load', function() {
    dialogSimulator.init('dialog-simulator');
}); 