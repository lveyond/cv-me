<template>
  <div class="mosaic-page">
    <!-- 背景装饰（极简） -->
    <div class="mosaic-bg" aria-hidden="true">
      <div class="mosaic-grid mosaic-grid-tl">
        <span v-for="n in 9" :key="n" class="mosaic-cell"></span>
      </div>
    </div>

    <!-- 画廊画布：可自由拖拽移位 -->
    <main class="mosaic-canvas" ref="canvasRef">
      <div
        v-for="card in orderedCards"
        :key="card.id"
        class="mosaic-card mosaic-card-enter"
        :class="{ 'mosaic-card-wide': ['experience', 'skills'].includes(card.id), 'mosaic-card-photo': card.id === 'photo', 'mosaic-card-dragging': draggingCardId === card.id, 'mosaic-card-active': activeCardId === card.id }"
        :style="getCardStyle(card)"
        @click="onCardClick(card.id)"
      >
        <div class="mosaic-card-handle" title="拖拽移动位置" @mousedown="onCardMouseDown($event, card.id)">
          <span class="mosaic-card-drag-icon">⋮⋮</span>
        </div>

        <template v-if="card.id === 'photo'">
          <div class="mosaic-photo-wrap mosaic-polaroid">
            <div class="mosaic-photo">
              <img v-if="photoSrc" :src="photoSrc" :alt="t('resume.name')" class="mosaic-photo-img" />
              <div v-else class="mosaic-photo-placeholder">
                <span class="mosaic-photo-hint">Photo</span>
              </div>
            </div>
            <div class="mosaic-polaroid-caption"></div>
          </div>
          <div class="mosaic-hero-text">
            <h1 class="mosaic-name">{{ t('resume.name') }}</h1>
            <p class="mosaic-role">Senior Product Director</p>
            <div class="mosaic-info-bar">
              <template v-if="t('resume.phone')">
                <span>{{ t('resume.phone') }}</span>
                <span class="info-dot">·</span>
              </template>
              <span class="info-email">{{ t('resume.email') }}</span>
              <template v-if="t('resume.location')">
                <span class="info-dot">·</span>
                <span>{{ t('resume.location') }}</span>
              </template>
              <template v-if="t('resume.wechat')">
                <span class="info-dot">·</span>
                <span>{{ t('resume.wechatLabel') }} {{ t('resume.wechat') }}</span>
              </template>
            </div>
          </div>
        </template>

        <template v-else-if="card.id === 'summary'">
          <div class="mosaic-section-head">
            <span class="mosaic-num">01</span>
            <h2 class="mosaic-section-title">{{ t('resume.summary') }}</h2>
          </div>
          <div class="mosaic-section-body">
            <p class="mosaic-summary" v-html="highlightKeywords(t('resume.summaryText'))"></p>
          </div>
        </template>

        <template v-else-if="card.id === 'qualifications'">
          <div class="mosaic-section-head">
            <span class="mosaic-num">02</span>
            <h2 class="mosaic-section-title">{{ t('resume.qualifications') }} & {{ t('resume.honors') }}</h2>
          </div>
          <div class="mosaic-section-body mosaic-tags-block">
            <div class="mosaic-tags-row">
              <span class="mosaic-tag-label">{{ t('resume.qualifications') }}</span>
              <div class="mosaic-tags">
                <span v-for="(tag, i) in parseTags(t('resume.qualificationsList'))" :key="i" class="mosaic-tag mosaic-tag-fill">{{ tag }}</span>
              </div>
            </div>
            <div class="mosaic-tags-row">
              <span class="mosaic-tag-label">{{ t('resume.honors') }}</span>
              <div class="mosaic-tags">
                <span v-for="(tag, i) in parseTags(t('resume.honorsList'))" :key="i" class="mosaic-tag mosaic-tag-outline">{{ tag }}</span>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="card.id === 'education'">
          <div class="mosaic-section-head">
            <span class="mosaic-num">03</span>
            <h2 class="mosaic-section-title">{{ t('resume.education') }}</h2>
          </div>
          <div class="mosaic-section-body">
            <div class="mosaic-edu-grid">
              <article v-for="i in 4" :key="i" class="mosaic-edu-card">
                <div class="mosaic-edu-header">
                  <img v-if="t(`resume.edu${i}Logo`)" :src="t(`resume.edu${i}Logo`)" :alt="t(`resume.edu${i}School`)" :class="['mosaic-edu-logo', i === 2 ? 'mosaic-edu-logo-dark' : '']" @error="handleLogoError" />
                  <div class="mosaic-edu-meta">
                    <span class="mosaic-edu-degree">{{ t(`resume.edu${i}Title`) }}</span>
                    <span class="mosaic-edu-period">{{ t(`resume.edu${i}Period`) }}</span>
                  </div>
                </div>
                <div class="mosaic-edu-school">
                  <template v-if="currentLanguage === 'en'">{{ t(`resume.edu${i}SchoolEn`) }}</template>
                  <template v-else>{{ t(`resume.edu${i}School`) }} ({{ t(`resume.edu${i}SchoolEn`) }})</template>
                  <span v-if="t(`resume.edu${i}Rank`)" class="mosaic-edu-rank">{{ t(`resume.edu${i}Rank`) }}</span>
                </div>
                <div class="mosaic-edu-major">{{ t(`resume.edu${i}Major`) }}</div>
              </article>
            </div>
          </div>
        </template>

        <template v-else-if="card.id === 'experience'">
          <div class="mosaic-section-head">
            <span class="mosaic-num">04</span>
            <h2 class="mosaic-section-title">{{ t('resume.experience') }}</h2>
          </div>
          <div class="mosaic-section-body">
            <div class="mosaic-exp-list">
              <article v-for="i in 5" :key="i" class="mosaic-exp-card" v-show="t(`resume.exp${i}Title`)">
                <div class="mosaic-exp-header">
                  <h3 class="mosaic-exp-title">{{ t(`resume.exp${i}Title`) }}</h3>
                  <span class="mosaic-exp-period" v-if="t(`resume.exp${i}Period`)">{{ t(`resume.exp${i}Period`) }}</span>
                </div>
                <div class="mosaic-exp-company" v-if="t(`resume.exp${i}Company`)">{{ t(`resume.exp${i}Company`) }}</div>
                <ul class="mosaic-exp-duties">
                  <li v-if="t(`resume.exp${i}Duty1`)">{{ t(`resume.exp${i}Duty1`) }}</li>
                  <li v-if="t(`resume.exp${i}Duty2`)">{{ t(`resume.exp${i}Duty2`) }}</li>
                  <li v-if="t(`resume.exp${i}Duty3`)">{{ t(`resume.exp${i}Duty3`) }}</li>
                </ul>
                <div class="mosaic-exp-tech" v-if="t(`resume.exp${i}Tags`)">
                  <span v-for="tag in t(`resume.exp${i}Tags`).split(',')" :key="tag" class="mosaic-tech-tag">{{ tag }}</span>
                </div>
              </article>
            </div>
          </div>
        </template>

        <template v-else-if="card.id === 'skills'">
          <div class="mosaic-section-head">
            <span class="mosaic-num">05</span>
            <h2 class="mosaic-section-title">{{ t('resume.skills') }}</h2>
          </div>
          <div class="mosaic-section-body">
            <div class="mosaic-skills-grid">
              <div class="mosaic-skill-group" v-for="(items, key) in skillGroups" :key="key">
                <h4 class="mosaic-skill-title">{{ t(`resume.${key}`) }}</h4>
                <div class="mosaic-skill-tags">
                  <span v-for="(item, idx) in items" :key="idx" class="mosaic-skill-tag">{{ item.startsWith('skill') ? t(`resume.${item}`) : item }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, inject, watch, shallowRef, onMounted } from 'vue'
