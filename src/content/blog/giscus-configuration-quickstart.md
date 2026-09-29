---
title: "Giscus Quickstart: Enable Comments in 5 Steps"
description: The shortest path to configure Giscus from repository to site, mapped onto LogFlow Theme.
pubDate: 2026-03-14
collection: LogFlow Theme
collectionDescription: Design, implementation and iteration notes for the LogFlow Theme
tags:
  - Giscus
  - Comments
  - Astro
---

This post only covers the Giscus setup flow and does not repeat the rest of the component overview.

## Step 1: Prepare the Repository

- Make sure the repository is public.
- Enable Discussions in the GitHub repository settings.
- Create a category for comments first, for example `Announcements` or `General`.

## Step 2: Install the Giscus App

- Go to <https://github.com/apps/giscus> and install it on the target repository.
- Choose the repository and the Discussion category at <https://giscus.app/>.

When you are done you will have these key values:

- `repo`: `owner/repo`
- `repoId`: the repository ID
- `category`
- `categoryId`

## Step 3: Write to consts.ts

Fill in the configuration in `COMMENTS` in `src/consts.ts`:

```ts
export const COMMENTS = {
	enabled: true,
	provider: 'giscus',
	repo: 'owner/repository',
	repoId: 'your repoId',
	category: 'Announcements',
	categoryId: 'your categoryId',
	mapping: 'pathname',
	themeLight: 'light_protanopia',
	themeDark: 'transparent_dark',
	lang: 'en',
};
```

## Step 4: Control Comments Per Post

Add the `enableComments` field to a post's frontmatter to control comments for that post independently:

```yaml
---
title: My Post
enableComments: false
---
```

The template reads the value from frontmatter first, and comments are enabled by default when it is not set.

If it is set to `false`, the post will not render a comment section even when `COMMENTS.enabled` is `true`.

## Step 5: Troubleshooting

- The page shows "The comment system is not configured yet. Please check the COMMENTS settings in src/consts.ts."
  - Check whether `repo`, `repoId` or `categoryId` are empty.
- The comment section fails to load or is empty
  - Check that the repository is public, Discussions is enabled and the category matches.
- Comment colors are wrong after switching themes
  - Check that `themeLight` / `themeDark` are theme names supported by Giscus.

## Optional Parameters

- `mapping`
  - `pathname` is recommended and binds discussion threads to the URL path.
  - To bind by post title instead, use `title`.
- `lang`
  - Can be set to `en`, `zh-CN` and so on.
- `themeLight` / `themeDark`
  - Pick from the official giscus theme list, for example `light`, `dark` or `transparent_dark`.
