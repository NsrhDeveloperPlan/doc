import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'NsrhDeveloperPlan',
  description: '组织与成员的公开文档分享站点',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '开始使用', link: '/guide/getting-started' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [{ text: '开始使用', link: '/guide/getting-started' }]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/NsrhDeveloperPlan/doc' }
    ],
    outline: { label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  }
})