import { getCurrentLanguage, t as translate } from '../i18n'

const currentLanguage = inject('language', ref(getCurrentLanguage()))

// 个人照片：设置路径即可显示，如 '/photo.jpg'，留空显示占位
const photoSrc = ref('')

const CARD_ORDER_KEY = 'cv-mosaic-card-order'
const CARD_POSITIONS_KEY = 'cv-mosaic-card-positions'
const defaultOrder = ['photo', 'summary', 'qualifications', 'education', 'experience', 'skills']

const loadCardOrder = () => {
  try {
    const saved = localStorage.getItem(CARD_ORDER_KEY)
    if (saved) {
      const arr = JSON.parse(saved)
      return defaultOrder.filter(id => arr.includes(id)).concat(defaultOrder.filter(id => !arr.includes(id)))
    }
  } catch (_) {}
  return [...defaultOrder]
}

const getDefaultPositions = (canvasWidth) => {
  const w = canvasWidth || 1200
  const cardW = 420
  const cardWide = 560
  const gap = 24
  const col1 = gap
  const col2 = Math.round((w - cardW) / 2)
  const col3 = Math.max(col1, w - cardW - gap)
  const col3Wide = Math.max(col1, w - cardWide - gap)
  const row1 = 0
  const row2 = 300
  return {
    photo: { x: col1, y: row1 },
    summary: { x: col2, y: row1 },
    qualifications: { x: col3, y: row1 },
    education: { x: col1, y: row2 },
    experience: { x: col2, y: row2 },
    skills: { x: col3Wide, y: row2 }
  }
}

