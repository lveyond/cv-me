<!--
  QT 专用版本 - 备份
  量化交易 / 区块链相关简历内容
  已由 src/views/ResumePage.vue 新版通用简历替代
-->
<template>
  <div class="resume-page">
    <div class="resume-container">
      <div class="resume-header">
        <h1 class="resume-title">{{ t('resume.title') }}</h1>
      </div>
      
      <div class="resume-content">
        <!-- 个人信息 - 弱化显示 -->
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

        <!-- 个人简介 -->
        <section class="resume-section">
          <h2 class="section-title">{{ t('resume.summary') }}</h2>
          <p class="summary-text" v-html="highlightKeywords(t('resume.summaryText'))"></p>
        </section>

        <!-- 专业资质和获奖荣誉 -->
        <section class="resume-section">
          <div class="qualifications-honors">
            <div class="qualifications-item">
              <span class="qualifications-label">{{ t('resume.qualifications') }}：</span>
              <div class="tags-container">
                <span 
                  v-for="(tag, index) in parseTags(t('resume.qualificationsList'))" 
                  :key="index" 
                  class="cyber-tag cyber-tag-blue"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="honors-item">
              <span class="honors-label">{{ t('resume.honors') }}：</span>
              <div class="tags-container">
                <span 
                  v-for="(tag, index) in parseTags(t('resume.honorsList'))" 
                  :key="index" 
                  class="cyber-tag cyber-tag-orange"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 教育经历 -->
        <section class="resume-section">
          <h2 class="section-title">{{ t('resume.education') }}</h2>
          <div class="education-list">
            <div class="education-item">
              <div class="education-header">
                <div class="education-header-left">
                  <img v-if="t('resume.edu1Logo')" :src="t('resume.edu1Logo')" :alt="t('resume.edu1School')" class="education-logo" @error="handleLogoError" />
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
                  <img v-if="t('resume.edu2Logo')" :src="t('resume.edu2Logo')" :alt="t('resume.edu2School')" class="education-logo education-logo-westminster" @error="handleLogoError" />
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
                  <img v-if="t('resume.edu3Logo')" :src="t('resume.edu3Logo')" :alt="t('resume.edu3School')" class="education-logo" @error="handleLogoError" />
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
                  <img v-if="t('resume.edu4Logo')" :src="t('resume.edu4Logo')" :alt="t('resume.edu4School')" class="education-logo" @error="handleLogoError" />
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
          <h2 class="section-title">{{ t('resume.experience') }}</h2>
          <div class="experience-list">
            <div class="experience-item">
              <div class="experience-header">
                <h3 class="experience-title">{{ t('resume.exp1Title') }}</h3>
                <span class="experience-period" v-if="t('resume.exp1Period')">{{ t('resume.exp1Period') }}</span>
              </div>
              <div class="experience-company" v-if="t('resume.exp1Company')">{{ t('resume.exp1Company') }}</div>
              <ul class="experience-duties">
                <li v-if="t('resume.exp1Duty1')">{{ t('resume.exp1Duty1') }}</li>
                <li v-if="t('resume.exp1Duty2')">{{ t('resume.exp1Duty2') }}</li>
                <li v-if="t('resume.exp1Duty3')">{{ t('resume.exp1Duty3') }}</li>
              </ul>
              <div class="experience-tech" v-if="t('resume.exp1Tags')">
                <span class="tech-tag" v-for="tag in t('resume.exp1Tags').split(',')" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="experience-item">
              <div class="experience-header">
                <h3 class="experience-title">{{ t('resume.exp2Title') }}</h3>
                <span class="experience-period" v-if="t('resume.exp2Period')">{{ t('resume.exp2Period') }}</span>
              </div>
              <div class="experience-company" v-if="t('resume.exp2Company')">{{ t('resume.exp2Company') }}</div>
              <ul class="experience-duties">
                <li v-if="t('resume.exp2Duty1')">{{ t('resume.exp2Duty1') }}</li>
                <li v-if="t('resume.exp2Duty2')">{{ t('resume.exp2Duty2') }}</li>
                <li v-if="t('resume.exp2Duty3')">{{ t('resume.exp2Duty3') }}</li>
              </ul>
              <div class="experience-tech" v-if="t('resume.exp2Tags')">
                <span class="tech-tag" v-for="tag in t('resume.exp2Tags').split(',')" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="experience-item">
              <div class="experience-header">
                <h3 class="experience-title">{{ t('resume.exp3Title') }}</h3>
                <span class="experience-period" v-if="t('resume.exp3Period')">{{ t('resume.exp3Period') }}</span>
              </div>
              <div class="experience-company" v-if="t('resume.exp3Company')">{{ t('resume.exp3Company') }}</div>
              <ul class="experience-duties">
                <li v-if="t('resume.exp3Duty1')">{{ t('resume.exp3Duty1') }}</li>
                <li v-if="t('resume.exp3Duty2')">{{ t('resume.exp3Duty2') }}</li>
                <li v-if="t('resume.exp3Duty3')">{{ t('resume.exp3Duty3') }}</li>
              </ul>
              <div class="experience-tech" v-if="t('resume.exp3Tags')">
                <span class="tech-tag" v-for="tag in t('resume.exp3Tags').split(',')" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="experience-item">
              <div class="experience-header">
                <h3 class="experience-title">{{ t('resume.exp4Title') }}</h3>
                <span class="experience-period" v-if="t('resume.exp4Period')">{{ t('resume.exp4Period') }}</span>
              </div>
              <div class="experience-company" v-if="t('resume.exp4Company')">{{ t('resume.exp4Company') }}</div>
              <ul class="experience-duties">
                <li v-if="t('resume.exp4Duty1')">{{ t('resume.exp4Duty1') }}</li>
                <li v-if="t('resume.exp4Duty2')">{{ t('resume.exp4Duty2') }}</li>
                <li v-if="t('resume.exp4Duty3')">{{ t('resume.exp4Duty3') }}</li>
              </ul>
              <div class="experience-tech" v-if="t('resume.exp4Tags')">
                <span class="tech-tag" v-for="tag in t('resume.exp4Tags').split(',')" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="experience-item">
              <div class="experience-header">
                <h3 class="experience-title">{{ t('resume.exp5Title') }}</h3>
                <span class="experience-period" v-if="t('resume.exp5Period')">{{ t('resume.exp5Period') }}</span>
              </div>
              <div class="experience-company" v-if="t('resume.exp5Company')">{{ t('resume.exp5Company') }}</div>
              <ul class="experience-duties">
                <li v-if="t('resume.exp5Duty1')">{{ t('resume.exp5Duty1') }}</li>
                <li v-if="t('resume.exp5Duty2')">{{ t('resume.exp5Duty2') }}</li>
                <li v-if="t('resume.exp5Duty3')">{{ t('resume.exp5Duty3') }}</li>
              </ul>
              <div class="experience-tech" v-if="t('resume.exp5Tags')">
                <span class="tech-tag" v-for="tag in t('resume.exp5Tags').split(',')" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 技能 -->
        <section class="resume-section">
          <h2 class="section-title">{{ t('resume.skills') }}</h2>
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
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { getCurrentLanguage, t as translate } from '../../i18n/qt'

