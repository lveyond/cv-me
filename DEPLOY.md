# GitHub Pages 部署指南

## 使用 GitHub Actions 自动部署（推荐）

### 1. 准备工作

1. **创建 GitHub 仓库**
   - 在 GitHub 上创建一个新仓库（例如：`cv-me`）
   - 不要初始化 README、.gitignore 或 license

2. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/cv-me.git
   git push -u origin main
   ```

### 2. 启用 GitHub Pages

1. 进入仓库的 **Settings** 页面
2. 在左侧菜单中找到 **Pages**
3. 在 **Source** 部分，选择 **GitHub Actions**
4. 保存设置

### 3. 触发部署

- 每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署
- 也可以在 **Actions** 标签页手动触发部署

### 4. 访问网站

部署完成后，网站地址为：
```
https://你的用户名.github.io/cv-me/
```

## 注意事项

1. **Base 路径**：如果部署到子路径（如 `/cv-me/`），需在 `vite.config.js` 中配置 `base: '/cv-me/'`
2. **路由模式**：项目使用 Hash 路由，兼容 GitHub Pages 静态部署
3. **仓库可见性**：公开仓库可免费使用 GitHub Pages；私有仓库需 GitHub Enterprise
