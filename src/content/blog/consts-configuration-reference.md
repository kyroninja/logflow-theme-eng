---
title: consts.ts Configuration Reference
description: Explains the global configuration grouped by site, pages, navigation, home page, search, friend links and comments.
pubDate: 2026-03-14
collection: LogFlow Theme
collectionDescription: Design, implementation and iteration notes for the LogFlow Theme
tags:
  - Astro
  - Config
  - Template
---

The site-wide reusable configuration lives in `src/consts.ts`. Page content, post frontmatter and purely visual styles do not belong here: post content is managed in `src/content/`, and colors, font sizes and spacing are managed in `src/styles/global.css`.

## Basic Site Information

### SITE_TITLE

The site name, used in the Header, the home page title, the browser title and RSS.

```ts
export const SITE_TITLE = "LogFlow Theme";
```

### SITE_DESCRIPTION

The site-level default description, used for the home page and RSS. The individual descriptions of the static pages are managed by `PAGE_COPY`.

```ts
export const SITE_DESCRIPTION = "A compact Astro theme for writing and publishing.";
```

### SITE_URL

The full production site URL, used for Astro's `site` setting, canonical URLs, the sitemap, RSS and the friend link exchange info. Do not add a trailing slash.

```ts
export const SITE_URL = "https://example.com";
```

### COPYRIGHT_NAME

The footer copyright name; it can be a personal name, an organization name or a brand name.

```ts
export const COPYRIGHT_NAME = "Your Name";
```

## Page Titles and Descriptions

`PAGE_COPY` maintains the titles and descriptions of the static pages in one place. Each entry is provided both to the page header area and to the SEO description, so you do not have to fill it in again inside the page components.

```ts
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
```

The description of a tag detail page is generated dynamically from the tag name; a collection detail page prefers the `collectionDescription` from the post frontmatter and falls back to the collections page description when it is missing.

The `descriptionItalic` setting of each page controls whether that page's description is italic; `false` is recommended by default.

## Header Navigation

`NAV_LINKS` controls the desktop and mobile navigation in the Header. `href` uses an absolute in-site path, and Astro's `base` path is handled automatically at build time.

```ts
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Posts" },
  { href: "/friends", label: "Friends" },
  { href: "/about", label: "About" },
] as const;
```

## Footer Social Links

`SOCIAL_LINKS` controls the icon links in the footer.

```ts
export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/your-name",
    icon: "social/github",
  },
] as const;
```

Field meanings:

- `label`: the accessible name.
- `href`: the external profile URL.
- `icon`: a built-in icon key of `SocialIcon.astro`; `social/github`, `social/twitter` and `social/bilibili` are currently supported.

## Home Page

`HOME` only manages the home page profile info and the post count, not font sizes or layout.

```ts
export const HOME = {
  avatar: {
    src: "https://github.com/identicons/logflow-theme.png?size=256",
    alt: "LogFlow Theme avatar",
  },
  motto: "Build in public.",
  description: "A narrow, compact Astro blog theme.",
  recentPostsLimit: 6,
} as const;
```

- `avatar.src`: the avatar URL.
- `avatar.alt`: the avatar alt text.
- `motto`: the personal motto shown on the home page, also used to generate the `Desc` in this site's friend link info.
- `description`: the personal bio shown directly on the home page; it is not extracted automatically from the About body.
- `recentPostsLimit`: the number of recent posts on the home page.

## GitHub Activity

`GH_CONTRIBUTE` controls the GitHub contribution block on the home page.

```ts
export const GH_CONTRIBUTE = {
  title: "GitHub Activity",
  description: "Open-source contributions over the past year",
  username: "withastro",
  profileUrl: "https://github.com/withastro",
  errorMessage: "The GitHub contribution graph is temporarily unavailable.",
} as const;
```

- `title`, `description`: the block title and description.
- `username`: the GitHub username the contribution graph belongs to.
- `profileUrl`: the GitHub profile opened when the block is clicked.
- `errorMessage`: the message shown when the contribution graph fails to load.

## Friend Links

`FRIEND_LINKS` is exported from `src/config/friend-links.ts`, so the main configuration file does not need to grow when you have many friend links.

```ts
export const FRIEND_LINKS = [
  {
    name: "Example Blog",
    link: "https://example.com",
    avatar: "https://example.com/avatar.png",
    desc: "A one-line introduction to this site.",
  },
];
```

- `name`: the site name, required.
- `link`: the site URL; `url` in older data is still supported.
- `avatar`: the avatar URL, optional; when missing, the first letter of the site name is shown.
- `desc`: a one-line description; `description` in older data is still supported.

## Search

`SEARCH` controls the entry point and the result count of the static post search.

```ts
export const SEARCH = {
  enabled: true,
  maxResults: 8,
} as const;
```

- `enabled`: when set to `false`, the Header does not render the search entry.
- `maxResults`: the maximum number of search results shown.

## Comments

`COMMENTS` manages the giscus toggle, repository, Discussion category, mapping, themes and language.

```ts
export const COMMENTS = {
  enabled: true,
  provider: "giscus",
  repo: "owner/repository",
  repoId: "R_...",
  category: "Announcements",
  categoryId: "DIC_...",
  mapping: "pathname",
  themeLight: "light_protanopia",
  themeDark: "transparent_dark",
  lang: "en",
} as const;
```

- `enabled`: the global comments switch.
- `provider`: keep it as `giscus` for now.
- `repo`, `repoId`: the public repository with Discussions enabled, and its ID.
- `category`, `categoryId`: the Discussion category used for comments, and its ID.
- `mapping`: how pages map to discussion threads; common values are `pathname`, `title`, `url` or `og:title`.
- `themeLight`, `themeDark`: the giscus themes that follow the site's light/dark mode.
- `lang`: the giscus interface language.

You can get the repository and category IDs from the [giscus configuration page](https://giscus.app/).

## Recommended Order of Changes

1. Change `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_URL` and `COPYRIGHT_NAME`.
2. Change `PAGE_COPY`, `NAV_LINKS` and `HOME` to settle the site copy.
3. Change `SOCIAL_LINKS`, `GH_CONTRIBUTE` and `FRIEND_LINKS`.
4. Configure `COMMENTS` after enabling Discussions on the repository.
5. Run `npx astro check` and `npm run build` to verify the configuration.
