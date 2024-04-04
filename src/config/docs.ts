interface NavItem {
  title: string
  href?: string
}

interface DocsConfig {
  mainNav: NavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Transactions",
      href: "/transaction",
    },
    {
      title: "Categories",
      href: "/category",
    },
  ],
}