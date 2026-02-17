<template>
  <div class="resume-page">
    <div class="resume-container">
      <!-- 简历头 + 个人简介 + 照片（跨栏目） -->
      <div class="resume-hero">
        <div class="resume-hero-main">
          <header class="resume-header">
            <div class="resume-header-inner">
              <span class="resume-title">{{ t('resume.title') }}</span>
              <span class="resume-subtitle">Portfolio</span>
            </div>
            <div class="resume-header-accent"></div>
          </header>

          <div class="personal-info-compact">
            <span class="info-name">{{ t('resume.name') }}</span>
            <template v-if="t('resume.phone')">
              <span class="info-separator">|</span>
              <span class="info-phone">{{ t('resume.phone') }}</span>
            </template>
            <span class="info-separator">|</span>
            <span class="info-email">{{ t('resume.email') }}</span>
            <template v-if="t('resume.location')">
              <span class="info-separator">|</span>
              <span class="info-location">{{ t('resume.location') }}</span>
            </template>
            <template v-if="t('resume.wechat')">
              <span class="info-separator">|</span>
              <span class="info-wechat">{{ t('resume.wechatLabel') }} {{ t('resume.wechat') }}</span>
            </template>
          </div>

          <section class="resume-section resume-section-hero">
            <h2 class="section-title"><span class="section-num">01</span>{{ t('resume.summary') }}</h2>
            <p class="summary-text" v-html="highlightKeywords(t('resume.summaryText'))"></p>
          </section>
        </div>

        <div class="resume-hero-photo">
          <div class="resume-photo-frame">
            <div v-if="photoSrc && !photoError" class="photo-protect">
              <img :src="photoSrc" :alt="t('resume.name')" class="resume-photo-img" draggable="false" @error="photoError = true" @contextmenu.prevent />
              <div class="photo-overlay" @contextmenu.prevent></div>
            </div>
            <div v-else class="resume-photo-placeholder">
              <span class="resume-photo-hint">Photo</span>
            </div>
          </div>
        </div>
      </div>

      <div class="resume-content">
        <!-- 专业资质和获奖荣誉 -->
        <section class="resume-section">
          <h2 class="section-title"><span class="section-num">02</span>{{ t('resume.qualifications') }} & {{ t('resume.honors') }}</h2>
          <div class="qualifications-honors">
            <div class="qualifications-item">
              <span class="qualifications-label">{{ t('resume.qualifications') }}</span>
              <div class="tags-container">
                <span
                  v-for="(tag, index) in parseTags(t('resume.qualificationsList'))"
                  :key="index"
                  :class="['design-tag', 'design-tag-accent', getCertImage('qualifications', index) && 'design-tag-clickable']"
                  @click="openCertModal('qualifications', index)"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="honors-item">
              <span class="honors-label">{{ t('resume.honors') }}</span>
              <div class="tags-container">
                <span
                  v-for="(tag, index) in parseTags(t('resume.honorsList'))"
                  :key="index"
                  :class="['design-tag', 'design-tag-muted', getCertImage('honors', index) && 'design-tag-clickable']"
                  @click="openCertModal('honors', index)"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 教育经历 -->
        <section class="resume-section">
          <h2 class="section-title"><span class="section-num">03</span>{{ t('resume.education') }}</h2>
          <div class="education-list">
            <div class="education-item">
              <div class="education-header">
                <div class="education-header-left">
                  <img v-if="t('resume.edu1Logo')" :src="assetUrl(t('resume.edu1Logo'))" :alt="t('resume.edu1School')" class="education-logo" @error="handleLogoError" />
                  <h3 class="education-title">{{ t('resume.edu1Title') }}</h3>
                </div>
                <span class="education-period">{{ t('resume.edu1Period') }}</span>
              </div>
              <div class="education-school">
                <template v-if="currentLanguage === 'en'">{{ t('resume.edu1SchoolEn') }}</template>
                <template v-else>{{ t('resume.edu1School') }} ({{ t('resume.edu1SchoolEn') }})</template>
                <span v-if="t('resume.edu1Rank')" class="education-rank">{{ t('resume.edu1Rank') }}</span>
              </div>
              <div class="education-major">{{ t('resume.edu1Major') }}</div>
            </div>
            <div class="education-item">
              <div class="education-header">
                <div class="education-header-left">
                  <img v-if="t('resume.edu2Logo')" :src="assetUrl(t('resume.edu2Logo'))" :alt="t('resume.edu2School')" class="education-logo" @error="handleLogoError" />
                  <h3 class="education-title">{{ t('resume.edu2Title') }}</h3>
                </div>
                <span class="education-period">{{ t('resume.edu2Period') }}</span>
              </div>
              <div class="education-school">
                <template v-if="currentLanguage === 'en'">{{ t('resume.edu2SchoolEn') }}</template>
                <template v-else>{{ t('resume.edu2School') }} ({{ t('resume.edu2SchoolEn') }})</template>
                <span v-if="t('resume.edu2Rank')" class="education-rank">{{ t('resume.edu2Rank') }}</span>
              </div>
              <div class="education-major">{{ t('resume.edu2Major') }}</div>
            </div>
            <div class="education-item">
              <div class="education-header">
                <div class="education-header-left">
                  <img v-if="t('resume.edu3Logo')" :src="assetUrl(t('resume.edu3Logo'))" :alt="t('resume.edu3School')" class="education-logo" @error="handleLogoError" />
                  <h3 class="education-title">{{ t('resume.edu3Title') }}</h3>
                </div>
                <span class="education-period">{{ t('resume.edu3Period') }}</span>
              </div>
              <div class="education-school">
                <template v-if="currentLanguage === 'en'">{{ t('resume.edu3SchoolEn') }}</template>
                <template v-else>{{ t('resume.edu3School') }} ({{ t('resume.edu3SchoolEn') }})</template>
                <span v-if="t('resume.edu3Rank')" class="education-rank">{{ t('resume.edu3Rank') }}</span>
              </div>
              <div class="education-major">{{ t('resume.edu3Major') }}</div>
            </div>
            <div class="education-item">
              <div class="education-header">
                <div class="education-header-left">
                  <img v-if="t('resume.edu4Logo')" :src="assetUrl(t('resume.edu4Logo'))" :alt="t('resume.edu4School')" class="education-logo" @error="handleLogoError" />
                  <h3 class="education-title">{{ t('resume.edu4Title') }}</h3>
                </div>
                <span class="education-period">{{ t('resume.edu4Period') }}</span>
              </div>
              <div class="education-school">
                <template v-if="currentLanguage === 'en'">{{ t('resume.edu4SchoolEn') }}</template>
                <template v-else>{{ t('resume.edu4School') }} ({{ t('resume.edu4SchoolEn') }})</template>
                <span v-if="t('resume.edu4Rank')" class="education-rank">{{ t('resume.edu4Rank') }}</span>
              </div>
              <div class="education-major">{{ t('resume.edu4Major') }}</div>
            </div>
          </div>
        </section>

        <!-- 项目经验 -->
        <section class="resume-section">
          <h2 class="section-title"><span class="section-num">04</span>{{ t('resume.experience') }}</h2>
          <div class="experience-list">
            <div class="experience-item" v-for="i in 5" :key="i" v-show="t(`resume.exp${i}Title`)">
              <div class="experience-header">
                <h3 class="experience-title">{{ t(`resume.exp${i}Title`) }}</h3>
                <span class="experience-period" v-if="t(`resume.exp${i}Period`)">{{ t(`resume.exp${i}Period`) }}</span>
              </div>
              <div class="experience-company" v-if="t(`resume.exp${i}Company`)">{{ t(`resume.exp${i}Company`) }}</div>
              <ul class="experience-duties">
                <li v-if="t(`resume.exp${i}Duty1`)">{{ t(`resume.exp${i}Duty1`) }}</li>
                <li v-if="t(`resume.exp${i}Duty2`)">{{ t(`resume.exp${i}Duty2`) }}</li>
                <li v-if="t(`resume.exp${i}Duty3`)">{{ t(`resume.exp${i}Duty3`) }}</li>
              </ul>
              <div class="experience-tech" v-if="t(`resume.exp${i}Tags`)">
                <span class="tech-tag" v-for="tag in t(`resume.exp${i}Tags`).split(',')" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 技能 -->
        <section class="resume-section">
          <h2 class="section-title"><span class="section-num">05</span>{{ t('resume.skills') }}</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.productDesign') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">{{ t('resume.skillProductPrototype') }}</span>
                <span class="skill-tag">{{ t('resume.skillUXDesign') }}</span>
                <span class="skill-tag">{{ t('resume.skillInteractionDesign') }}</span>
                <span class="skill-tag">Figma</span>
                <span class="skill-tag">Sketch</span>
                <span class="skill-tag">Adobe XD</span>
              </div>
            </div>
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.projectManagement') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">{{ t('resume.skillProjectPlanning') }}</span>
                <span class="skill-tag">{{ t('resume.skillTeamCoordination') }}</span>
                <span class="skill-tag">{{ t('resume.skillProgressManagement') }}</span>
                <span class="skill-tag">{{ t('resume.skillRequirementAnalysis') }}</span>
                <span class="skill-tag">{{ t('resume.skillRiskManagement') }}</span>
              </div>
            </div>
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.productOperation') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">{{ t('resume.skillUserGrowth') }}</span>
                <span class="skill-tag">{{ t('resume.skillChannelPromotion') }}</span>
                <span class="skill-tag">{{ t('resume.skillOperationStrategy') }}</span>
                <span class="skill-tag">{{ t('resume.skillDataAnalysis') }}</span>
                <span class="skill-tag">{{ t('resume.skillCommunityOperation') }}</span>
              </div>
            </div>
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.marketing') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">{{ t('resume.skillMarketing') }}</span>
                <span class="skill-tag">{{ t('resume.skillBrandPromotion') }}</span>
                <span class="skill-tag">{{ t('resume.skillContentOperation') }}</span>
                <span class="skill-tag">{{ t('resume.skillVideoAccountOperation') }}</span>
                <span class="skill-tag">{{ t('resume.skillEcommerceOperation') }}</span>
              </div>
            </div>
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.tools') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">{{ t('resume.skillProjectManagementTools') }}</span>
                <span class="skill-tag">{{ t('resume.skillDataAnalysisTools') }}</span>
                <span class="skill-tag">{{ t('resume.skillDesignTools') }}</span>
                <span class="skill-tag">{{ t('resume.skillCollaborationTools') }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 证书密码弹窗 -->
    <Teleport to="body">
      <Transition name="cert-modal">
        <div v-if="certPasswordModal" class="cert-modal-overlay" @click="closeCertPasswordModal">
          <div class="cert-modal-content cert-password-box" @click.stop>
            <h3 class="cert-password-title">{{ t('certPasswordPrompt') }}</h3>
            <input
              v-model="certPasswordInput"
              type="password"
              class="cert-password-input"
              :placeholder="t('certPasswordPrompt')"
              @keydown.enter="submitCertPassword"
            />
            <p v-if="certPasswordError" class="cert-password-err">{{ t('certPasswordError') }}</p>
            <div class="cert-password-actions">
              <button type="button" class="cert-password-btn cert-password-cancel" @click="closeCertPasswordModal">{{ t('certPasswordCancel') }}</button>
              <button type="button" class="cert-password-btn cert-password-submit" @click="submitCertPassword">{{ t('certPasswordSubmit') }}</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 证书图片弹窗 -->
    <Teleport to="body">
      <Transition name="cert-modal">
        <div v-if="certModalImage" class="cert-modal-overlay cert-modal-protect" @click="certModalImage = null" @contextmenu.prevent>
          <div class="cert-modal-content" @click.stop @contextmenu.prevent>
            <img :src="certModalImage" :alt="''" class="cert-modal-img" draggable="false" @contextmenu.prevent />
            <button type="button" class="cert-modal-close" @click="certModalImage = null" aria-label="关闭">×</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { getCurrentLanguage, t as translate } from '../i18n'
import { getCertImage, verifyCertPassword } from '../utils/certImages'
import { assetUrl } from '../utils/assetUrl'

const currentLanguage = inject('language', ref(getCurrentLanguage()))

// 个人照片：public/profile.jpg，需带 base 以支持 GitHub Pages
const photoSrc = ref(assetUrl('/profile.jpg'))
const photoError = ref(false)

// 证书弹窗（密码校验，仅内存，刷新后需重输）
const certUnlocked = ref(false)
const certModalImage = ref(null)
const certPasswordModal = ref(false)
const certPasswordInput = ref('')
const certPasswordError = ref(false)
const certPending = ref(null) // { section, index }

const openCertModal = (section, index) => {
  const src = getCertImage(section, index)
  if (!src) return
  const fullSrc = assetUrl(src)
  if (certUnlocked.value) {
    certModalImage.value = fullSrc
  } else {
    certPending.value = { section, index }
    certPasswordInput.value = ''
    certPasswordError.value = false
    certPasswordModal.value = true
  }
}

const closeCertPasswordModal = () => {
  certPasswordModal.value = false
  certPending.value = null
  certPasswordInput.value = ''
  certPasswordError.value = false
}

const submitCertPassword = () => {
  if (verifyCertPassword(certPasswordInput.value)) {
    certUnlocked.value = true
    const pending = certPending.value
    closeCertPasswordModal()
    if (pending) {
      const src = getCertImage(pending.section, pending.index)
      if (src) certModalImage.value = assetUrl(src)
    }
  } else {
    certPasswordError.value = true
  }
}

const onCertKeydown = (e) => {
  if (e.key === 'Escape') {
    certModalImage.value = null
    closeCertPasswordModal()
  }
}

onMounted(() => { window.addEventListener('keydown', onCertKeydown) })
onUnmounted(() => { window.removeEventListener('keydown', onCertKeydown) })

const t = (key) => translate(key, currentLanguage.value)

const handleLogoError = (event) => {
  event.target.style.display = 'none'
}

const parseTags = (text) => {
  if (!text) return []
  const isEnglish = currentLanguage.value === 'en'
  if (isEnglish) {
    if (text.includes(';')) {
      return text.split(';').map(tag => tag.trim()).filter(tag => tag)
    } else {
      return text.split(',').map(tag => tag.trim()).filter(tag => tag)
    }
  } else {
    let result = text.split('、').map(tag => tag.trim()).filter(tag => tag)
    const newResult = []
    result.forEach(item => {
      newResult.push(...item.split('，').map(t => t.trim()).filter(t => t))
    })
    return newResult
  }
}

// 通用关键字高亮（可根据新内容在 i18n 旁补充 keywordGroups）
const highlightKeywords = (text) => {
  if (!text) return ''
  const keywordGroups = [
    { words: ['项目管理', '項目管理', 'project management'], class: 'cyber-blue' },
    { words: ['产品设计', '產品設計', 'product design'], class: 'cyber-blue' },
    { words: ['数据分析', '數據分析', 'data analysis'], class: 'cyber-blue' },
    { words: ['用户体验', '用戶體驗', 'user experience'], class: 'cyber-blue' },
    { words: ['需求分析', '需求分析', 'requirement analysis'], class: 'cyber-blue' },
    { words: ['丰富经验', '豐富經驗', 'extensive experience'], class: 'cyber-orange' },
  ]
  let result = text
  keywordGroups.forEach(({ words, class: colorClass }) => {
    words.forEach(keyword => {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const matches = []
      let match
      const tempRegex = new RegExp(escapedKeyword, 'gi')
      while ((match = tempRegex.exec(result)) !== null) {
        matches.push({ text: match[0], index: match.index })
      }
      for (let i = matches.length - 1; i >= 0; i--) {
        const { text: matchText, index } = matches[i]
        const beforeText = result.substring(0, index)
        const afterText = result.substring(index + matchText.length)
        const lastTagOpen = beforeText.lastIndexOf('<span')
        const lastTagClose = beforeText.lastIndexOf('</span>')
        if (lastTagOpen <= lastTagClose) {
          result = beforeText + `<span class="cyber-highlight ${colorClass}">${matchText}</span>` + afterText
        }
      }
    })
  })
  return result
}
</script>

<style scoped>
.resume-page {
  min-height: 100vh;
  padding: var(--spacing-xl);
  background: transparent;
}

.resume-container {
  max-width: 1000px;
  margin: 0 auto;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.resume-header {
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
  position: relative;
}

.resume-header-inner {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.resume-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.02em;
}

.resume-subtitle {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.resume-header-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--accent);
  border-radius: 2px;
}

/* 简历头 + 个人简介 + 照片（跨栏目） */
.resume-hero {
  display: flex;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
  align-items: flex-start;
}

.resume-hero-main {
  flex: 1;
  min-width: 0;
}

.resume-hero-photo {
  flex-shrink: 0;
  position: sticky;
  top: calc(var(--spacing-md) + 60px);
}

.resume-photo-frame {
  width: 160px;
  height: 200px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-card);
}

