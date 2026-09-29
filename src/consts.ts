// Basic site info: used by the Header, SEO, RSS, sitemap and footer.
export const SITE_TITLE = "Kyroninja's Blog";
export const SITE_DESCRIPTION = "Musings of an ex-electrical engineer turned data engineer!";
export const SITE_URL = "https://blog.kyro.ninja";
export const COPYRIGHT_NAME = "Kyroninja;

// Static page titles and descriptions: used for both the page header and the SEO description.
export const PAGE_COPY = {
  blog: {
    title: "Posts",
    description: "Browse all posts by date.",
    descriptionItalic: false,
  },
  collections: {
    title: "Collections",
    description: "Read related posts as a series.",
    descriptionItalic: false,
  },
  tags: {
    title: "Tags",
    description: "Browse all posts by topic.",
    descriptionItalic: false,
  },
  years: {
    title: "Archive",
    description: "Browse all posts by publish date.",
    descriptionItalic: false,
  },
  friends: {
    title: "Friends",
    description: "A few personal sites worth visiting again and again.",
    descriptionItalic: false,
  },
  about: {
    title: "About",
    description: "About the author, this site and content licensing.",
    descriptionItalic: false,
  },
} as const;

// Header navigation links.
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Posts" },
  { href: "/friends", label: "Friends" },
  { href: "/about", label: "About" },
] as const;

// Footer social links; icon maps to a built-in SocialIcon key.
export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/kyroninja/logflow-theme-eng",
    icon: "social/github",
  },
] as const;

// Home page profile info and post count.
export const HOME = {
  avatar: {
    src: "/favicon.svg",
    alt: "LogFlow Theme avatar",
  },
  motto: "Build in public.",
  description: "A narrow, compact Astro blog theme.",
  recentPostsLimit: 6,
} as const;

// Home page GitHub contribution graph.
export const GH_CONTRIBUTE = {
  title: "GitHub Activity",
  description: "Open-source contributions over the past year",
  username: "kyroninja",
  profileUrl: "https://github.com/kyroninja",
  errorMessage: "The GitHub contribution graph is temporarily unavailable.",
} as const;

// Static full-text search; when disabled the Header hides the search entry.
export const SEARCH = {
  enabled: true,
  maxResults: 8,
} as const;

// Friend link data is maintained in a separate file.
export { FRIEND_LINKS } from "./config/friend-links";

// Comment system config; the current provider is giscus.
export const COMMENTS = {
  enabled: false,
  provider: "giscus",
  repo: "owner/repository",
  repoId: "",
  category: "Announcements",
  categoryId: "",
  mapping: "pathname",
  themeLight: "light_protanopia",
  themeDark: "transparent_dark",
  lang: "en",
} as const;