const currentLanguage = inject('language', ref(getCurrentLanguage()))

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

const highlightKeywords = (text) => {
  if (!text) return ''
  const keywordGroups = [
    { words: ['产品需求调研', '產品需求調研', 'product requirement research'], class: 'cyber-blue' },
    { words: ['设计开发', '設計開發', 'design and development'], class: 'cyber-blue' },
    { words: ['运营推广', '運營推廣', 'operations and promotion'], class: 'cyber-blue' },
    { words: ['项目管理', '項目管理', 'project management'], class: 'cyber-blue' },
    { words: ['产品运营', '產品運營', 'product operations'], class: 'cyber-blue' },
    { words: ['渠道推广', '渠道推廣', 'channel promotion'], class: 'cyber-blue' },
    { words: ['市场营销', '市場營銷', 'marketing'], class: 'cyber-blue' },
    { words: ['数据分析', '數據分析', 'data analysis'], class: 'cyber-blue' },
    { words: ['战略规划', '戰略規劃', 'strategic planning'], class: 'cyber-blue' },
    { words: ['数据资产管理', '數據資產管理', 'data asset management'], class: 'cyber-blue' },
    { words: ['可视化中心', '可視化中心', 'visualization centers'], class: 'cyber-blue' },
    { words: ['ERP'], class: 'cyber-blue' },
    { words: ['CRM'], class: 'cyber-blue' },
    { words: ['Dapp', 'DApp'], class: 'cyber-blue' },
    { words: ['营销工具应用', '營銷工具應用', 'marketing tool applications'], class: 'cyber-pink' },
    { words: ['电商应用', '電商應用', 'e-commerce applications'], class: 'cyber-pink' },
    { words: ['医疗健康', '醫療健康', 'healthcare'], class: 'cyber-pink' },
    { words: ['制造业', '製造業', 'manufacturing'], class: 'cyber-pink' },
    { words: ['区块链', '區塊鏈', 'blockchain'], class: 'cyber-pink' },
    { words: ['农业', '農業', 'agriculture'], class: 'cyber-pink' },
    { words: ['外贸', '外貿', 'foreign trade'], class: 'cyber-pink' },
    { words: ['丰富经验', '豐富經驗', 'extensive experience'], class: 'cyber-orange' },
    { words: ['实践与总结', '實踐與總結', 'practice and insights'], class: 'cyber-orange' },
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
.resume-page { min-height: 100vh; padding: var(--spacing-xl); background: var(--bg-primary); }
.resume-container { max-width: 900px; margin: 0 auto; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
.resume-header { padding: var(--spacing-xl); border-bottom: 1px solid var(--border-color); }
.resume-title { font-family: var(--font-mono); font-size: 24px; font-weight: 600; color: var(--text-primary); margin: 0; }
.resume-content { padding: var(--spacing-xl); }
.resume-section { margin-bottom: var(--spacing-xl); }
.resume-section:last-child { margin-bottom: 0; }
.section-title { font-family: var(--font-mono); font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: var(--spacing-md); padding-bottom: var(--spacing-sm); border-bottom: 2px solid var(--border-color); }
.personal-info-compact { display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm) 0; margin-bottom: var(--spacing-lg); font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border-color); }
.personal-info-compact .info-name { font-weight: 500; color: var(--text-primary); }
.personal-info-compact .info-separator { color: var(--text-muted); opacity: 0.5; }
.personal-info-compact .info-email { color: var(--text-link); }
.personal-info-compact .info-phone, .personal-info-compact .info-location, .personal-info-compact .info-wechat { color: var(--text-secondary); }
.summary-text { font-size: 14px; line-height: 1.8; color: var(--text-secondary); white-space: pre-line; }
.summary-text .cyber-highlight { position: relative; font-weight: 600; padding: 2px 4px; border-radius: 3px; display: inline; }
.summary-text .cyber-highlight.cyber-blue { color: #5B9BD5 !important; background: rgba(91, 155, 213, 0.15) !important; }
.summary-text .cyber-highlight.cyber-pink { color: #C77DFF !important; background: rgba(199, 125, 255, 0.15) !important; }
.summary-text .cyber-highlight.cyber-orange { color: #F4A460 !important; background: rgba(244, 164, 96, 0.15) !important; }
.qualifications-honors { display: flex; flex-direction: column; gap: var(--spacing-md); }
.qualifications-item, .honors-item { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.qualifications-label, .honors-label { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
.tags-container { display: flex; flex-wrap: wrap; gap: var(--spacing-xs); }
.cyber-tag { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 500; border-radius: var(--radius-sm); border: 1px solid; transition: all 0.2s; font-family: var(--font-mono); }
.cyber-tag-blue { color: #5B9BD5; background: rgba(91, 155, 213, 0.1); border-color: rgba(91, 155, 213, 0.4); }
.cyber-tag-orange { color: #F4A460; background: rgba(244, 164, 96, 0.1); border-color: rgba(244, 164, 96, 0.4); }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg); }
.skill-category { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.skill-category-title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: var(--spacing-xs); }
.skill-tags { display: flex; flex-wrap: wrap; gap: var(--spacing-xs); }
.skill-tag { padding: 4px 10px; font-size: 12px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); color: var(--text-secondary); font-family: var(--font-mono); transition: all 0.2s; }
.skill-tag:hover { background: var(--bg-hover); border-color: var(--tech-primary); color: var(--text-primary); }
.experience-list { display: flex; flex-direction: column; gap: var(--spacing-lg); }
.experience-item { padding: var(--spacing-md); background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); }
.experience-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--spacing-xs); }
.experience-title { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0; }
.experience-period { font-size: 12px; color: var(--text-muted); font-family: var(--font-mono); white-space: nowrap; }
.experience-company { font-size: 14px; color: var(--text-link); margin-bottom: var(--spacing-sm); }
.experience-duties { margin: 0; padding-left: var(--spacing-lg); color: var(--text-secondary); font-size: 14px; line-height: 1.8; }
.experience-tech { display: flex; flex-wrap: wrap; gap: var(--spacing-xs); margin-top: var(--spacing-sm); padding-top: var(--spacing-sm); border-top: 1px solid var(--border-color); }
.tech-tag { padding: 3px 8px; font-size: 11px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: var(--radius-sm); color: var(--tech-primary); font-family: var(--font-mono); }
.education-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--spacing-sm); }
@media (max-width: 768px) { .education-list { grid-template-columns: 1fr; } }
.education-item { padding: var(--spacing-sm) var(--spacing-md); background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); }
.education-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
.education-header-left { display: flex; align-items: center; gap: var(--spacing-sm); }
.education-logo { width: 24px; height: 24px; object-fit: contain; border-radius: var(--radius-sm); }
.education-logo-westminster { filter: brightness(0) invert(1); }
.education-title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin: 0; }
.education-period { font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); white-space: nowrap; }
.education-school { font-size: 13px; color: var(--text-link); margin-bottom: 2px; }
.education-major { font-size: 13px; color: var(--text-secondary); }
.education-rank { font-size: 11px; color: var(--text-muted); margin-left: 1.5em; }
</style>