.photo-protect {
  position: relative;
  width: 100%;
  height: 100%;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  pointer-events: auto;
}

.resume-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.resume-photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 11px;
  font-family: var(--font-sans);
}

.resume-photo-hint {
  opacity: 0.6;
}

.resume-section-hero {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .resume-hero {
    flex-direction: column;
  }

  .resume-hero-photo {
    align-self: flex-start;
    position: static;
  }
}

.resume-content {
  padding: 0 var(--spacing-xl) var(--spacing-xl);
}

.resume-section {
  margin-bottom: var(--spacing-xl);
}

.resume-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.section-num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--accent);
  opacity: 0.9;
}

.personal-info-compact {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) 0 var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  font-size: 13px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
  font-family: var(--font-sans);
}

.personal-info-compact .info-name {
  font-weight: 500;
  color: var(--text-primary);
}

.personal-info-compact .info-separator {
  color: var(--text-muted);
  opacity: 0.5;
}

.personal-info-compact .info-email {
  color: var(--accent);
}

.personal-info-compact .info-phone,
.personal-info-compact .info-location,
.personal-info-compact .info-wechat {
  color: var(--text-secondary);
}

.summary-text {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
  white-space: pre-line;
}

.summary-text .cyber-highlight {
  position: relative;
  font-weight: 600;
  padding: 2px 4px;
  border-radius: 3px;
  display: inline;
}

