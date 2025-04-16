import os
import datetime

def generate_kddi_svg_slide():
    """
    KDDIのサステナビリティレポートに基づいた明治・昭和モダンテイスト3カラムSVGスライドを生成
    """
    # 現在の日時を取得してフォルダ名を作成
    now = datetime.datetime.now()
    date_str = now.strftime("%Y%m%d_%H%M%S")
    
    # SVGコンテンツ - 明治・昭和モダンテイスト 3カラムスライド
    svg_content = '''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <!-- 背景 -->
    <rect width="1920" height="1080" fill="#f4f1ea"/>
    
    <!-- ヘッダー -->
    <rect x="0" y="0" width="1920" height="80" fill="#2c2c2c"/>
    <text x="60" y="55" font-family="'Noto Serif JP', serif" font-size="32" font-weight="700" fill="#f4f1ea" letter-spacing="2">KDDIのサステナビリティと未来創造</text>
    <text x="1760" y="55" font-family="'Noto Sans JP', sans-serif" font-size="20" font-weight="400" fill="#f4f1ea" text-anchor="end">2024年版</text>
    
    <!-- 左カラム -->
    <g transform="translate(60, 120)">
        <!-- カラムタイトル -->
        <rect x="0" y="0" width="560" height="50" fill="#b3322b" rx="3"/>
        <text x="25" y="35" font-family="'Noto Serif JP', serif" font-size="24" fill="#f4f1ea" letter-spacing="2">「つなぐチカラ」の本質</text>
        
        <!-- サブタイトル -->
        <text x="25" y="85" font-family="'Noto Sans JP', sans-serif" font-size="18" fill="#2c2c2c" font-weight="700">通信技術を超えた社会的価値の創造</text>
        <line x1="25" y1="95" x2="535" y2="95" stroke="#b3322b" stroke-width="2"/>
        <circle cx="25" cy="95" r="4" fill="#b3322b"/>
        <circle cx="535" cy="95" r="4" fill="#b3322b"/>
        
        <!-- 本質説明 -->
        <text x="25" y="130" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c">KDDIの「つなぐチカラ」とは、単なる回線接続を超え、</text>
        <text x="25" y="155" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c">人々の命・暮らし・心をつなぐ総合的な価値創造です。</text>
        
        <!-- 図解：つなぐチカラの構造 -->
        <rect x="25" y="175" width="510" height="200" fill="#f7f5f0" stroke="#b3322b" stroke-width="1" rx="3"/>
        <text x="280" y="205" font-family="'Noto Serif JP', serif" font-size="18" fill="#2c2c2c" font-weight="700" text-anchor="middle">「つなぐチカラ」の3層構造</text>
        
        <!-- 図の内容 -->
        <rect x="65" y="225" width="430" height="50" fill="#b3322b" opacity="0.15" rx="3"/>
        <text x="280" y="257" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c" text-anchor="middle" font-weight="700">命をつなぐ：災害時の通信確保</text>
        
        <rect x="65" y="285" width="430" height="50" fill="#b3322b" opacity="0.3" rx="3"/>
        <text x="280" y="317" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c" text-anchor="middle" font-weight="700">暮らしをつなぐ：ICTによる社会課題解決</text>
        
        <rect x="65" y="345" width="430" height="50" fill="#b3322b" opacity="0.45" rx="3"/>
        <text x="280" y="377" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c" text-anchor="middle" font-weight="700">心をつなぐ：感動・ワクワク体験の創出</text>
        
        <!-- 実践事例 -->
        <rect x="25" y="400" width="510" height="420" fill="#f7f5f0" stroke="#2c2c2c" stroke-width="1" rx="3"/>
        <text x="45" y="430" font-family="'Noto Serif JP', serif" font-size="18" fill="#2c2c2c" font-weight="700">〈コンサルティング手法：VRIO分析〉</text>
        
        <rect x="45" y="450" width="470" height="350" fill="white" stroke="#b3322b" stroke-width="1" rx="3"/>
        
        <!-- VRIO分析表 -->
        <line x1="45" y1="490" x2="515" y2="490" stroke="#2c2c2c" stroke-width="1"/>
        <line x1="245" y1="450" x2="245" y2="800" stroke="#2c2c2c" stroke-width="1"/>
        
        <text x="145" y="475" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">経営資源</text>
        <text x="380" y="475" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">KDDIの競争優位性</text>
        
        <!-- 行ごとのデータ -->
        <line x1="45" y1="520" x2="515" y2="520" stroke="#2c2c2c" stroke-width="1" stroke-dasharray="2"/>
        <text x="55" y="510" font-family="'Noto Sans JP', sans-serif" font-size="13" fill="#2c2c2c" font-weight="700">Value（価値）</text>
        <text x="255" y="505" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">• 強靭な通信基盤による災害時対応</text>
        <text x="255" y="525" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">• 顧客体験の質的向上</text>
        
        <line x1="45" y1="570" x2="515" y2="570" stroke="#2c2c2c" stroke-width="1" stroke-dasharray="2"/>
        <text x="55" y="550" font-family="'Noto Sans JP', sans-serif" font-size="13" fill="#2c2c2c" font-weight="700">Rarity（希少性）</text>
        <text x="255" y="545" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">• 5G/IoTの高度な技術蓄積</text>
        <text x="255" y="565" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">• パートナー企業とのエコシステム</text>
        
        <line x1="45" y1="620" x2="515" y2="620" stroke="#2c2c2c" stroke-width="1" stroke-dasharray="2"/>
        <text x="55" y="600" font-family="'Noto Sans JP', sans-serif" font-size="13" fill="#2c2c2c" font-weight="700">Imitability</text>
        <text x="55" y="615" font-family="'Noto Sans JP', sans-serif" font-size="13" fill="#2c2c2c" font-weight="700">（模倣困難性）</text>
        <text x="255" y="595" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">• 大規模通信インフラの構築実績</text>
        <text x="255" y="615" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">• 「つなぐチカラ」の企業文化</text>
        
        <line x1="45" y1="670" x2="515" y2="670" stroke="#2c2c2c" stroke-width="1" stroke-dasharray="2"/>
        <text x="55" y="650" font-family="'Noto Sans JP', sans-serif" font-size="13" fill="#2c2c2c" font-weight="700">Organization</text>
        <text x="55" y="665" font-family="'Noto Sans JP', sans-serif" font-size="13" fill="#2c2c2c" font-weight="700">（組織）</text>
        <text x="255" y="645" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">• 企業理念に根ざした組織文化</text>
        <text x="255" y="665" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">• 先進技術投資の意思決定体制</text>
        
        <!-- 結論 -->
        <rect x="45" y="680" width="470" height="100" fill="#f7f5f0" rx="3"/>
        <text x="55" y="705" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" font-weight="700">持続的競争優位性：</text>
        <text x="55" y="730" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">KDDIは「つなぐチカラ」という理念のもと、</text>
        <text x="55" y="750" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">技術と組織文化の両面で独自性を持ち、</text>
        <text x="55" y="770" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">長期的・持続的な競争優位を確立している。</text>
    </g>
    
    <!-- 中央カラム -->
    <g transform="translate(680, 120)">
        <!-- カラムタイトル -->
        <rect x="0" y="0" width="560" height="50" fill="#1a5b66" rx="3"/>
        <text x="25" y="35" font-family="'Noto Serif JP', serif" font-size="24" fill="#f4f1ea" letter-spacing="2">サステナビリティ戦略</text>
        
        <!-- サブタイトル -->
        <text x="25" y="85" font-family="'Noto Sans JP', sans-serif" font-size="18" fill="#2c2c2c" font-weight="700">社会・地球環境との共創による持続的成長</text>
        <line x1="25" y1="95" x2="535" y2="95" stroke="#1a5b66" stroke-width="2"/>
        <circle cx="25" cy="95" r="4" fill="#1a5b66"/>
        <circle cx="535" cy="95" r="4" fill="#1a5b66"/>
        
        <!-- 図解：サステナビリティ戦略マップ -->
        <rect x="25" y="115" width="510" height="300" fill="#f7f5f0" stroke="#1a5b66" stroke-width="1" rx="3"/>
        <text x="280" y="145" font-family="'Noto Serif JP', serif" font-size="18" fill="#2c2c2c" font-weight="700" text-anchor="middle">KDDIの戦略的優先事項マトリクス</text>
        
        <!-- BCGマトリクス風の図 -->
        <line x1="75" y1="175" x2="485" y2="175" stroke="#2c2c2c" stroke-width="2"/>
        <line x1="75" y1="175" x2="75" y2="385" stroke="#2c2c2c" stroke-width="2"/>
        
        <!-- 軸ラベル -->
        <text x="280" y="405" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle">社会的インパクト</text>
        <text transform="rotate(-90)" x="-280" y="55" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle">ビジネス成長性</text>
        
        <!-- 象限ラベル -->
        <text x="180" y="195" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#2c2c2c" text-anchor="middle">高成長・低インパクト</text>
        <text x="390" y="195" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#2c2c2c" text-anchor="middle">高成長・高インパクト</text>
        <text x="180" y="365" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#2c2c2c" text-anchor="middle">低成長・低インパクト</text>
        <text x="390" y="365" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#2c2c2c" text-anchor="middle">低成長・高インパクト</text>
        
        <!-- マトリクス内のアイテム -->
        <circle cx="390" cy="225" r="40" fill="#1a5b66" opacity="0.7"/>
        <text x="390" y="230" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="white" text-anchor="middle" font-weight="700">通信防災</text>
        
        <circle cx="420" cy="280" r="35" fill="#1a5b66" opacity="0.6"/>
        <text x="420" y="285" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="white" text-anchor="middle" font-weight="700">脱炭素</text>
        
        <circle cx="350" cy="260" r="35" fill="#1a5b66" opacity="0.5"/>
        <text x="350" y="265" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="white" text-anchor="middle" font-weight="700">地方創生</text>
        
        <circle cx="210" cy="210" r="30" fill="#1a5b66" opacity="0.4"/>
        <text x="210" y="215" font-family="'Noto Sans JP', sans-serif" font-size="10" fill="white" text-anchor="middle" font-weight="700">次世代通信</text>
        
        <circle cx="150" cy="270" r="25" fill="#1a5b66" opacity="0.3"/>
        <text x="150" y="275" font-family="'Noto Sans JP', sans-serif" font-size="10" fill="white" text-anchor="middle" font-weight="700">DX推進</text>
        
        <circle cx="250" cy="330" r="20" fill="#1a5b66" opacity="0.2"/>
        <text x="250" y="335" font-family="'Noto Sans JP', sans-serif" font-size="9" fill="white" text-anchor="middle" font-weight="700">人財育成</text>
        
        <!-- マテリアリティ分析 -->
        <rect x="25" y="430" width="510" height="390" fill="#f7f5f0" stroke="#2c2c2c" stroke-width="1" rx="3"/>
        <text x="45" y="460" font-family="'Noto Serif JP', serif" font-size="18" fill="#2c2c2c" font-weight="700">〈コンサルティング手法：マテリアリティ分析〉</text>
        
        <!-- マテリアリティ分析の内容 -->
        <text x="45" y="490" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" font-weight="700">KDDIの重要課題（マテリアリティ）</text>
        
        <!-- 5つの重点領域と対応指標 -->
        <rect x="45" y="505" width="470" height="45" fill="#1a5b66" opacity="0.2" rx="3"/>
        <text x="55" y="530" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" font-weight="700">① 通信基盤の強靭化・災害対策</text>
        <text x="325" y="530" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">KPI: 重大インフラ障害 0件</text>
        
        <rect x="45" y="555" width="470" height="45" fill="#1a5b66" opacity="0.3" rx="3"/>
        <text x="55" y="580" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" font-weight="700">② 気候変動対策・環境保全</text>
        <text x="325" y="580" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">KPI: CO₂排出量 2030年46%削減</text>
        
        <rect x="45" y="605" width="470" height="45" fill="#1a5b66" opacity="0.4" rx="3"/>
        <text x="55" y="630" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" font-weight="700">③ 地域社会との共創</text>
        <text x="325" y="630" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">KPI: 地方創生プロジェクト 200件</text>
        
        <rect x="45" y="655" width="470" height="45" fill="#1a5b66" opacity="0.5" rx="3"/>
        <text x="55" y="680" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" font-weight="700">④ 多様な人財の育成・働き方改革</text>
        <text x="325" y="680" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">KPI: 女性管理職比率 2030年30%</text>
        
        <rect x="45" y="705" width="470" height="45" fill="#1a5b66" opacity="0.6" rx="3"/>
        <text x="55" y="730" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" font-weight="700">⑤ パートナーシップの強化</text>
        <text x="325" y="730" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">KPI: 新規ビジネス創出 100件/年</text>
        
        <!-- 注釈 -->
        <text x="45" y="765" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#2c2c2c" font-style="italic">※KDDIサステナビリティレポート2024より作成</text>
        <text x="45" y="785" font-family="'Noto Sans JP', sans-serif" font-size="11" fill="#2c2c2c" font-style="italic">※KPIは報告書を元に再構成したもの</text>
    </g>
    
    <!-- 右カラム -->
    <g transform="translate(1300, 120)">
        <!-- カラムタイトル -->
        <rect x="0" y="0" width="560" height="50" fill="#653a5e" rx="3"/>
        <text x="25" y="35" font-family="'Noto Serif JP', serif" font-size="24" fill="#f4f1ea" letter-spacing="2">KDDI VISION 2030の実現</text>
        
        <!-- サブタイトル -->
        <text x="25" y="85" font-family="'Noto Sans JP', sans-serif" font-size="18" fill="#2c2c2c" font-weight="700">ワクワクを提案し続ける社会的共創</text>
        <line x1="25" y1="95" x2="535" y2="95" stroke="#653a5e" stroke-width="2"/>
        <circle cx="25" cy="95" r="4" fill="#653a5e"/>
        <circle cx="535" cy="95" r="4" fill="#653a5e"/>
        
        <!-- ビジョン2030の3つの柱 -->
        <rect x="25" y="115" width="510" height="210" fill="#f7f5f0" stroke="#653a5e" stroke-width="1" rx="3"/>
        <text x="45" y="145" font-family="'Noto Serif JP', serif" font-size="18" fill="#2c2c2c" font-weight="700">VISION 2030 3つの柱</text>
        
        <!-- 3本柱の図 -->
        <rect x="45" y="165" width="150" height="140" fill="#653a5e" opacity="0.3" rx="3"/>
        <text x="120" y="195" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">真のデジタル</text>
        <text x="120" y="215" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">社会の実現</text>
        
        <rect x="205" y="165" width="150" height="140" fill="#653a5e" opacity="0.5" rx="3"/>
        <text x="280" y="195" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">ワクワクを</text>
        <text x="280" y="215" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">提案し続ける</text>
        
        <rect x="365" y="165" width="150" height="140" fill="#653a5e" opacity="0.7" rx="3"/>
        <text x="440" y="195" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">社会の持続的</text>
        <text x="440" y="215" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">成長に貢献</text>
        
        <!-- 5Gとソーシャルデザイン分析 -->
        <rect x="25" y="340" width="510" height="480" fill="#f7f5f0" stroke="#2c2c2c" stroke-width="1" rx="3"/>
        <text x="45" y="370" font-family="'Noto Serif JP', serif" font-size="18" fill="#2c2c2c" font-weight="700">〈コンサルティング手法：ソーシャルデザイン〉</text>
        
        <!-- 図解：社会課題解決のフレームワーク -->
        <text x="45" y="400" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" font-weight="700">KDDIの社会課題解決フレームワーク</text>
        
        <!-- ダイヤグラム -->
        <polygon points="280,430 200,500 280,570 360,500" fill="#653a5e" opacity="0.2" stroke="#653a5e" stroke-width="2"/>
        <text x="280" y="505" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c" text-anchor="middle" font-weight="700">社会課題</text>
        
        <circle cx="120" cy="500" r="70" fill="#653a5e" opacity="0.3" stroke="#653a5e" stroke-width="1"/>
        <text x="120" y="490" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">KDDIの</text>
        <text x="120" y="510" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">技術資産</text>
        
        <circle cx="440" cy="500" r="70" fill="#653a5e" opacity="0.3" stroke="#653a5e" stroke-width="1"/>
        <text x="440" y="490" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">パートナー</text>
        <text x="440" y="510" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="700">企業の知見</text>
        
        <!-- 矢印 -->
        <line x1="175" y1="500" x2="220" y2="500" stroke="#2c2c2c" stroke-width="1" marker-end="url(#arrow)"/>
        <line x1="340" y1="500" x2="385" y2="500" stroke="#2c2c2c" stroke-width="1" marker-end="url(#arrow)"/>
        
        <!-- 矢印マーカー定義 -->
        <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#2c2c2c"/>
            </marker>
        </defs>
        
        <!-- ソリューション欄 -->
        <rect x="45" y="600" width="470" height="200" fill="white" stroke="#653a5e" stroke-width="1" rx="3"/>
        <text x="55" y="625" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c" font-weight="700">主な社会課題×通信技術ソリューション</text>
        
        <!-- ソリューション事例 -->
        <line x1="45" y1="640" x2="515" y2="640" stroke="#2c2c2c" stroke-width="1"/>
        
        <text x="55" y="660" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#653a5e" font-weight="700">① 地方の過疎化・高齢化</text>
        <text x="75" y="680" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">→ 5G活用による遠隔医療・教育システム</text>
        <text x="75" y="700" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">→ IoT活用型スマート農業の推進</text>
        
        <text x="55" y="725" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#653a5e" font-weight="700">② 災害対策・BCP強化</text>
        <text x="75" y="745" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">→ ドローン活用の被災状況把握システム</text>
        <text x="75" y="765" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">→ AI予測による災害予防インフラ</text>
        
        <text x="55" y="790" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#653a5e" font-weight="700">③ 環境負荷低減・脱炭素</text>
        <text x="75" y="810" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">→ 通信設備の省エネ化・再エネ導入</text>
        <text x="75" y="830" font-family="'Noto Sans JP', sans-serif" font-size="12" fill="#2c2c2c">→ DXによるペーパーレス・移動削減</text>
    </g>
    
    <!-- フッター -->
    <rect x="0" y="1030" width="1920" height="50" fill="#2c2c2c"/>
    <text x="60" y="1060" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#f4f1ea">KDDIサステナビリティ統合レポート2024を元に作成</text>
    <text x="1860" y="1060" font-family="'Noto Sans JP', sans-serif" font-size="14" fill="#f4f1ea" text-anchor="end">Page 1</text>
</svg>
'''
    
    # 保存先ディレクトリパス
    output_dir = os.path.join("昭和明治スライド", date_str)
    
    # ディレクトリが存在しない場合は作成
    os.makedirs(output_dir, exist_ok=True)
    
    # SVGファイルの保存
    svg_file_path = os.path.join(output_dir, "kddi_sustainability_slide_01.svg")
    with open(svg_file_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    
    print(f"SVGスライドを生成しました: {svg_file_path}")
    
    # プレゼン用トークスクリプトとインフォグラフィックプロンプトを別ファイルに保存
    talk_script = '''# KDDIサステナビリティ・ビジョンプレゼンテーション トークスクリプト

このスライドでは、KDDIの企業理念「つなぐチカラ」の本質と、それに基づくサステナビリティ戦略、そしてVISION 2030の実現に向けた取り組みを3つの視点から解説します。

左側のカラムでは、「つなぐチカラ」が単なる通信技術ではなく、人々の命や暮らし、心をつなぐ総合的な価値創造であることを示しています。VRIO分析を通じて、この理念が持続的競争優位をもたらす源泉であることが明らかになります。

中央のカラムでは、KDDIのサステナビリティ戦略を戦略的優先事項マトリクスとマテリアリティ分析を通じて解説しています。特に通信防災や脱炭素、地方創生などの重点領域がビジネス成長と社会的インパクトの両面で重視されていることがわかります。

右側のカラムでは、VISION 2030の3つの柱と、社会課題解決のためのフレームワークを紹介しています。KDDIの技術資産とパートナー企業の知見を掛け合わせることで、過疎化・高齢化、災害対策、環境負荷低減といった課題に対する具体的なソリューションを創出しています。
'''
    
    infographic_prompts = '''```
corporate sustainability report, KDDI Japanese telecom company, geometric modern Japanese style, 3 column infographic, minimalist red navy and purple color scheme, thin lines, strategic business visualization, sustainability icons, CSR framework diagram, monochrome backgrounds with accent colors, clean typography, Noto font, 16:9 format, corporate annual report style
```

```
KDDI Vision 2030 corporate strategy, Japanese modernist design, Showa era geometric patterns, infographic with 3 vertical columns, muted earth tones with accent colors, sustainability metrics visualization, VRIO analysis chart, strategic matrix diagram, minimalist business iconography, clean typography, corporate professional layout, 16:9 format
```

```
telecom sustainability report, vintage Japanese modernist aesthetic, three panel infographic, strategic business frameworks, BCSG matrix design, material issue analysis chart, social design framework, thin line art, geometric patterns, limited color palette with purple blue and red accents, Noto Serif Japanese font headings, professional corporate visual storytelling
```
'''
    
    script_file_path = os.path.join(output_dir, "kddi_sustainability_presentation_script.md")
    with open(script_file_path, "w", encoding="utf-8") as f:
        f.write(talk_script)
    
    prompts_file_path = os.path.join(output_dir, "kddi_infographic_prompts.md")
    with open(prompts_file_path, "w", encoding="utf-8") as f:
        f.write(infographic_prompts)
    
    print(f"トークスクリプトを生成しました: {script_file_path}")
    print(f"インフォグラフィックプロンプトを生成しました: {prompts_file_path}")
    
    return svg_file_path, script_file_path, prompts_file_path

if __name__ == "__main__":
    generate_kddi_svg_slide() 