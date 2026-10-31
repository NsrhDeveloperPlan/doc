---
# home 使用首页布局；普通文章通常不需要指定 layout。
layout: home

# hero 控制首页的大标题、描述和按钮。
hero:
  name: NsrhDeveloperPlan
  text: 网络部开发者计划
  tagline: 整理、分享、学习不同的经验
  # brand 是主按钮样式，alt 是次要按钮样式。
  image:
    light: /favicon.png
    dark: /favicon.png
    alt: 家协文档 Logo
  actions:
    - theme: brand
      text: 开始
      link: /guide/getting-started
    - theme: alt
      text: 查看仓库
      link: https://github.com/NsrhDeveloperPlan/doc
# features 在首页显示介绍卡片。
features:
  - icon: ✍️
    title: 编写文档
    details: 在 docs 目录新增 Markdown 文件，再配置侧边栏入口。
  - icon:
      src: /logo-light.svg
    title: 配置网站
    details: 在 config.mts 中调整导航、搜索和文章目录。
---
