<template>
  <div v-if="show" class="resume-modal-overlay" @click="closeModal">
    <div class="resume-modal" @click.stop>
      <div class="resume-header">
        <h1 class="resume-title">{{ t('resume.title') }}</h1>
        <button class="close-btn" @click="closeModal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="resume-content">
        <!-- 个人信息 - 弱化显示 -->
        <div class="personal-info-compact">
          <span class="info-name">{{ t('resume.name') }}</span>
          <span class="info-separator">|</span>
          <span class="info-email">{{ t('resume.email') }}</span>
          <span class="info-separator">|</span>
          <span class="info-location">{{ t('resume.location') }}</span>
          <span class="info-separator">|</span>
          <span class="info-wechat">{{ t('resume.wechatLabel') }} {{ t('resume.wechat') }}</span>
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
import { ref, inject, computed } from 'vue'
import { getCurrentLanguage, t as translate } from '../i18n'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const currentLanguage = inject('language', ref(getCurrentLanguage()))

const t = (key) => translate(key, currentLanguage.value)

const closeModal = () => {
  emit('close')
}

const handleLogoError = (event) => {
  // 如果logo加载失败，隐藏图片
  event.target.style.display = 'none'
}

// 赛博朋克荧光色高亮关键字
const highlightKeywords = (text) => {
  if (!text) return ''
  
  // 定义关键字和对应的颜色类（按长度从长到短排序）
  const keywordGroups = [
    // 技能类 - 科技蓝
    { words: ['产品需求调研', '產品需求調研', 'product requirement research'], class: 'cyber-blue' },
    { words: ['设计开发', '設計開發', 'design and development'], class: 'cyber-blue' },
    { words: ['运营推广', '運營推廣', 'operations and promotion'], class: 'cyber-blue' },
    { words: ['项目管理', '項目管理', 'project management'], class: 'cyber-blue' },
    { words: ['产品运营', '產品運營', 'product operations'], class: 'cyber-blue' },
    { words: ['渠道推广', '渠道推廣', 'channel promotion'], class: 'cyber-blue' },
    { words: ['市场营销', '市場營銷', 'marketing'], class: 'cyber-blue' },
    { words: ['数据分析', '數據分析', 'data analysis'], class: 'cyber-blue' },
    { words: ['战略规划', '戰略規劃', 'strategic planning'], class: 'cyber-blue' },
    
    // 技术类 - 科技蓝（与技术相关也用蓝色）
    { words: ['数据资产管理', '數據資產管理', 'data asset management'], class: 'cyber-blue' },
    { words: ['可视化中心', '可視化中心', 'visualization centers'], class: 'cyber-blue' },
    { words: ['ERP'], class: 'cyber-blue' },
    { words: ['CRM'], class: 'cyber-blue' },
    { words: ['Dapp', 'DApp'], class: 'cyber-blue' },
    
    // 应用类 - 紫粉色
    { words: ['营销工具应用', '營銷工具應用', 'marketing tool applications'], class: 'cyber-pink' },
    { words: ['电商应用', '電商應用', 'e-commerce applications'], class: 'cyber-pink' },
    
    // 行业类 - 紫粉色
    { words: ['医疗健康', '醫療健康', 'healthcare'], class: 'cyber-pink' },
    { words: ['制造业', '製造業', 'manufacturing'], class: 'cyber-pink' },
    { words: ['区块链', '區塊鏈', 'blockchain'], class: 'cyber-pink' },
    { words: ['农业', '農業', 'agriculture'], class: 'cyber-pink' },
    { words: ['外贸', '外貿', 'foreign trade'], class: 'cyber-pink' },
    
    // 经验类 - 橙色
    { words: ['丰富经验', '豐富經驗', 'extensive experience'], class: 'cyber-orange' },
    { words: ['实践与总结', '實踐與總結', 'practice and insights'], class: 'cyber-orange' },
  ]
  
  let result = text
  
  // 按组处理关键字
  keywordGroups.forEach(({ words, class: colorClass }) => {
    words.forEach(keyword => {
      // 转义特殊字符
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(escapedKeyword, 'gi')
      
      // 收集所有匹配项
      const matches = []
      let match
      const tempRegex = new RegExp(escapedKeyword, 'gi')
      
      while ((match = tempRegex.exec(result)) !== null) {
        matches.push({
          text: match[0],
          index: match.index
        })
      }
      
      // 从后往前替换，避免索引偏移
      for (let i = matches.length - 1; i >= 0; i--) {
        const { text: matchText, index } = matches[i]
        const beforeText = result.substring(0, index)
        const afterText = result.substring(index + matchText.length)
        
        // 检查是否在HTML标签内
        const lastTagOpen = beforeText.lastIndexOf('<span')
        const lastTagClose = beforeText.lastIndexOf('</span>')
        
        // 如果不在标签内，则替换
        if (lastTagOpen <= lastTagClose) {
          result = beforeText + 
            `<span class="cyber-highlight ${colorClass}">${matchText}</span>` + 
            afterText
        }
      }
    })
  })
  
  return result
}

