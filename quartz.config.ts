import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { CustomEmoji } from "./quartz/plugins/transformers/customEmoji"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "IMMC Technical Info",
    pageTitleSuffix: " | IMMC Technical Info",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-GB",
    baseUrl: "tech.immortalmc.net",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "published",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Comfortaa",
        body: "Nunito",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f9f9f9", // Background
          lightgray: "#e5e5e5", // Border & Search Box
          gray: "#9993a8", // Heavy Border & Publish Date Text
          darkgray: "#080022", // Body Text
          dark: "#080022", // Header, Page Title, & Navigate Menu Text
          secondary: "#cc0000", // Link, Site Title, and Page Location Text Text
          tertiary: "#cf7272", // Hover State & User-Highlighting
          highlight: "rgba(229, 229, 229, 1)", // Internal Link Background & Highlighted Code
          textHighlight: "#fdee68ff", // Markdown Highlight
        },
        darkMode: {
          light: "#080022", // Background
          lightgray: "#252230", // Border & Search Box
          gray: "#9993a8", // Heavy Border & Publish Date Text
          darkgray: "#f9f9f9", // Body Text
          dark: "#f9f9f9", // Header, Page Title, & Navigate Menu Text
          secondary: "#cc0000", // Link, Site Title, and Page Location Text Text
          tertiary: "#cf7272", // Hover State & User-Highlighting
          highlight: "rgba(8, 0, 34, 1)", // Internal Link Background & Highlighted Code
          textHighlight: "#63603bff", // Markdown Highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      CustomEmoji(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
