# 开始使用

本站使用 VitePress 构建，使用 pnpm 管理依赖。文档面向公众，请勿提交密码、令牌、个人隐私或内部资料。

## 环境准备

使用 Node.js 22 或更高版本，以及 pnpm 12.15.0。项目的 `packageManager` 字段固定了 pnpm 版本。

在仓库根目录安装依赖：

```sh
pnpm install --frozen-lockfile
```

仓库仅允许 `esbuild` 执行依赖安装脚本，这是构建工具所需的安装步骤。

## 本地开发

```sh
pnpm docs:dev
```

打开终端显示的本地地址，修改 `docs/` 下的 Markdown 文件即可预览变更。

## 构建与预览

```sh
pnpm docs:build
pnpm docs:preview
```

构建产物位于 `docs/.vitepress/dist/`，无需提交到 Git。预览命令用于检查已构建的静态站点，不作为生产服务器。

## 新增文档

1. 基于最新 `dev` 创建独立的功能分支。
2. 在 `docs/` 中按主题新增 Markdown 文件。
3. 在 `docs/.vitepress/config.mts` 中更新对应导航或侧边栏。
4. 运行 `pnpm docs:build`，并检查本地预览的内容与链接。
5. 按 `AGENTS.md` 的签名及提交规范提交，通过 PR 合入 `dev`。

当前未配置部署流程。站点默认部署于域名根路径；若以后部署到 GitHub Pages 的 `/doc/` 子路径，需先在 VitePress 配置中设置 `base: '/doc/'`，再构建发布。
