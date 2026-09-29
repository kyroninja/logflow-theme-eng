---
title: "Frontmatter Guide: Writing Good Metadata for Every Post"
description: Covers the required and optional Frontmatter fields in LogFlow Theme, common patterns, and how to troubleshoot errors.
pubDate: 2026-03-14
collection: LogFlow Theme
collectionDescription: Design, implementation and iteration notes for the LogFlow Theme
tags:
  - Astro
  - Frontmatter
  - Content
---

Frontmatter is the YAML block at the top of every Markdown / MDX post that describes the post's metadata.  
In LogFlow Theme, the post collection is validated by `src/content.config.ts`: required fields must be present and correctly typed, and the theme only reads the fields listed below.

## Minimal Example

```yaml
---
title: My First Post
description: A sample post that demonstrates Frontmatter.
pubDate: 2026-03-14
---
```

These three fields are required:

- `title`: the post title (string)
- `description`: the post summary (string)
- `pubDate`: the publish date (anything that can be parsed as a date)

## Full Example

```yaml
---
title: Frontmatter in Practice
description: A complete example with required and optional fields.
pubDate: 2026-03-14
updatedDate: 2026-03-15
collection: LogFlow Theme
collectionDescription: Design, implementation and iteration notes for the LogFlow Theme
tags:
  - Astro
  - Frontmatter
heroImage: ./cover.png
---
```

## Field Reference

### title

- Type: `string`
- Purpose: shown as the post page title, the list title and in RSS output, and used for the HTML title and the Open Graph and Twitter title metadata.
- Tip: keep it short enough to stay readable in list views.

### description

- Type: `string`
- Purpose: the post summary, shown on the post page and in post lists, and used for standard SEO, Open Graph and Twitter descriptions as well as RSS output.
- Tip: state the topic of the post in one sentence.

### pubDate

- Type: `date` (converted automatically from a string)
- Purpose: post ordering, date display and archive statistics.
- Tip: use the `YYYY-MM-DD` format consistently.

### updatedDate

- Type: `date` (optional)
- Purpose: shows a "last updated" date on the post page.
- Tip: only fill it in when the content has changed substantially.

### collection

- Type: `string` (optional)
- Purpose: places the post in a collection, which is shown on the collection pages.
- Tip: use the same name for posts on the same topic.

### collectionDescription

- Type: `string` (optional)
- Purpose: the collection's description text, shown in the collection list; the collection detail page also uses it as the page description and SEO description.
- Tip: keep the wording identical within a collection. The detail page uses the first post with this field after sorting by publish date in descending order; the collection list keeps the first non-empty description it reads.

When descriptions differ within the same `collection`, the collection detail page shows the description from the newest post that has a non-empty `collectionDescription`, while the collection list uses the first non-empty description in content collection read order, so the two places may differ. If none of the posts in a collection fill in this field, the detail page falls back to the default description of the collections page, and the collection list shows no description. To avoid inconsistencies, use the same wording in every post of a collection.

### tags

- Type: `string[]` (optional)
- Purpose: generates the tag index page and the matching tag detail pages; each detail page lists the posts that carry that tag.
- Tip: use 2 to 5 tags per post and avoid splitting topics too finely.

### heroImage

- Type: relative path to a local image (optional; resolved to `ImageMetadata` at build time)
- Purpose: the hero image on the post page, also emitted into the Open Graph / Twitter metadata.
- Tip: use a local image asset the project can process, and keep a suitable landscape aspect ratio.

### enableComments

- Type: `boolean` (optional)
- Purpose: controls on its own whether the comment section is shown for this post.
- Default: comments are enabled when it is not set.
- Tip: only set it to `false` when you need to turn off comments for a specific post. Global comments also require `COMMENTS.enabled` to be `true`.

## Common Errors and Troubleshooting

- Date parsing errors
  - Check that `pubDate` / `updatedDate` are valid date strings.
- Misspelled field names
  - Writing `publishDate` instead of the required `pubDate` fails validation because `pubDate` is missing; extra fields that are not defined in the schema are not used by the theme.
- Type errors
  - `tags` must be an array, not a single string.

## Are MDX and Markdown the Same?

Yes. Both `.md` and `.mdx` files under `src/content/blog/` use the same Frontmatter validation rules.

## Recommended Writing Template

Copy the template below to get started quickly:

```yaml
---
title: 
description: 
pubDate: 
updatedDate: 
collection: 
collectionDescription: 
tags:
  - 
heroImage: ./cover.png
enableComments: true
---
```
