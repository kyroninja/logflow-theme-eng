---
title: "Custom Components Handbook: Features, Usage and consts.ts Settings"
description: Explains each custom LogFlow Theme component's responsibility, how to call it, related configuration and optional parameters.
pubDate: 2026-03-14
collection: LogFlow Theme
collectionDescription: Design, implementation and iteration notes for the LogFlow Theme
tags:
  - Astro
  - Components
  - Template
---

This post gives a quick tour of the theme's built-in components, to help you customize the theme without changing its core structure.

## BaseHead.astro

**Features**

- Injects the basic page SEO info, OG/Twitter metadata, the RSS link and the theme initialization script.
- Brings in `ClientRouter` for seamless page transitions and re-applies the persisted theme after `astro:after-swap`.
- Loads the LXGW WenKai Screen web font.

**Usage**

```astro
<BaseHead title="Post title" description="Page description" image={heroImage} />
```

**How to set it up in consts.ts**

- Related items: `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_URL`
- Purpose: the source of the page title, description, canonical URL and site-level SEO info.

**Optional parameters**

- `image?: ImageMetadata`: optional; when provided, `og:image` and `twitter:image` are emitted.
- `type?: 'website' | 'article'`: optional; pass `article` on post pages.

## PixelHeroCanvas.astro

**Features**

- Site-wide pixel fluid animation background: zero-dependency two-pass WebGL rendering (fluid field computation + dot rasterization), with colors that follow the site's `--accent`, `--text-muted` and `--pixel-hero-bg` variables and sync in real time when the light/dark theme switches.
- Keeps playing across pages via `transition:persist`, so navigation does not interrupt it; primary and secondary colors swap when the mouse gets close.
- Respects `prefers-reduced-motion` (rendered statically) and degrades to a solid background when WebGL is unavailable or the context is lost.

**Usage**

```astro
<PixelHeroCanvas />
```

It is mounted at the top of `<body>` by `SiteLayout.astro`, so you do not need to call it manually.

**How to set it up in consts.ts**

- No directly related items; adjust the background color and opacity through `--pixel-hero-bg` and `--pixel-hero-opacity` in `global.css`.

**Optional parameters**

- No component parameters.

## Header.astro

**Features**

- Renders the site title at the top, the `NAV_LINKS` navigation, the search entry, the theme toggle and the mobile menu.
- Rebinds interactions in `astro:page-load` after navigation; document-level listeners are cleaned up automatically.

**Usage**

```astro
<Header />
```

**How to set it up in consts.ts**

- Related items: `SITE_TITLE`, `NAV_LINKS`, `SEARCH`
- Social links are rendered by `Footer.astro` using `SOCIAL_LINKS`.

**Optional parameters**

- No explicit component parameters; it is driven by `consts.ts`.

## HeaderLink.astro

**Features**

- Generates navigation links with a "current path highlight" state.

**Usage**

```astro
<HeaderLink href="/blog">Posts</HeaderLink>
```

**How to set it up in consts.ts**

- No directly related items.

**Optional parameters**

- Inherits the native `<a>` attributes, so you can pass `class`, `target` and so on.

## ThemeToggle.astro

**Features**

- Switches between dark and light mode and syncs it to the class on the document root.
- Writes the preference to `localStorage` (key `theme`) on click, and re-syncs the button state after navigation.

**Usage**

```astro
<ThemeToggle />
```

**How to set it up in consts.ts**

- No directly related items.

**Optional parameters**

- No component parameters.

## SearchDialog.astro

**Features**

- The static search dialog in the Header: built on `<dialog>`, with a frosted-glass background matching the Header, supporting the `Ctrl/Command + K` and `/` shortcuts, `↑`/`↓` to select and `Enter` to open.
- Loads `search-index.json` on demand the first time it is opened; the index is cached at module level and reused across pages, and rebound in `astro:page-load` after navigation.

**Usage**

```astro
<SearchDialog />
```

It is rendered by `Header.astro` conditionally on `SEARCH.enabled`.

