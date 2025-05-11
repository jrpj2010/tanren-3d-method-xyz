document.addEventListener('DOMContentLoaded', () => {
    const slideNavigation = document.getElementById('slide-navigation');
    const pageContent = document.getElementById('page-content'); // メインコンテンツエリアのID変更
    // data-hs-scrollspy-groupを持つ主要セクションを取得
    const mainSections = pageContent.querySelectorAll('section[data-hs-scrollspy-group]');

    if (!slideNavigation || !pageContent || mainSections.length === 0) {
        console.warn('Navigation, page content, or main sections not found. Navigation will not be fully initialized.');
        // return; // ナビゲーションが必須でなければ処理を続ける
    }

    // HTML内の主要セクションに基づいてナビゲーションを生成
    mainSections.forEach((section) => {
        const sectionId = section.id;
        if (!sectionId) return; // IDがないセクションはスキップ

        // セクションタイトルを h2[data-anchor="true"] または h3[data-anchor="true"] から取得
        const titleElement = section.querySelector('h2[data-anchor="true"], h3[data-anchor="true"]');
        let sectionTitleText = sectionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // デフォルトタイトル (例: intro-section -> Intro Section)

        if (titleElement) {
            sectionTitleText = titleElement.textContent.trim();
        }

        const navButton = document.createElement('a'); // アンカータグに変更
        navButton.textContent = sectionTitleText.length > 12 ? sectionTitleText.substring(0, 10) + '...' : sectionTitleText;
        navButton.title = sectionTitleText;
        navButton.href = `#${sectionId}`; // href属性でターゲットを指定
        navButton.classList.add(
            'px-2.5', 'py-1', 'text-xs', 'sm:text-sm', 'font-medium', 'rounded-md', 'transition-all',
            'duration-200', 'ease-in-out', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2',
            'focus:ring-indigo-500', 'border',
            'hs-scrollspy-active:bg-indigo-600', 'hs-scrollspy-active:text-white', 'hs-scrollspy-active:border-indigo-600',
            'bg-white', 'text-slate-700', 'border-slate-300', 'hover:bg-slate-100', 'hover:text-indigo-600', 'hover:border-indigo-300'
        );
        // Preline Scrollspyがアクティブクラスを付与

        slideNavigation.appendChild(navButton);

        // Chart.jsでグラフを描画 (各セクションに対応するcanvasがある場合)
        const canvasId = `chart-${sectionId.replace('-section', '')}`; // 例: chart-intro
        const canvasElement = section.querySelector(`canvas#${canvasId}`);
        if (canvasElement) {
            const chartContainer = canvasElement.closest('.chart-container');
            if (chartContainer && chartContainer.classList.contains('hidden')) {
                // グラフコンテナが表示されたらグラフを描画する（Intersection Observerなどで）
                const chartObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && chartContainer.classList.contains('hidden')) {
                            chartContainer.classList.remove('hidden');
                            // グラフデータの設定
                            let chartData;
                            let chartTypeOverride = null;
                            if (canvasId === 'chart-ai-gap-section') {
                                // AI格差グラフの特定のデータを設定
                                chartData = {
                                    labels: ['現在', '半年後', '1年後', '2年後', '3年後'],
                                    datasets: [
                                        { label: 'AI活用者', data: [10, 30, 65, 120, 200], colorIndex: 4 }, // Violet
                                        { label: 'AI非活用者', data: [10, 12, 15, 18, 22], colorIndex: 0 }  // Blue
                                    ]
                                };
                                chartTypeOverride = 'line'; // グラフタイプを線グラフに指定
                            } else {
                                // 他のグラフはダミーデータ
                                chartData = {
                                    labels: Array.from({length: 5}, (_, i) => `項目 ${String.fromCharCode(65 + i)}`),
                                    datasets: [
                                        { label: sectionTitleText, data: Array.from({length: 5}, () => Math.floor(Math.random() * 20) + 5), colorIndex: Array.from(mainSections).indexOf(section) }
                                    ]
                                };
                            }

                            // グラフ作成関数を呼び出し
                            createDataChart(canvasId, sectionTitleText, chartData, Array.from(mainSections).indexOf(section), chartTypeOverride);
                            chartObserver.unobserve(entry.target); // 一度描画したら監視解除
                        }
                    });
                }, { threshold: 0.3 }); // 30%表示されたら
                chartObserver.observe(chartContainer);
            } else if (chartContainer && !chartContainer.classList.contains('hidden')) {
                 // 最初から表示されている場合はすぐに描画
                 let chartData;
                 let chartTypeOverride = null;
                 if (canvasId === 'chart-ai-gap-section') {
                     chartData = {
                         labels: ['現在', '半年後', '1年後', '2年後', '3年後'],
                         datasets: [
                             { label: 'AI活用者', data: [10, 30, 65, 120, 200], colorIndex: 4 },
                             { label: 'AI非活用者', data: [10, 12, 15, 18, 22], colorIndex: 0 }
                         ]
                     };
                     chartTypeOverride = 'line';
                 } else {
                     chartData = {
                         labels: Array.from({length: 5}, (_, i) => `項目 ${String.fromCharCode(65 + i)}`),
                         datasets: [
                             { label: sectionTitleText, data: Array.from({length: 5}, () => Math.floor(Math.random() * 20) + 5), colorIndex: Array.from(mainSections).indexOf(section) }
                         ]
                     };
                 }
                 createDataChart(canvasId, sectionTitleText, chartData, Array.from(mainSections).indexOf(section), chartTypeOverride);
            }
        }
    });


    // Chart.jsグラフを作成する関数 (データオブジェクトとタイプオーバーライドを受け取るように変更)
    function createDataChart(canvasId, sectionTitle, chartData, chartIndex, chartTypeOverride = null) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const chartTypes = ['bar', 'line', 'pie', 'doughnut', 'radar', 'polarArea'];
        // タイプが指定されていればそれを使い、なければインデックスに基づいて決定
        const type = chartTypeOverride || chartTypes[chartIndex % chartTypes.length];

        const baseColors = [
            { bgA: 'rgba(59, 130, 246, 0.6)', border: 'rgba(59, 130, 246, 1)', bgB: 'rgba(37, 99, 235, 0.6)' }, // Blue
            { bgA: 'rgba(239, 68, 68, 0.6)', border: 'rgba(239, 68, 68, 1)', bgB: 'rgba(220, 38, 38, 0.6)' }, // Red
            { bgA: 'rgba(16, 185, 129, 0.6)', border: 'rgba(16, 185, 129, 1)', bgB: 'rgba(5, 150, 105, 0.6)' }, // Emerald
            { bgA: 'rgba(245, 158, 11, 0.6)', border: 'rgba(245, 158, 11, 1)', bgB: 'rgba(217, 119, 6, 0.6)' }, // Amber
            { bgA: 'rgba(139, 92, 246, 0.6)', border: 'rgba(139, 92, 246, 1)', bgB: 'rgba(124, 58, 237, 0.6)' }, // Violet
            { bgA: 'rgba(236, 72, 153, 0.6)', border: 'rgba(236, 72, 153, 1)', bgB: 'rgba(219, 39, 119, 0.6)' }  // Pink
        ];
        const selectedColor = baseColors[chartIndex % baseColors.length];
        const labels = chartData.labels;

        // データセットの整形
        const datasets = chartData.datasets.map(ds => {
            const colorIndex = ds.colorIndex !== undefined ? ds.colorIndex : chartIndex; // colorIndexが指定されていれば使う
            const selectedColor = baseColors[colorIndex % baseColors.length];
            const isMultiColorType = ['pie', 'doughnut', 'polarArea'].includes(type);

            return {
                label: ds.label || sectionTitle,
                data: ds.data,
                backgroundColor: isMultiColorType
                    ? ds.data.map((_, i) => baseColors[i % baseColors.length].bgA) // 複数色
                    : (type === 'line' ? selectedColor.bgA.replace('0.6', '0.3') : selectedColor.bgA), // 単色（Lineは薄め）
                borderColor: isMultiColorType
                    ? ds.data.map((_, i) => baseColors[i % baseColors.length].border) // 複数色
                    : selectedColor.border, // 単色
                borderWidth: type === 'line' ? 2.5 : 1.5,
                fill: type === 'line' || type === 'radar',
                tension: type === 'line' ? 0.4 : 0,
                pointBackgroundColor: selectedColor.border,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: selectedColor.border,
                pointRadius: type === 'line' ? 4 : 3,
                pointHoverRadius: type === 'line' ? 6 : 5,
            };
        });


        new Chart(ctx, {
            type: type,
            data: { labels: labels, datasets: datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: (type !== 'pie' && type !== 'doughnut' && type !== 'polarArea' && type !== 'radar') ? {
                    y: { beginAtZero: true, title: { display: true, text: '値', font: { size: 12 } }, grid: { color: 'rgba(200, 200, 200, 0.1)' }, ticks: { font: { size: 10 } } },
                    x: { title: { display: true, text: 'カテゴリ', font: { size: 12 } }, grid: { display: false }, ticks: { font: { size: 10 } } }
                } : (type === 'radar' ? { r: { angleLines: { color: 'rgba(200,200,200,0.2)' }, grid: { color: 'rgba(200,200,200,0.2)' }, pointLabels: { font: { size: 10 } }, ticks: { backdropColor: 'transparent', stepSize: Math.ceil(Math.max(...dataValues)/4) || 5 } } } : {}),
                plugins: {
                    legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 10, usePointStyle: true, pointStyle: 'rectRounded' } },
                    title: { display: true, text: `「${sectionTitle}」関連データ (${type.charAt(0).toUpperCase() + type.slice(1)})`, font: { size: 14, weight: '600' }, color: '#334155', padding: { top: 5, bottom: 15 } },
                    tooltip: {
                        enabled: true, mode: 'index', intersect: false,
                        backgroundColor: 'rgba(30,41,59,0.85)', titleFont: { size: 13, weight: 'bold' }, bodyFont: { size: 11 }, padding: 8, cornerRadius: 4, titleMarginBottom: 6, bodySpacing: 4,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || context.label || '';
                                if (label) { label = label.split('(')[0].trim() + ': '; } // "Section Title (Type)" から "Section Title: " へ
                                const value = context.parsed.y ?? context.parsed.r ?? context.parsed;
                                label += new Intl.NumberFormat('ja-JP').format(value);
                                return label;
                            }
                        }
                    }
                },
                animation: { duration: 800, easing: 'easeOutCubic' }
            }
        });
    }

    // スクロールに応じた表示アニメーション (index.html側で基本的なものは実装済み)
    // 必要であれば、ここでさらに複雑なインタラクションを追加
});