---
title: 自定义组件手册：功能、用法与 consts.ts 配置
description: 逐个说明 LogFlow Theme 自定义组件的职责、调用方式、关联配置与可选参数。
pubDate: 2026-03-14
collection: LogFlow Theme
collectionDescription: LogFlow Theme 主题设计、实现与迭代实践
tags:
  - Astro
  - Components
  - Template
---

这篇文章用于快速了解主题内置组件，帮助你在不改动核心结构的前提下完成定制。

## BaseHead.astro

**功能**

- 注入页面基础 SEO 信息、OG/Twitter 元信息、RSS 链接与主题初始化脚本。
- 引入 `ClientRouter` 实现无缝换页，并在 `astro:after-swap` 后重新应用持久化的主题。
- 加载 LXGW 霞鹜文楷屏幕阅读版网络字体。

**使用方法**

```astro
<BaseHead title="文章标题" description="页面描述" image={heroImage} />
```

**consts.ts 如何设置**

- 关联项：`SITE_TITLE`、`SITE_DESCRIPTION`、`SITE_URL`
- 用途：作为页面标题、描述、canonical URL 和站点级 SEO 信息来源。

**可选参数**

- `image?: ImageMetadata`：可选，提供后会输出 `og:image` 与 `twitter:image`。
- `type?: 'website' | 'article'`：可选，文章页传入 `article`。

## PixelHeroCanvas.astro

**功能**

- 全站像素流体动画背景：零依赖 WebGL 两遍渲染（流体场计算 + 圆点栅格化），配色跟随站点的 `--accent`、`--text-muted` 与 `--pixel-hero-bg` 变量，明暗主题切换时实时同步。
- 通过 `transition:persist` 跨页持续播放，换页不中断；鼠标靠近时主辅色互换。
- 遵循 `prefers-reduced-motion`（静态呈现），WebGL 不可用或上下文丢失时降级为纯色背景。

**使用方法**

```astro
<PixelHeroCanvas />
```

由 `SiteLayout.astro` 挂载在 `<body>` 顶部，无需手动调用。

**consts.ts 如何设置**

- 无直接关联项；背景色与不透明度通过 `global.css` 中的 `--pixel-hero-bg`、`--pixel-hero-opacity` 调整。

**可选参数**

- 无组件参数。

## Header.astro

**功能**

- 渲染顶部站点标题、`NAV_LINKS` 导航、搜索入口、主题切换和移动端菜单。
- 换页后在 `astro:page-load` 中重新绑定交互，document 级监听会自动清理。

**使用方法**

```astro
<Header />
```

**consts.ts 如何设置**

- 关联项：`SITE_TITLE`、`NAV_LINKS`、`SEARCH`
- 社交链接由 `Footer.astro` 使用 `SOCIAL_LINKS` 渲染。

**可选参数**

- 无显式组件参数，依赖 `consts.ts` 驱动。

## HeaderLink.astro

**功能**

- 生成带“当前路径高亮”状态的导航链接。

**使用方法**

```astro
<HeaderLink href="/blog">文章</HeaderLink>
```

**consts.ts 如何设置**

- 无直接关联项。

**可选参数**

- 继承原生 `<a>` 属性，可传 `class`、`target` 等。

## ThemeToggle.astro

**功能**

- 切换深色/浅色模式并同步到文档根节点 class。
- 点击时把偏好写入 `localStorage`（键 `theme`），并在换页后重新同步按钮状态。

**使用方法**

```astro
<ThemeToggle />
```

**consts.ts 如何设置**

- 无直接关联项。

**可选参数**

- 无组件参数。

## SearchDialog.astro

**功能**

- Header 内的静态搜索弹窗：`<dialog>` 实现，毛玻璃背景与 Header 一致，支持 `Ctrl/Command + K` 与 `/` 快捷键、`↑`/`↓` 选择、`Enter` 打开。
- 首次打开时按需加载 `search-index.json`，索引缓存在模块级跨页复用；换页后在 `astro:page-load` 中重新绑定。