// 将文本转换为标签数组（用于专业资质和获奖荣誉）
const parseTags = (text) => {
  if (!text) return []
  // 根据语言自动选择分隔符
  const isEnglish = currentLanguage.value === 'en'
  
  if (isEnglish) {
    // 英文模式：智能选择分隔符
    // 如果包含分号，优先使用分号（获奖荣誉）
    // 否则使用逗号（专业资质）
    if (text.includes(';')) {
      return text.split(';').map(tag => tag.trim()).filter(tag => tag)
    } else {
      return text.split(',').map(tag => tag.trim()).filter(tag => tag)
    }
  } else {
    // 中文模式：使用顿号和中文逗号分割
    let result = text.split('、').map(tag => tag.trim()).filter(tag => tag)
    const newResult = []
    result.forEach(item => {
      newResult.push(...item.split('，').map(t => t.trim()).filter(t => t))
    })
    return newResult
  }
}
</script>

<style scoped>
.resume-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  overflow-y: auto;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.resume-modal {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.resume-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  background: var(--bg-secondary);
  z-index: 10;
}

.resume-title {
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.close-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--bg-hover);
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.resume-content {
  padding: var(--spacing-xl);
}

.resume-section {
  margin-bottom: var(--spacing-xl);
}

.resume-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--border-color);
}

/* 个人信息 - 紧凑弱化样式 */
.personal-info-compact {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  margin-bottom: var(--spacing-lg);
  font-size: 12px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
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
  color: var(--text-link);
}

.personal-info-compact .info-location,
.personal-info-compact .info-wechat {
  color: var(--text-secondary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.info-label {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.info-value {
  font-size: 14px;
  color: var(--text-primary);
}

.info-link {
  font-size: 14px;
  color: var(--text-link);
  text-decoration: none;
  transition: color 0.2s;
}

.info-link:hover {
  color: #79c0ff;
  text-decoration: underline;
}

.summary-text {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
  white-space: pre-line;
}

/* 赛博朋克高亮样式（无发光效果） */
.summary-text .cyber-highlight {
  position: relative;
  font-weight: 600;
  padding: 2px 4px;
  border-radius: 3px;
  display: inline;
}

.summary-text .cyber-highlight.cyber-blue {
  color: #5B9BD5 !important;
  background: rgba(91, 155, 213, 0.15) !important;
}

.summary-text .cyber-highlight.cyber-green {
  color: #5B9BD5 !important;
  background: rgba(91, 155, 213, 0.15) !important;
}

.summary-text .cyber-highlight.cyber-pink {
  color: #C77DFF !important;
  background: rgba(199, 125, 255, 0.15) !important;
}

.summary-text .cyber-highlight.cyber-purple {
  color: #C77DFF !important;
  background: rgba(199, 125, 255, 0.15) !important;
}

.summary-text .cyber-highlight.cyber-orange {
  color: #F4A460 !important;
  background: rgba(244, 164, 96, 0.15) !important;
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

.cyber-tag {
  display: inline-block;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  border-radius: var(--radius-sm);
  border: 1px solid;
  transition: all 0.2s;
  font-family: var(--font-mono);
}

.cyber-tag-blue {
  color: #5B9BD5;
  background: rgba(91, 155, 213, 0.1);
  border-color: rgba(91, 155, 213, 0.4);
}

.cyber-tag-blue:hover {
  background: rgba(91, 155, 213, 0.15);
  border-color: rgba(91, 155, 213, 0.5);
}

.cyber-tag-purple {
  color: #C77DFF;
  background: rgba(199, 125, 255, 0.1);
  border-color: rgba(199, 125, 255, 0.4);
}

.cyber-tag-purple:hover {
  background: rgba(199, 125, 255, 0.15);
  border-color: rgba(199, 125, 255, 0.5);
}

.cyber-tag-orange {
  color: #F4A460;
  background: rgba(244, 164, 96, 0.1);
  border-color: rgba(244, 164, 96, 0.4);
}

.cyber-tag-orange:hover {
  background: rgba(244, 164, 96, 0.15);
  border-color: rgba(244, 164, 96, 0.5);
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
  padding: 4px 10px;
  font-size: 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  transition: all 0.2s;
}

.skill-tag:hover {
  background: var(--bg-hover);
  border-color: var(--tech-primary);
  color: var(--text-primary);
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.experience-item {
  padding: var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xs);
}

.experience-title {
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
  color: var(--text-link);
  margin-bottom: var(--spacing-sm);
}

.experience-duties {
  margin: 0;
  padding-left: var(--spacing-lg);
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.experience-duties li {
  margin-bottom: var(--spacing-xs);
}

.experience-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.project-item {
  padding: var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.project-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.project-link {
  color: var(--text-link);
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.project-link:hover {
  color: #79c0ff;
}

.project-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-sm);
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tech-tag {
  padding: 3px 8px;
  font-size: 11px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: var(--radius-sm);
  color: var(--tech-primary);
  font-family: var(--font-mono);
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
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
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

.education-logo-westminster {
  filter: brightness(0) invert(1);
}

.education-title {
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
  color: var(--text-link);
  margin-bottom: 2px;
}

.education-major {
  font-size: 13px;
  color: var(--text-secondary);
}

/* 滚动条样式 */
.resume-modal::-webkit-scrollbar {
  width: 8px;
}

.resume-modal::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

.resume-modal::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.resume-modal::-webkit-scrollbar-thumb:hover {
  background: var(--border-hover);
}
</style>