**How to set it up in consts.ts**

- Related item: `SEARCH`
- Field descriptions:
  - `enabled`: whether to show the search entry in the Header.
  - `maxResults`: the maximum number of results shown.

**Optional parameters**

- No component parameters; everything is controlled through `SEARCH`.

## SocialIcon.astro

**Features**

- Renders a social platform SVG icon based on the `icon` key.

**Usage**

```astro
<SocialIcon icon="social/github" size={20} />
```

**How to set it up in consts.ts**

- Usually paired with `SOCIAL_LINKS[].icon`.

**Optional parameters**

- `size?: number`: optional, defaults to `20`.

## Footer.astro

**Features**

- Renders the footer copyright notice, the current year and the social links.

**Usage**

```astro
<Footer />
```

**How to set it up in consts.ts**

- Related items: `COPYRIGHT_NAME`, `SOCIAL_LINKS`

**Optional parameters**

- No component parameters.

## PageHeader.astro

**Features**

- Renders the page title, description, count metadata and an optional right-hand action link in one consistent way.

**Usage**

```astro
<PageHeader title="Posts" description="Browse all posts by date." meta="6 posts" />
```

The page description usually comes from `PAGE_COPY`, while detail pages can use a dynamic description.

## PostList.astro

**Features**

- Renders the post lists on the home page, posts, collections, tags and yearly archive in one consistent way.

**Usage**

```astro
<PostList posts={posts} showDescription={true} showReadingTime={true} />
```

Use `showDescription` and `showReadingTime` to control whether the summary and the reading time are shown.

## ContentSection.astro and PageContainer.astro

These two layout components provide a consistent narrow page container and section spacing. Page components should compose them first instead of redefining width, padding and vertical spacing.

## SidebarSection.astro

**Features**

- A sidebar section container that pairs with `ContentSection.astro` to form a two-column layout (such as the collection and tag sidebars on the post page).

## ArchiveLink.astro

**Features**

- Renders the "Time machine →" archive link that points to the yearly archive page, used in the section headers of the home page and the post list page.

## CodeCopy.astro

The code block copy button is injected uniformly by the Markdown/MDX content layout; when copying fails the original code block is left intact and reading is not affected.

## FormattedDate.astro

**Features**

- Formats date display in one consistent way and outputs a `<time>` element.

**Usage**

```astro
<FormattedDate date={post.data.pubDate} />
```

**How to set it up in consts.ts**

- No directly related items.

**Optional parameters**

- None; `date` is a required parameter.

## GitHubContribute.astro

**Features**

- Shows the GitHub contribution block title and the contribution calendar component.

**Usage**

```astro
<GitHubContribute />
```

**How to set it up in consts.ts**

- Related item: `GH_CONTRIBUTE`
- Field descriptions:
  - `title`
  - `description`
  - `username`
  - `profileUrl`
  - `errorMessage`

**Optional parameters**

- No component parameters.

## GitHubCalendar.astro

**Features**

- Renders a static SVG contribution heatmap from data fetched at build time, and follows theme switching automatically.

**Usage**

```astro
<GitHubCalendar contributions={contributions} totalCount={totalCount} />
```

**How to set it up in consts.ts**

- This component is called by `GitHubContribute.astro` after it fetches the data at build time.

**Optional parameters**

- No optional parameters; `contributions` and `totalCount` are required.

## CommentSection.astro

**Features**

- Dynamically loads the Giscus comment section according to the `COMMENTS` configuration, and syncs the comment theme when the light/dark theme switches.

**Usage**

```astro
<CommentSection />
```

**How to set it up in consts.ts**

- Related item: `COMMENTS`
- Key fields:
  - `enabled`
  - `provider`
  - `repo`
  - `repoId`
  - `category`
  - `categoryId`
  - `mapping`
  - `themeLight`
  - `themeDark`
  - `lang`

**Optional parameters**

- No component parameters; everything is controlled through `COMMENTS`.
