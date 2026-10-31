---
# frontmatter 使用 YAML 语法，只影响当前页面。
title: VitePress 配置与写作示例
description: 对照源码与网页学习文档写作、导航和构建
# true 显示侧边栏；改成 false 可隐藏当前页的侧边栏。

# 当前页只展示二级和三级标题。
outline: [2, 3]
---

# VitePress 配置与写作示例

打开这份 Markdown 源码，对照浏览器里的页面观察效果。顶部两个 `---` 之间是页面配置，不会作为正文显示。

## 文件如何变成页面

本文位于 `docs/guide/vitepress-example.md`，菜单链接写成 `/guide/vitepress-example`。

新增页面后，还需要在 `docs/.vitepress/config.mts` 的 `sidebar` 中添加入口。
`nav` 控制顶部导航，`sidebar` 控制左侧菜单，`outline` 控制右侧文章目录。

### 标题层级

源码中的 `#` 是文章标题，`##` 是章节，`###` 是小节。观察右侧目录：这里设置为显示二级和三级标题。

## 常见 Markdown 写法

这是 **加粗**、*斜体* 和 `行内代码`。

- 列表用于展示并列事项。
- 阅读源码可以看到这些效果对应的符号。

| 配置位置                    | 影响范围 |
| --------------------------- | -------- |
| config.mts                  | 整个网站 |
| Markdown 顶部的 frontmatter | 当前页面 |

### 页面链接

[开始使用](./getting-started.md)

<!-- HTML 注释只在源码中可见，不会显示为正文。 -->

### 代码块

代码围栏后面的 bash 或 ts 是语言名称，用于语法高亮：

```bash
# 在 nsrh-doc 目录启动开发预览
pnpm dev
```

::: tip 试一试
修改本段文字并保存，观察开发预览里的页面更新。
:::

::: warning 路径配置
部署到域名的 /doc/ 子路径时，将 config.mts 中的 base 改为 '/doc/'，然后重新构建。
:::

## 全站配置示例

下面是配置片段，实际项目中应合并到已有的 themeConfig 内：

```ts
// 开启本地搜索
search: { provider: 'local' }
```

全站配置文件已附中文注释，可以直接对照顶部导航、左侧菜单、右侧目录与搜索框。

## 图片怎么放

例如创建 `docs/public/images/example.png`，然后在 Markdown 中写：

```markdown
![操作示意图](/images/example.png)
```

这里仅展示语法，没有引用尚未创建的图片。public 本身不出现在图片地址中。

## 构建和预览

```bash
# 生成静态网站，检查页面与链接
pnpm docs:build
# 查看刚才构建的结果
pnpm docs:preview
```

产物位于 `docs/.vitepress/dist/`。修改源文件后，需要重新构建才能更新构建预览。