const defaultPositions = getDefaultPositions(1200)

const loadCardPositions = () => {
  try {
    const saved = localStorage.getItem(CARD_POSITIONS_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...getDefaultPositions(1200), ...parsed }
    }
  } catch (_) {}
  return {}
}

const orderedCards = shallowRef(loadCardOrder().map(id => ({ id })))
const cardPositions = ref(loadCardPositions())

const canvasRef = ref(null)
onMounted(() => {
  if (Object.keys(cardPositions.value).length === 0 && canvasRef.value) {
    const w = canvasRef.value.offsetWidth || 1200
    cardPositions.value = getDefaultPositions(w)
  }
})

watch(orderedCards, (val) => {
  localStorage.setItem(CARD_ORDER_KEY, JSON.stringify(val.map(c => c.id)))
}, { deep: true })

watch(cardPositions, (val) => {
  localStorage.setItem(CARD_POSITIONS_KEY, JSON.stringify(val))
}, { deep: true })

const STACK_ORDER = { photo: 1, summary: 2, qualifications: 3, education: 4, experience: 5, skills: 6 }

const getCardStyle = (card) => {
  const pos = cardPositions.value[card.id] ?? defaultPositions[card.id] ?? { x: 0, y: 0 }
  let z = STACK_ORDER[card.id] ?? 1
  if (draggingCardId.value === card.id) z = 100
  else if (activeCardId.value === card.id) z = 50
  return {
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    zIndex: z
  }
}

let dragState = null
let hasDragged = false
const draggingCardId = ref(null)
const activeCardId = ref(null)
const justDraggedRef = ref(false)

