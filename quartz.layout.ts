import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'LiaHowie/IMMC-Tech-Info',
        // from data-repo-id
        repoId: 'R_kgDOQc7yHg',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDOQc7yHs4CzB3j',
        // from data-lang
        lang: 'en'
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.DesktopOnly(Component.PageTitle()),
    Component.MobileOnly(Component.PageTitleMobile()),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Group({
      title: "Latest Post",
      children: [
        Component.RecentNotes({ 
          title: "",
          limit: 1, 
          showTags: false,
          filter: (fileData) => {
            if (fileData.frontmatter?.draft === true) return false;

            if (fileData.frontmatter?.excludeRecent === true) return false;

            return fileData.slug?.startsWith("Posts/") ?? false;
          },
          sort: (pageA, pageB) => {
            const dateA = pageA.dates?.published?.getTime() ?? 0
            const dateB = pageB.dates?.published?.getTime() ?? 0
            return dateB - dateA
          }
        }),
    ]
    }),
    Component.Explorer({
      title: "Navigate", // title of the explorer component
      folderClickBehavior: "collapse", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
      folderDefaultState: "open", // default state of folders ("collapsed" or "open")
      useSavedState: false, // whether to use local storage to save "state" (which folders are opened) of explorer
      // omitted but shown later
      filterFn: (node) => {
        // set containing names of everything you want to filter out
        const omit = new Set(["extras","disabled"])
     
        // can also use node.slug or by anything on node.data
        // note that node.data is only present for files that exist on disk
        // (e.g. implicit folder nodes that have no associated index.md)
        return !omit.has(node.displayName.toLowerCase())
      },
      mapFn: (node) => {
        if (node.isFolder) {
          node.displayName = "📁 " + node.displayName
        } else if (node.displayName.toLowerCase().includes("✨")) {
          node.displayName = node.displayName
        } else if (node.displayName.toLowerCase().includes("➕")) {
          node.displayName = node.displayName
        } else {
          node.displayName = "📄 " + node.displayName
        }
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Group({
      title: "Latest Post",
      children: [
        Component.RecentNotes({ 
          title: "",
          limit: 1, 
          showTags: false,
          filter: (fileData) => {
            if (fileData.frontmatter?.draft === true) return false;

            if (fileData.frontmatter?.excludeRecent === true) return false;

            return fileData.slug?.startsWith("Posts/") ?? false;
          },
          sort: (pageA, pageB) => {
            const dateA = pageA.dates?.published?.getTime() ?? 0
            const dateB = pageB.dates?.published?.getTime() ?? 0
            return dateB - dateA
          }
        }),
    ]
    }),
    Component.Explorer({
      title: "Navigate", // title of the explorer component
      folderClickBehavior: "link", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
      folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
      useSavedState: false, // whether to use local storage to save "state" (which folders are opened) of explorer
      // omitted but shown later
      filterFn: (node) => {
        // set containing names of everything you want to filter out
        const omit = new Set(["extras","disabled"])
     
        // can also use node.slug or by anything on node.data
        // note that node.data is only present for files that exist on disk
        // (e.g. implicit folder nodes that have no associated index.md)
        return !omit.has(node.displayName.toLowerCase())
      },
      mapFn: (node) => {
        if (node.isFolder) {
          node.displayName = "📁 " + node.displayName
        } else if (node.displayName.toLowerCase().includes("✨")) {
          node.displayName = node.displayName
        } else if (node.displayName.toLowerCase().includes("➕")) {
          node.displayName = node.displayName
        } else {
          node.displayName = "📄 " + node.displayName
        }
      },
    }),
  ],
  right: [
    Component.Graph()
  ]
}