.summary-text .cyber-highlight.cyber-blue {
  color: var(--accent) !important;
  background: var(--accent-soft) !important;
}

.summary-text .cyber-highlight.cyber-orange {
  color: var(--accent) !important;
  background: var(--accent-soft) !important;
}

.qualifications-honors {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.qualifications-item,
.honors-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.qualifications-label,
.honors-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.design-tag {
  display: inline-block;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 20px;
  transition: all 0.25s ease;
  font-family: var(--font-sans);
}

.design-tag-accent {
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
}

.design-tag-clickable {
  cursor: pointer;
}

.design-tag-clickable:hover {
  filter: brightness(1.05);
}

.design-tag-muted {
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.skill-category {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.skill-category-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.skill-tag {
  padding: 5px 12px;
  font-size: 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  transition: all 0.25s ease;
}

.skill-tag:hover {
  background: var(--accent-soft);
  border-color: var(--accent-border);
  color: var(--accent);
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.experience-item {
  padding: var(--spacing-lg);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all 0.25s ease;
}

.experience-item:hover {
  border-color: var(--border-hover);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xs);
}

.experience-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.experience-period {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  white-space: nowrap;
}

.experience-company {
  font-size: 14px;
  color: var(--accent);
  margin-bottom: var(--spacing-sm);
}

.experience-duties {
  margin: 0;
  padding-left: var(--spacing-lg);
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.experience-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
}

.tech-tag {
  padding: 4px 10px;
  font-size: 11px;
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  border-radius: 16px;
  color: var(--accent);
  font-family: var(--font-sans);
  transition: all 0.2s ease;
}

.education-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

@media (max-width: 768px) {
  .education-list {
    grid-template-columns: 1fr;
  }
}

.education-item {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all 0.25s ease;
}

.education-item:hover {
  border-color: var(--border-hover);
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.education-header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.education-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.education-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.education-period {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  white-space: nowrap;
}

.education-school {
  font-size: 13px;
  color: var(--accent);
  margin-bottom: 2px;
}

.education-major {
  font-size: 13px;
  color: var(--text-secondary);
}

.education-rank {
  font-size: 11px;
  color: var(--text-muted);
  margin-left: 1.5em; /* ~4-6 空格 */
}

/* 证书弹窗 */
.cert-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: pointer;
}

.cert-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
}

.cert-modal-img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
}

.cert-modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 24px;
  line-height: 1;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.cert-modal-close:hover {
  background: rgba(255, 255, 255, 0.35);
}

.cert-modal-enter-active,
.cert-modal-leave-active {
  transition: opacity 0.2s ease;
}

.cert-modal-enter-from,
.cert-modal-leave-to {
  opacity: 0;
}

/* 证书密码弹窗 */
.cert-password-box {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  min-width: 280px;
}

.cert-password-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md);
}

.cert-password-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.cert-password-input:focus {
  outline: none;
  border-color: var(--accent-border);
}

.cert-password-err {
  font-size: 12px;
  color: var(--accent);
  margin: 0 0 var(--spacing-sm);
}

.cert-password-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  margin-top: var(--spacing-md);
}

.cert-password-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 13px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.cert-password-cancel {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.cert-password-cancel:hover {
  border-color: var(--border-hover);
}

.cert-password-submit {
  background: var(--accent);
  border: 1px solid var(--accent);
  color: #fff;
}

.cert-password-submit:hover {
  filter: brightness(1.1);
}
</style>
