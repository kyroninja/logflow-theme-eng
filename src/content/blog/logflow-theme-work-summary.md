---
title: "LogFlow Theme: Why I Reinvented the Wheel"
description: Some thoughts and trade-offs from building the LogFlow Theme blog theme.
pubDate: 2026-03-14
collection: LogFlow Theme
collectionDescription: Design, implementation and iteration notes for the LogFlow Theme
tags:
  - Astro
  - Theme
  - Engineering
  - Open Source
---

The theme behind this blog is modified directly from Astro's official minimal Blog template, with some custom components and pages added, including but not limited to:

- A home page with personal info, a compact post list and GitHub activity.
- A GitHub contribution graph fetched at build time and rendered statically.
- A site-wide pixel fluid animation background (zero-dependency WebGL) that follows the light/dark theme.
- ClientRouter seamless page transitions with link prefetching.
- Dependency-free static post search.
- Customizable social links and a friend link list.
- Collection, tag and yearly archive pages.
- giscus comment support.

The theme itself is open source in the GitHub [LogFlow Theme](https://github.com/kevynf/logflow-theme) repository.


What I wanted was a theme that lets you start writing quickly after installing it, with centralized configuration that is easy to maintain, and that is how LogFlow Theme came about.

## How I Designed It

### Centralized Configuration

I wanted changing site information to be as simple as possible, so all the commonly used settings are gathered in `src/consts.ts`, including:

- Site title, description, URL and copyright name;
- Page titles and descriptions (`PAGE_COPY`);
- Home page avatar, motto and post count (`HOME`);
- Social links and GitHub contribution graph settings;
- Friend link data (maintained in `src/config/friend-links.ts`);
- giscus comment settings (`COMMENTS`).

In day-to-day use you only need to edit `src/consts.ts`, which covers most personalization needs without frequently touching the components.

### Posts

It uses Frontmatter fields that are as simple as possible, including:

- `title`, `description` and `pubDate` are required
- `updatedDate`, `collection`, `collectionDescription`, `tags`, `heroImage` and `enableComments` are optional

The benefits are obvious: you can focus on writing, and if you come back after a long absence you can pick it up again quickly.

### A Few Details

Nothing is piled on for its own sake.

- Color mode switching;
- A compact Header;
- More readable colors and page layout;
- Optional giscus comments.

None of it is complicated, but the improvement to the experience is significant.

## If You Want to Use It Too

Head over to the [LogFlow Theme](https://github.com/kevynf/logflow-theme) repository, where you can choose Use this template to set it up in one click. The built-in sample posts also double as a simple guide to using the theme.

> All in all, for me this theme is mostly a reusable template distilled from my earlier experience with architectures like Hexo and VuePress.
>
> It is also a way to encourage myself to keep going for the long haul and stay focused on writing.
>
> If you would like to contribute code to this project, pull requests are welcome.

