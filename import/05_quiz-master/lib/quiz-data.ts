// クイズデータとジャンル情報を管理するファイル

export const genres = [
  {
    id: "history",
    name: "歴史",
    icon: "📜",
    color: "#f97316",
    description: "古代文明から現代史まで、世界の歴史に関する問題",
  },
  {
    id: "science",
    name: "科学",
    icon: "🔬",
    color: "#06b6d4",
    description: "物理、化学、生物学、天文学など科学に関する問題",
  },
  {
    id: "art",
    name: "芸術",
    icon: "🎨",
    color: "#ec4899",
    description: "絵画、音楽、文学、映画など芸術に関する問題",
  },
  {
    id: "sports",
    name: "スポーツ",
    icon: "⚽",
    color: "#22c55e",
    description: "様々なスポーツの歴史、ルール、選手に関する問題",
  },
  {
    id: "entertainment",
    name: "エンタメ",
    icon: "🎬",
    color: "#a855f7",
    description: "映画、テレビ、音楽、ゲームなどのエンターテイメントに関する問題",
  },
  {
    id: "geography",
    name: "地理",
    icon: "🌍",
    color: "#3b82f6",
    description: "世界の国々、地形、文化、都市に関する問題",
  },
]

// サンプルのクイズデータ
const quizData = {
  history: {
    easy: [
      {
        id: "hist_easy_1",
        text: "日本で最初の永続的な首都はどこですか？",
        options: ["京都", "奈良", "東京", "大阪"],
        correctAnswer: 1,
        explanation:
          "奈良（平城京）は710年に日本初の永続的な首都として設立されました。その後、794年に首都は京都（平安京）に移されました。",
      },
      {
        id: "hist_easy_2",
        text: "第二次世界大戦は何年に終結しましたか？",
        options: ["1943年", "1944年", "1945年", "1946年"],
        correctAnswer: 2,
        explanation: "第二次世界大戦は1945年に連合国の勝利で終結しました。日本の降伏は1945年8月15日に発表されました。",
      },
      // 他の問題も同様に追加
    ],
    medium: [
      // 中級の歴史問題
    ],
    hard: [
      // 上級の歴史問題
    ],
  },
  science: {
    easy: [
      {
        id: "sci_easy_1",
        text: "水の化学式は何ですか？",
        options: ["H2O", "CO2", "O2", "H2O2"],
        correctAnswer: 0,
        explanation: "水の化学式はH2O（水素原子2つと酸素原子1つ）です。",
      },
      {
        id: "sci_easy_2",
        text: "太陽系で最も大きい惑星は？",
        options: ["地球", "火星", "木星", "土星"],
        correctAnswer: 2,
        explanation: "木星は太陽系で最も大きい惑星で、地球の約11倍の直径を持っています。",
      },
      // 他の問題も同様に追加
    ],
    // 他の難易度も同様に追加
  },
  // 他のジャンルも同様に追加
}

// デイリーチャレンジ用のサンプルデータ
const dailyQuestions = [
  {
    id: "daily_1",
    text: "「モナリザ」を描いた芸術家は誰ですか？",
    options: ["レオナルド・ダ・ヴィンチ", "ミケランジェロ", "ラファエロ", "ドナテロ"],
    correctAnswer: 0,
    explanation: "「モナリザ」はレオナルド・ダ・ヴィンチによって1503年頃に描かれた肖像画です。",
  },
  {
    id: "daily_2",
    text: "日本の国花は何ですか？",
    options: ["桜", "菊", "梅", "藤"],
    correctAnswer: 1,
    explanation: "菊（キク）は日本の国花とされています。特に16弁の菊の紋章は皇室の象徴として使用されています。",
  },
  {
    id: "daily_3",
    text: "「ハリー・ポッター」シリーズの作者は誰ですか？",
    options: ["J.K.ローリング", "J.R.R.トールキン", "C.S.ルイス", "ロアルド・ダール"],
    correctAnswer: 0,
    explanation: "「ハリー・ポッター」シリーズはイギリスの作家J.K.ローリングによって書かれました。",
  },
  {
    id: "daily_4",
    text: "人間の体で最も大きい臓器は何ですか？",
    options: ["心臓", "肺", "肝臓", "脳"],
    correctAnswer: 2,
    explanation: "肝臓は人間の体で最も大きい内臓器官で、多くの重要な機能を担っています。",
  },
  {
    id: "daily_5",
    text: "2020年の東京オリンピックは実際には何年に開催されましたか？",
    options: ["2020年", "2021年", "2022年", "開催されていない"],
    correctAnswer: 1,
    explanation: "COVID-19パンデミックの影響により、2020年東京オリンピックは1年延期され、2021年に開催されました。",
  },
]

// クイズの質問を取得する関数
export function getQuizQuestions(genre: string, difficulty: string) {
  // 実際のアプリでは、APIからデータを取得するか、より大きなデータセットを使用します
  // ここではサンプルデータを返します
  try {
    return quizData[genre][difficulty] || []
  } catch (error) {
    console.error("クイズデータの取得に失敗しました", error)
    return []
  }
}

// デイリーチャレンジの質問を取得する関数
export function getDailyQuestions() {
  // 実際のアプリでは、日付に基づいて異なる質問を返します
  return dailyQuestions
}

// ジャンル情報を取得する関数
export function getGenreInfo(genreId: string) {
  return genres.find((genre) => genre.id === genreId)
}
