/**
 * 将 public 目录下的资源路径转换为带 base 的完整 URL。
 * 在 GitHub Pages 部署时（base: '/cv-me/'），/profile.jpg 需变为 /cv-me/profile.jpg。
 */
export function assetUrl(path) {
    if (!path) return ''
    const base =
        import.meta.env.BASE_URL || '/'
    return base + path.replace(/^\//, '')
}