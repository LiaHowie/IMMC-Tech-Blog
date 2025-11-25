// customEmoji.ts
import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const CustomEmoji: QuartzTransformerPlugin = () => {
  // Optional: list all emoji files in static folder manually here if you want,
  // or rely on build-time Vite glob to preload them (advanced).
  // For simplicity, we'll just replace :emojiName: with /emojis/emojiName.ext

  const regex = /:([a-zA-Z0-9_+-]+):/g

  return {
    name: "CustomEmoji",
    markdownPlugins() {
      const transformer = () => (tree: any) => {
        visit(tree, "text", (node: any, index: number | null, parent: any | null) => {
          if (!parent || index === null) return

          let match: RegExpExecArray | null
          const parts: any[] = []
          let lastIndex = 0

          while ((match = regex.exec(node.value)) !== null) {
            const full = match[0]
            const name = match[1]

            // Construct public URL assuming the emoji file exists in /static/emojis/
            const url = `/Extras/emojis/${name}.webp` // or .webp/.gif depending on your convention

            // Skip if no URL
            if (!url) continue

            if (match.index > lastIndex) {
              parts.push({ type: "text", value: node.value.slice(lastIndex, match.index) })
            }
            parts.push({ type: "html", value: `<img src="${url}" alt="${name}" class="inline-emoji" />` })
            lastIndex = match.index + full.length
          }

          if (parts.length > 0) {
            if (lastIndex < node.value.length) parts.push({ type: "text", value: node.value.slice(lastIndex) })
            parent.children.splice(index, 1, ...parts)
          }
        })
      }
      return [transformer]
    },
  }
}