const onCardMouseDown = (e, cardId) => {
  e.preventDefault()
  e.stopPropagation()
  hasDragged = false
  justDraggedRef.value = false
  draggingCardId.value = cardId
  const pos = cardPositions.value[cardId] || defaultPositions[cardId]
  dragState = {
    cardId,
    startX: e.clientX,
    startY: e.clientY,
    initialX: pos.x,
    initialY: pos.y
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (e) => {
  if (!dragState) return
  hasDragged = true
  const dx = e.clientX - dragState.startX
  const dy = e.clientY - dragState.startY
  const newX = Math.max(0, dragState.initialX + dx)
  const newY = Math.max(0, dragState.initialY + dy)
  cardPositions.value = {
    ...cardPositions.value,
    [dragState.cardId]: { x: newX, y: newY }
  }
}

const onMouseUp = () => {
  justDraggedRef.value = hasDragged
  dragState = null
  draggingCardId.value = null
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

const onCardClick = (cardId) => {
  if (justDraggedRef.value) {
    justDraggedRef.value = false
    return
  }
  activeCardId.value = cardId
}

const t = (key) => translate(key, currentLanguage.value)

const skillGroups = {
  productDesign: ['skillProductPrototype', 'skillUXDesign', 'skillInteractionDesign', 'Figma', 'Sketch', 'Adobe XD'],
  projectManagement: ['skillProjectPlanning', 'skillTeamCoordination', 'skillProgressManagement', 'skillRequirementAnalysis', 'skillRiskManagement'],
  productOperation: ['skillUserGrowth', 'skillChannelPromotion', 'skillOperationStrategy', 'skillDataAnalysis', 'skillCommunityOperation'],
  marketing: ['skillMarketing', 'skillBrandPromotion', 'skillContentOperation', 'skillVideoAccountOperation', 'skillEcommerceOperation'],
  tools: ['skillProjectManagementTools', 'skillDataAnalysisTools', 'skillDesignTools', 'skillCollaborationTools']
}

const handleLogoError = (e) => { e.target.style.display = 'none' }

const parseTags = (text) => {
  if (!text) return []
  const isEn = currentLanguage.value === 'en'
  if (isEn) return (text.includes(';') ? text.split(';') : text.split(',')).map(s => s.trim()).filter(Boolean)
  return text.split(/[、，]/).map(s => s.trim()).filter(Boolean)
}

const highlightKeywords = (text) => {
  if (!text) return ''
  const groups = [
    { words: ['项目管理', '項目管理', 'project management', '产品设计', '產品設計', 'product design', '数据分析', '數據分析', 'data analysis', '用户体验', '用戶體驗', 'user experience', '需求分析', 'requirement analysis'], class: 'mosaic-hl' },
    { words: ['丰富经验', '豐富經驗', 'extensive experience'], class: 'mosaic-hl mosaic-hl-alt' }
  ]
  let r = text
  groups.forEach(({ words, class: cls }) => {
    words.forEach(kw => {
      const esc = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const re = new RegExp(esc, 'gi')
      r = r.replace(re, `<span class="${cls}">$&</span>`)
    })
  })
  return r
}
</script>

<style scoped>
.mosaic-page {
  min-height: 100vh;
  padding: var(--spacing-md) max(24px, 4vw);
  position: relative;
  overflow-x: hidden;
}

/* 背景装饰 */
.mosaic-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.mosaic-grid {
  position: absolute;
  display: grid;
  gap: 4px;
}

.mosaic-grid-tl {
  top: 24px;
  left: 24px;
  width: 48px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.mosaic-cell {
  background: var(--accent);
  border-radius: 2px;
  aspect-ratio: 1;
  opacity: 0.06;
}

/* 照片卡片内部 - Polaroid 风格 */

.mosaic-polaroid {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 12px 32px 12px;
  background: var(--bg-primary);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.07),
    0 12px 24px rgba(0, 0, 0, 0.1),
    2px 2px 0 var(--accent);
  transform: rotate(-6deg);
  border-radius: 12px;
  flex-shrink: 0;
}

.mosaic-photo {
  width: 220px;
  height: 280px;
  overflow: hidden;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.mosaic-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mosaic-photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
  font-family: var(--font-sans);
}

.mosaic-photo-hint {
  opacity: 0.6;
}

.mosaic-polaroid-caption {
  width: 100%;
  height: 28px;
  margin-top: 8px;
  background: linear-gradient(135deg, var(--accent-soft) 0%, transparent 100%);
  border-radius: 8px;
  opacity: 0.6;
}

.mosaic-hero-text {
  min-width: 0;
}

.mosaic-name {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 var(--spacing-xs);
}

.mosaic-role {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  margin: 0 0 var(--spacing-md);
}

.mosaic-info-bar {
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.mosaic-info-bar .info-dot {
  opacity: 0.5;
}

.mosaic-info-bar .info-email {
  color: var(--accent);
}

/* 画廊画布 */
.mosaic-canvas {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 800px;
  margin: 0;
}

/* 卡片 */
.mosaic-card {
  position: absolute;
  z-index: 1;
  width: min(420px, calc(50% - 24px));
  padding: var(--spacing-xl);
  padding-right: 48px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
  transition: box-shadow 0.3s ease;
  animation: cardEnter 0.6s ease backwards;
  min-width: 0;
  overflow: hidden;
  cursor: default;
}

.mosaic-card-wide {
  width: min(560px, calc(60% - 24px));
}

.mosaic-card-photo {
  width: min(620px, calc(55% - 24px));
  min-height: 320px;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-xl);
  align-items: center;
  padding: var(--spacing-xl);
  border-radius: 12px;
}

.mosaic-card-photo .mosaic-photo-wrap {
  position: relative;
  flex-shrink: 0;
}

.mosaic-card-photo .mosaic-hero-text {
  min-width: 0;
  flex: 1;
}

.mosaic-photo-wrap {
  position: relative;
}

.mosaic-card:nth-child(1) { animation-delay: 0.03s; }
.mosaic-card:nth-child(2) { animation-delay: 0.06s; }
.mosaic-card:nth-child(3) { animation-delay: 0.09s; }
.mosaic-card:nth-child(4) { animation-delay: 0.12s; }
.mosaic-card:nth-child(5) { animation-delay: 0.15s; }
.mosaic-card:nth-child(6) { animation-delay: 0.18s; }

.mosaic-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.mosaic-card-handle {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  cursor: grab;
  opacity: 0.6;
  border-radius: 6px;
  transition: opacity 0.2s, background 0.2s;
  user-select: none;
}

.mosaic-card-handle:hover {
  opacity: 1;
  background: var(--bg-tertiary);
}

.mosaic-card-handle:active {
  cursor: grabbing;
}

.mosaic-card-drag-icon {
  font-size: 14px;
  letter-spacing: -2px;
}

.mosaic-card-ghost {
  opacity: 0.4;
}

.mosaic-card-dragging {
  cursor: grabbing;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.mosaic-card-active {
  z-index: 50;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  animation: cardToFront 0.3s ease;
}

@keyframes cardToFront {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mosaic-section {
  margin-bottom: 0;
}

.mosaic-section-head {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.mosaic-num {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
  opacity: 0.5;
  line-height: 1;
  flex-shrink: 0;
}

.mosaic-section-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
  word-break: break-word;
}

.mosaic-section-body {
  padding-left: 0;
}

/* 简介 */
.mosaic-summary {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
  white-space: pre-line;
  word-break: break-word;
}

.mosaic-summary :deep(.mosaic-hl) {
  color: var(--accent);
  font-weight: 600;
  padding: 0 2px;
}

.mosaic-summary :deep(.mosaic-hl-alt) {
  font-weight: 500;
}

/* 标签区 */
.mosaic-tags-block {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.mosaic-tags-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.mosaic-tag-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
}

.mosaic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.mosaic-tag {
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: var(--font-sans);
  word-break: break-word;
  line-height: 1.5;
}

.mosaic-tag-fill {
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid var(--accent-border);
}

.mosaic-tag-outline {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

/* 教育 */
.mosaic-edu-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.mosaic-edu-card {
  padding: var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.mosaic-edu-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: 6px;
}

.mosaic-edu-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.mosaic-edu-logo-dark {
  filter: brightness(0) invert(1);
}

[data-theme="light"] .mosaic-edu-logo-dark {
  filter: brightness(0);
}

.mosaic-edu-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex: 1;
}

.mosaic-edu-degree {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.mosaic-edu-period {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.mosaic-edu-school {
  font-size: 13px;
  color: var(--accent);
  margin-bottom: 4px;
  word-break: break-word;
}

.mosaic-edu-rank {
  display: inline-block;
  margin-left: 0.5em;
  font-size: 11px;
  color: var(--text-muted);
}

.mosaic-edu-major {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 经历 */
.mosaic-exp-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.mosaic-exp-card {
  padding: var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.mosaic-exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.mosaic-exp-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.mosaic-exp-period {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.mosaic-exp-company {
  font-size: 14px;
  color: var(--accent);
  margin-bottom: var(--spacing-sm);
}

.mosaic-exp-duties {
  margin: 0;
  padding-left: var(--spacing-lg);
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.mosaic-exp-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}

.mosaic-tech-tag {
  font-size: 11px;
  padding: 4px 10px;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid var(--accent-border);
  border-radius: 2px;
}

/* 技能 */
.mosaic-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.mosaic-skill-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.mosaic-skill-title {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.mosaic-skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.mosaic-skill-tag {
  font-size: 12px;
  padding: 4px 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  border-radius: 6px;
}

/* 技能组需要翻译 key */
.mosaic-skill-tag {
  font-family: var(--font-sans);
}
</style>
