<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <div class="header-actions">
          <router-link v-if="route.name === 'Resume'" to="/mosaic" class="style-link style-link-mosaic">
            <span class="mosaic-arrow" aria-hidden="true">→</span>
            <span class="mosaic-label">Mosaic</span>
            <span class="mosaic-hint">{{ t('mosaicHint') }}</span>
          </router-link>
          <router-link v-else-if="route.name === 'ResumeMosaic'" to="/" class="style-link">Classic</router-link>
          <button
            v-if="route.name === 'Resume' || route.name === 'ResumeMosaic'"
            type="button"
            class="theme-toggle"
            :title="theme === 'dark' ? '切换浅色' : '切换深色'"
            @click="toggleTheme"
            aria-label="切换主题"
          >
            <span v-if="theme === 'dark'" class="theme-icon">☀</span>
            <span v-else class="theme-icon">☽</span>
          </button>
          <div class="language-selector">
            <select v-model="currentLanguage" @change="changeLanguage" class="language-select">
              <option value="zh-CN">简体中文</option>
              <option value="zh-HK">繁體中文（港）</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content" :class="{ 'main-content-mosaic': route.name === 'ResumeMosaic' }">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <span class="footer-text">GitHub: <a href="https://github.com/lveyond" target="_blank" rel="noopener noreferrer" class="footer-link">@lveyond</a></span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentLanguage, setCurrentLanguage, t as translate } from './i18n'

const currentLanguage = ref(getCurrentLanguage())
const route = useRoute()

const THEME_KEY = 'cv-me-theme'
const theme = ref(localStorage.getItem(THEME_KEY) || 'dark')

const applyTheme = (val) => {
  document.documentElement.setAttribute('data-theme', val)
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem(THEME_KEY, theme.value)
  applyTheme(theme.value)
}

onMounted(() => {
  applyTheme(theme.value)
})

const changeLanguage = (event) => {
  const lang = event.target.value
  setCurrentLanguage(lang)
  currentLanguage.value = lang
  window.dispatchEvent(new CustomEvent('language-changed', { detail: lang }))
}

provide('language', currentLanguage)
provide('t', translate)

const t = (key) => translate(key, currentLanguage.value)

window.addEventListener('language-changed', () => {
  currentLanguage.value = getCurrentLanguage()
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse at top left, rgba(224, 122, 95, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.04) 0%, transparent 50%);
  z-index: -1;
  pointer-events: none;
}

[data-theme="light"] #app::before {
  background:
    radial-gradient(ellipse at top right, rgba(193, 127, 106, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at bottom left, rgba(193, 127, 106, 0.04) 0%, transparent 50%);
}

.header {
  padding: var(--spacing-md) var(--spacing-xl);
  background: color-mix(in srgb, var(--bg-secondary) 85%, transparent);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s, border-color 0.3s;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 1400px;
  margin: 0 auto;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.style-link {
  font-size: 12px;
  color: var(--text-muted);
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.style-link:hover {
  color: var(--accent);
  background: var(--accent-soft);
}

/* Mosaic 引导：动态箭头 + 高亮 */
.style-link-mosaic {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent) !important;
  background: var(--accent-soft) !important;
  border: 1px solid var(--accent-border);
  animation: mosaic-pulse 2s ease-in-out infinite;
}

.style-link-mosaic:hover {
  background: var(--accent-soft) !important;
  border-color: var(--accent);
  animation: none;
  box-shadow: none;
}

.mosaic-arrow {
  font-size: 14px;
  font-weight: 700;
  animation: mosaic-arrow-bounce 1.2s ease-in-out infinite;
}

.mosaic-label {
  font-weight: 600;
}

.mosaic-hint {
  font-size: 10px;
  opacity: 0.85;
  font-weight: 500;
}

@keyframes mosaic-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(224, 122, 95, 0.35); }
  50% { box-shadow: 0 0 0 8px rgba(224, 122, 95, 0); }
}

[data-theme="light"] .style-link-mosaic {
  animation-name: mosaic-pulse-light;
}

@keyframes mosaic-pulse-light {
  0%, 100% { box-shadow: 0 0 0 0 rgba(193, 127, 106, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(193, 127, 106, 0); }
}

@keyframes mosaic-arrow-bounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
}

.theme-toggle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent-border);
  background: var(--accent-soft);
}

.language-select {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all 0.2s;
}

.language-select:hover {
  border-color: var(--border-hover);
  background: var(--bg-hover);
}

.main-content {
  flex: 1;
  padding: var(--spacing-xl);
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.main-content-mosaic {
  max-width: none;
  padding: var(--spacing-md) max(20px, 3vw);
}

.footer {
  padding: var(--spacing-md) var(--spacing-xl);
  background: color-mix(in srgb, var(--bg-secondary) 85%, transparent);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid var(--border-color);
  transition: background 0.3s, border-color 0.3s;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  font-size: 11px;
  color: var(--text-muted);
}

.footer-link {
  color: var(--text-link);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--accent);
  text-decoration: underline;
}
</style>
