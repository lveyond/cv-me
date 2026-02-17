import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3000,
        open: true
    },
    // GitHub Pages 部署配置（base 需与仓库名一致）
    base: process.env.NODE_ENV === 'production' ? '/cv-me/' : '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false
    }
})