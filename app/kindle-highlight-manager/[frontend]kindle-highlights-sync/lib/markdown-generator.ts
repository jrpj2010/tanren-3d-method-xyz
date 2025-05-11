import type { KindleBook, KindleHighlight } from "./kindle-scraper"

/**
 * KindleのハイライトデータからMarkdownを生成する
 */
export function generateMarkdown(
  book: KindleBook,
  options?: {
    templateType?: "default" | "minimal"
  },
): string {
  const { templateType = "default" } = options || {}

  // YAMLフロントマターの生成
  const frontMatter = `---
title: "${book.title}"
author: "${book.author}"
asin: "${book.asin}"
last_synced: "${new Date().toISOString()}"
${book.coverUrl ? `cover_url: "${book.coverUrl}"` : ""}
---

`

  // ハイライトセクションの生成
  const highlightsSection = `## ハイライトとメモ

${book.highlights.map((highlight) => formatHighlight(highlight, templateType)).join("\n\n---\n\n")}
`

  return frontMatter + highlightsSection
}

/**
 * 個々のハイライトをフォーマットする
 */
function formatHighlight(highlight: KindleHighlight, templateType: "default" | "minimal"): string {
  const formattedDate = new Date(highlight.date).toLocaleString("ja-JP")

  if (templateType === "minimal") {
    return `> ${highlight.text}
*${highlight.location}*
${highlight.note ? `\n${highlight.note}` : ""}`
  }

  return `> ${highlight.text}
*日時: ${formattedDate}*
*位置: ${highlight.location}*
${highlight.color ? `*色: ${highlight.color}*` : ""}

${highlight.note || ""}`
}

/**
 * 既存のMarkdownファイルに新しいハイライトを追加する
 */
export function updateMarkdown(existingContent: string, newHighlights: KindleHighlight[]): string {
  // YAMLフロントマターを更新
  const updatedFrontMatter = existingContent.replace(/last_synced: ".*"/, `last_synced: "${new Date().toISOString()}"`)

  // 既存のハイライトセクションを見つける
  const highlightsSectionMatch = updatedFrontMatter.match(/## ハイライトとメモ\n\n([\s\S]*)/)

  if (!highlightsSectionMatch) {
    // ハイライトセクションが見つからない場合は、新しいセクションを追加
    const newHighlightsSection = `## ハイライトとメモ

${newHighlights.map((highlight) => formatHighlight(highlight, "default")).join("\n\n---\n\n")}
`
    return updatedFrontMatter + newHighlightsSection
  }

  // 既存のハイライトセクションに新しいハイライトを追加
  const existingHighlightsSection = highlightsSectionMatch[0]
  const newHighlightsFormatted = newHighlights
    .map((highlight) => formatHighlight(highlight, "default"))
    .join("\n\n---\n\n")

  return updatedFrontMatter.replace(
    existingHighlightsSection,
    `## ハイライトとメモ

${newHighlightsFormatted}

---

${existingHighlightsSection.replace("## ハイライトとメモ\n\n", "")}`,
  )
}
