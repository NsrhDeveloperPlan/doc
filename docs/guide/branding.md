---
title: 自定义图标、Logo 与网站设置
---

# 自定义图标、Logo 与网站设置

## 三种图标位置

| 位置 | 配置 | 当前资源 |
| --- | --- | --- |
| 浏览器标签页 | 网站级 head 中的 link | public/favicon.svg |
| 左上角导航栏 | themeConfig.logo | public/logo-light.svg 与 logo-dark.svg |
| 导航栏自定义书本图标 | themeConfig.socialLinks 的 icon.svg | config.mts 中的 bookIcon |

Logo 使用红帽与书本的简单 SVG 教学图形，可以直接修改颜色和路径。SVG 是矢量图，放大不会模糊。

## 自己替换 Logo

1. 把图片放进 `docs/public/`，例如 `my-logo.svg` 或 `my-logo.png`。
2. 在 `config.mts` 中改成 `logo: { src: '/my-logo.svg', alt: '网站名称' }`。
3. 首页的图片独立配置在 `docs/index.md` 的 `hero.image`，需要同步替换。

当前使用 `light` / `dark` 两张图片，点击导航栏明暗切换按钮可对比效果。

## 自定义 SVG 图标

`config.mts` 中的 `bookIcon` 是 SVG 字符串，传给 `icon: { svg: bookIcon }`。
`viewBox` 定义坐标范围，`path` 定义形状，`currentColor` 让线条随主题颜色变化。
可以用自己信任的本地 SVG 替换字符串。该方式不需要安装图标库。

首页卡片也支持图标：当前一个使用 emoji，另一个通过 `icon.src` 引用本地 SVG。

## 网站设置分别影响什么

- `title`：站点名称；`titleTemplate`：浏览器标签页标题格式。
- `description`：全站默认描述，文章可用 frontmatter 单独覆盖。
- `base`：部署路径；浏览器图标地址也使用这个变量拼接。
- `head`：favicon、浏览器主题颜色和社交分享站点名称等元信息。
- `appearance`：明暗主题切换。
- `lastUpdated`：从 Git 获取最近提交时间，新页面提交后才有时间。
- `markdown.lineNumbers`：代码块显示行号。
- `themeConfig.siteTitle`：仅导航栏显示的名称。

还未确定正式域名，因此 canonical、og:url 和分享图片留待部署时填写。编辑链接保留为注释示例，确认编辑分支后再启用。

## URL 与部署

目前保留 `.html` 路由。设置 `cleanUrls: true` 后，需确保托管服务能把无后缀地址解析到对应 HTML 文件。

修改完成后执行 `pnpm docs:build`，再用 `pnpm docs:preview` 检查构建结果。

参考：[官方主题配置](https://vitepress.dev/zh/reference/default-theme-config) · [官方网站配置](https://vitepress.dev/zh/reference/site-config)
