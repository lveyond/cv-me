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

## 证书图片（隐私保护）

隐私图片（头像 + 证书）已加入 `.gitignore`，**不会**被提交到公开仓库。部署时通过 **GitHub Secrets** 注入，构建时自动还原到 `public/`。

### 配置步骤

1. **生成 base64**：
   - **方式一**：双击运行 `scripts\encode-certs.bat`
   - **方式二**：在项目根目录执行 `node scripts/encode-certs.cjs`
   会在 `scripts/` 下生成 `PROFILE_PHOTO.txt`、`CERT_SENIOR.txt` 等文件（已 gitignore）。

2. **添加 GitHub Secrets**：
   - 打开仓库 **Settings** > **Secrets and variables** > **Actions**
   - 点击 **New repository secret**
   - 依次添加 8 个 Secret，名称与值如下：

   | 名称 | 值 |
   |------|-----|
   | PROFILE_PHOTO | 从 `scripts/PROFILE_PHOTO.txt` 复制全部内容 |
   | CERT_SENIOR | 从 `scripts/CERT_SENIOR.txt` 复制 |
   | CERT_SF | 从 `scripts/CERT_SF.txt` 复制 |
   | CERT_BCM | 从 `scripts/CERT_BCM.txt` 复制 |
   | CERT_PK | 从 `scripts/CERT_PK.txt` 复制 |
   | CERT_DATAXJX | 从 `scripts/CERT_DATAXJX.txt` 复制 |
   | CERT_XZXLH | 从 `scripts/CERT_XZXLH.txt` 复制 |
   | CERT_SZZG3 | 从 `scripts/CERT_SZZG3.txt` 复制 |

3. **推送代码**：GitHub Actions 构建时会自动解码并写入 `public/`，部署后证书可正常显示。

### 若证书此前已提交过

需从 Git 中移除（本地文件保留）：
```bash
git rm --cached public/profile.jpg public/senior.jpg public/sf.jpg public/bcm.jpg public/pk.jpg public/dataxjx.jpg public/xzxlh.jpg public/szzg3.jpg
git commit -m "chore: remove private images from repo"
```

### 说明

密码保护仅为前端限制，技术用户仍可能通过开发者工具获取图片。若需更强保护，需配合后端鉴权。
