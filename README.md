# NsrhDeveloperPlan 文档

使用 VitePress 1.6.4。命令在本仓库根目录运行，推荐 Node.js 24，pnpm 固定为 12.15.0。

```bash
npm install --global pnpm@12.15.0
pnpm install --frozen-lockfile
pnpm dev
```

## 构建与预览

```bash
pnpm docs:build
pnpm docs:preview
```

静态产物位于 `docs/.vitepress/dist/`，部署时上传该目录的内容。预览服务仅用于验收。当前 `base` 为 `/`，托管服务需要支持无后缀 URL 解析到对应 HTML；部署到子路径前修改 `docs/.vitepress/config.mts` 的 `base`。

构建需要 Git 仓库及完整提交历史。浅克隆请先运行 `git fetch --unshallow`；否则各文档的更新时间可能不准确。构建时从当前 `HEAD` 注入 7 位提交 hash，链接指向该版本；文档更新时间来自各文件的 Git 记录，按北京时间精确到秒显示。

`pnpm dev` 中提交 hash 使用展示占位，链接进入 `dev` 提交记录；缺少文档更新时间时用当前时间展示格式。`pnpm docs:preview` 展示正式构建产物中的真实版本信息，修改源码后需要重新构建。

## 自动构建

`.github/workflows/build.yml` 在以下情况执行：

- 推送到 `dev` 或 `main`。
- 提交目标为 `dev` 或 `main` 的 PR。
- 推送 `v*` 标签。
- 在 GitHub Actions 手动运行。

流程使用 Node.js 24、pnpm 12.15.0、冻结锁文件安装依赖，并完整拉取 Git 历史后构建。失效的内部链接会导致 VitePress 构建失败。

成功后可在该次 Actions 运行的 Artifacts 下载 `docs-site-<完整提交 hash>`，保留 14 天。解压后即可得到站点静态文件。`main` 分支的推送和手动构建还会自动部署到 GitHub Pages；PR、`dev` 和标签构建仅保存产物。

## GitHub Pages 设置

在仓库 Settings → Pages → Build and deployment 中，将 Source 设为 **GitHub Actions**。首次部署前需要完成此设置。

正式地址为 `https://doc.seiion.com/`，CI 固定按根路径 `/` 构建，不需要设置 `VITEPRESS_BASE` 仓库变量。

在 Settings → Pages → Custom domain 填入 `doc.seiion.com` 并保存。在 `seiion.com` 的 DNS 中添加：

| 类型 | 名称 | 目标 |
| --- | --- | --- |
| CNAME | doc | nsrhdeveloperplan.github.io |

DNS 校验和证书签发完成后启用 Enforce HTTPS。Actions 部署不需要仓库内的 CNAME 文件。

部署使用官方 Pages artifact 与 OIDC 授权，不需要额外的部署令牌。工作流需合入并推送 `main` 后才会触发正式上线。

贡献和签名提交要求见 `AGENTS.md`，具体维护说明见 `docs/guide/`。
