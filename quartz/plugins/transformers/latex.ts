import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMathjax from "rehype-mathjax/svg"
//@ts-ignore
import rehypeTypst from "@myriaddreamin/rehype-typst"
import { QuartzTransformerPlugin } from "../types"
import { KatexOptions } from "katex"
import { Options as MathjaxOptions } from "rehype-mathjax/svg"
//@ts-ignore
import { Options as TypstOptions } from "@myriaddreamin/rehype-typst"

import "katex/contrib/mhchem"

interface Options {
  renderEngine: "katex" | "mathjax" | "typst"
  customMacros: MacroType
  katexOptions: Omit<KatexOptions, "macros" | "output">
  mathJaxOptions: Omit<MathjaxOptions, "macros">
  typstOptions: TypstOptions
}

interface MacroType {
  [key: string]: string
}

export const Latex: QuartzTransformerPlugin<Partial<Options>> = (opts) => {
  const engine = opts?.renderEngine ?? "mathjax"
  const macros = opts?.customMacros ?? { 
    "\\cancelto": "\\cancel{#2}^{\\,\\,\\, = #1}", 
    "\\abs": "\\left\\lvert #1 \\right\\rvert", 
    "\\diff": "\\text{d}", 
    "\\Diff": "\\text{D}", 
    "\\degree": "^{\\circ}", 
    "\\ihat": "\\hat{\\imath}", 
    "\\jhat": "\\hat{\\jmath}", 
    "\\khat": "\\hat{k}", 
    "\\ham": "\\hat{H}", 
    "\\matx": "\\underline{\\underline\\mathbf{#1}}", 
    "\\bra": "\\langle #1 \\lvert", 
    "\\ket": "\\lvert #1 \\rangle", 
    "\\braket": "\\langle #1 \\lvert #2 \\rangle", 
    "\\Braket": "\\langle #1 \\lvert #2 \\lvert #3 \\rangle", 
    "\\stf": "\\times 10^{#1}", 
    "\\phi": "\\varphi", 
    "\\epsilon": "\\varepsilon", 
    "\\sol": "_{\\odot}", 
    "\\const": "\\text{const.}", 
    "\\tot": "\\text{tot}", 
    "\\curl": "\\mathcal{#1}", 
    "\\zed": "\\mathcal{Z}", 
    "\\avg": "\\left\\langle #1 \\right\\rangle", 
    "\\diffr": "\\dfrac{\\text{d}^{#3} #1}{\\text{d} #2^{#3}}", 
    "\\partr": "\\dfrac{\\partial^{#3} #1}{\\partial #2^{#3}}", 
    "\\Jhat": "\\hat{J}", 
    "\\Lhat": "\\hat{L}", 
    "\\max": "\\text{max}", 
    "\\min": "\\text{min}", 
    "\\ehat": "\\hat{e}", 
    "\\ex": "\\hat{e}_x", 
    "\\ey": "\\hat{e}_y", 
    "\\ez": "\\hat{e}_z", 
    "\\et": "\\hat{e}_t", 
    "\\elmnt": "\\phantom{}_{#1}^{#2}\\text{#3}",
    "\\diffrat": "\\left.\\dfrac{\\text{d}^{#3} #1}{\\text{d} #2^{#3}}\\right\\lvert_{#4}\\!\\!\\!\\!", 
    "\\partrat": "\\left.\\dfrac{\\partial^{#3} #1}{\\partial #2^{#3}}\\right\\lvert_{#4}\\!\\!\\!\\!", 
    "\\at": "\\left. #1 \\right\\lvert", 
    "\\AA": "\\mathring{A}", 
  }
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath]
    },
    htmlPlugins() {
      switch (engine) {
        case "katex": {
          return [[rehypeKatex, { output: "html", macros, ...(opts?.katexOptions ?? {}) }]]
        }
        case "typst": {
          return [[rehypeTypst, opts?.typstOptions ?? {}]]
        }
        case "mathjax": {
          return [[rehypeMathjax, { macros, ...(opts?.mathJaxOptions ?? {}) }]]
        }
        default: {
          return [[rehypeMathjax, { macros, ...(opts?.mathJaxOptions ?? {}) }]]
        }
      }
    },
    externalResources() {
      switch (engine) {
        case "katex":
          return {
            css: [{ content: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" }],
            js: [
              {
                // fix copy behaviour: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
                src: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js",
                loadTime: "afterDOMReady",
                contentType: "external",
              },
            ],
          }
      }
    },
  }
}