**使用方法**

```astro
<SearchDialog />
```

由 `Header.astro` 按 `SEARCH.enabled` 条件渲染。

**consts.ts 如何设置**

- 关联项：`SEARCH`
- 字段说明：
  - `enabled`：是否在 Header 显示搜索入口。
  - `maxResults`：最多展示的结果数。

**可选参数**

- 无组件参数，全部通过 `SEARCH` 控制。

## SocialIcon.astro

**功能**

- 根据 `icon` 键名渲染社交平台 SVG 图标。

**使用方法**

```astro
<SocialIcon icon="social/github" size={20} />
```

**consts.ts 如何设置**

- 常与 `SOCIAL_LINKS[].icon` 搭配使用。

**可选参数**

- `size?: number`：可选，默认为 `20`。

## Footer.astro

**功能**

- 渲染页脚版权信息、当前年份与社交链接。

**使用方法**

```astro
<Footer />
```

**consts.ts 如何设置**

- 关联项：`COPYRIGHT_NAME`、`SOCIAL_LINKS`

**可选参数**

- 无组件参数。

## PageHeader.astro

**功能**

- 统一渲染页面标题、概述、数量元信息和可选的右侧操作链接。

**使用方法**

```astro
<PageHeader title="文章" description="按时间浏览全部文章。" meta="6 篇" />
```

页面概述通常来自 `PAGE_COPY`，详情页则可以使用动态描述。

## PostList.astro

**功能**

- 统一渲染首页、文章、专题、标签和年份归档中的文章列表。

**使用方法**

```astro
<PostList posts={posts} showDescription={true} showReadingTime={true} />
```

可通过 `showDescription` 和 `showReadingTime` 控制摘要与阅读时长是否显示。

## ContentSection.astro 与 PageContainer.astro

这两个布局组件提供统一的窄版页面容器和区块间距。页面组件应优先组合它们，而不是重复定义宽度、内边距和垂直间距。

## SidebarSection.astro

**功能**

- 侧栏区块容器，与 `ContentSection.astro` 搭配组成双栏布局（如文章页的专题、标签侧栏）。

## ArchiveLink.astro

**功能**

- 渲染“时间机器 →”归档入口链接，指向年份归档页，用于首页与文章列表页的区块头部。

## CodeCopy.astro

代码块复制按钮由 Markdown/MDX 内容布局统一注入，复制失败时会保留原代码块，不影响阅读。

## FormattedDate.astro

**功能**

- 统一格式化日期展示，输出 `<time>` 元素。

**使用方法**

```astro
<FormattedDate date={post.data.pubDate} />
```

**consts.ts 如何设置**

- 无直接关联项。

**可选参数**

- 无，`date` 为必填参数。

## GitHubContribute.astro

**功能**

- 展示 GitHub 贡献区块标题与贡献日历组件。

**使用方法**

```astro
<GitHubContribute />
```

**consts.ts 如何设置**

- 关联项：`GH_CONTRIBUTE`
- 字段说明：
  - `title`
  - `description`
  - `username`
  - `profileUrl`
  - `errorMessage`

**可选参数**

- 无组件参数。

## GitHubCalendar.astro

**功能**

- 使用构建阶段获取的数据渲染静态 SVG 贡献热力图，并自动跟随主题切换。

**使用方法**

```astro
<GitHubCalendar contributions={contributions} totalCount={totalCount} />
```

**consts.ts 如何设置**

- 该组件由 `GitHubContribute.astro` 在构建阶段获取数据后调用。

**可选参数**

- 无可选参数，`contributions` 与 `totalCount` 为必填。

## CommentSection.astro

**功能**

- 按 `COMMENTS` 配置动态加载 Giscus 评论区，并在亮暗主题切换时同步评论主题。

**使用方法**

```astro
<CommentSection />
```

**consts.ts 如何设置**

- 关联项：`COMMENTS`
- 关键字段：
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

**可选参数**

- 无组件参数，全部通过 `COMMENTS` 控制。
