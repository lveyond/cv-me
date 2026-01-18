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
        <!-- 个人信息 -->
        <section class="resume-section">
          <h2 class="section-title">{{ t('resume.personalInfo') }}</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">{{ t('resume.name') }}</span>
              <span class="info-value">lveyond</span>
            </div>
            <div class="info-item">
              <span class="info-label">{{ t('resume.role') }}</span>
              <span class="info-value">{{ t('resume.roleValue') }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">{{ t('resume.location') }}</span>
              <span class="info-value">{{ t('resume.locationValue') }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">{{ t('resume.email') }}</span>
              <span class="info-value mono">lveyond@example.com</span>
            </div>
            <div class="info-item">
              <span class="info-label">{{ t('resume.github') }}</span>
              <a href="https://github.com/lveyond" target="_blank" rel="noopener noreferrer" class="info-link">github.com/lveyond</a>
            </div>
          </div>
        </section>

        <!-- 个人简介 -->
        <section class="resume-section">
          <h2 class="section-title">{{ t('resume.summary') }}</h2>
          <p class="summary-text">{{ t('resume.summaryText') }}</p>
        </section>

        <!-- 技能 -->
        <section class="resume-section">
          <h2 class="section-title">{{ t('resume.skills') }}</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.frontend') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">Vue.js</span>
                <span class="skill-tag">React</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">HTML/CSS</span>
                <span class="skill-tag">Vite</span>
                <span class="skill-tag">Webpack</span>
              </div>
            </div>
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.backend') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Python</span>
                <span class="skill-tag">Go</span>
                <span class="skill-tag">RESTful API</span>
                <span class="skill-tag">GraphQL</span>
              </div>
            </div>
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.blockchain') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">Web3.js</span>
                <span class="skill-tag">Ethers.js</span>
                <span class="skill-tag">Solidity</span>
                <span class="skill-tag">Smart Contracts</span>
                <span class="skill-tag">DeFi</span>
                <span class="skill-tag">DApp Development</span>
              </div>
            </div>
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.trading') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">Quantitative Trading</span>
                <span class="skill-tag">Algorithm Trading</span>
                <span class="skill-tag">Strategy Development</span>
                <span class="skill-tag">Risk Management</span>
                <span class="skill-tag">Backtesting</span>
              </div>
            </div>
            <div class="skill-category">
              <h3 class="skill-category-title">{{ t('resume.tools') }}</h3>
              <div class="skill-tags">
                <span class="skill-tag">Git</span>
                <span class="skill-tag">Docker</span>
                <span class="skill-tag">Linux</span>
                <span class="skill-tag">CI/CD</span>
                <span class="skill-tag">AWS</span>
                <span class="skill-tag">MongoDB</span>
                <span class="skill-tag">PostgreSQL</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 工作经历 -->
        <section class="resume-section">
          <h2 class="section-title">{{ t('resume.experience') }}</h2>
          <div class="experience-list">
            <div class="experience-item">
              <div class="experience-header">
                <h3 class="experience-title">{{ t('resume.exp1Title') }}</h3>
                <span class="experience-period">{{ t('resume.exp1Period') }}</span>
              </div>
              <div class="experience-company">{{ t('resume.exp1Company') }}</div>
              <ul class="experience-duties">
                <li>{{ t('resume.exp1Duty1') }}</li>
                <li>{{ t('resume.exp1Duty2') }}</li>
                <li>{{ t('resume.exp1Duty3') }}</li>
                <li>{{ t('resume.exp1Duty4') }}</li>
              </ul>
            </div>
            <div class="experience-item">
              <div class="experience-header">
                <h3 class="experience-title">{{ t('resume.exp2Title') }}</h3>
                <span class="experience-period">{{ t('resume.exp2Period') }}</span>
              </div>
              <div class="experience-company">{{ t('resume.exp2Company') }}</div>
              <ul class="experience-duties">
                <li>{{ t('resume.exp2Duty1') }}</li>
                <li>{{ t('resume.exp2Duty2') }}</li>
                <li>{{ t('resume.exp2Duty3') }}</li>
              </ul>
            </div>
            <div class="experience-item">
              <div class="experience-header">
                <h3 class="experience-title">{{ t('resume.exp3Title') }}</h3>
                <span class="experience-period">{{ t('resume.exp3Period') }}</span>
              </div>
              <div class="experience-company">{{ t('resume.exp3Company') }}</div>
              <ul class="experience-duties">
                <li>{{ t('resume.exp3Duty1') }}</li>
                <li>{{ t('resume.exp3Duty2') }}</li>
                <li>{{ t('resume.exp3Duty3') }}</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 项目经验 -->
        <section class="resume-section">
          <h2 class="section-title">{{ t('resume.projects') }}</h2>
          <div class="project-list">
            <div class="project-item">
              <div class="project-header">
                <h3 class="project-title">QuantDApp</h3>
                <a href="https://github.com/lveyond" target="_blank" rel="noopener noreferrer" class="project-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
              <p class="project-desc">{{ t('resume.project1Desc') }}</p>
              <div class="project-tech">
                <span class="tech-tag">Vue.js</span>
                <span class="tech-tag">Web3</span>
                <span class="tech-tag">ECharts</span>
                <span class="tech-tag">DeFi</span>
              </div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <h3 class="project-title">{{ t('resume.project2Title') }}</h3>
              </div>
              <p class="project-desc">{{ t('resume.project2Desc') }}</p>
              <div class="project-tech">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">Pandas</span>
                <span class="tech-tag">NumPy</span>
                <span class="tech-tag">Backtesting</span>
              </div>
            </div>
            <div class="project-item">
              <div class="project-header">
                <h3 class="project-title">{{ t('resume.project3Title') }}</h3>
              </div>
              <p class="project-desc">{{ t('resume.project3Desc') }}</p>
              <div class="project-tech">
                <span class="tech-tag">React</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">Ethereum</span>
                <span class="tech-tag">Smart Contracts</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 教育背景 -->
        <section class="resume-section">
          <h2 class="section-title">{{ t('resume.education') }}</h2>
          <div class="education-item">
            <div class="education-header">
              <h3 class="education-title">{{ t('resume.eduTitle') }}</h3>
              <span class="education-period">{{ t('resume.eduPeriod') }}</span>
            </div>
            <div class="education-school">{{ t('resume.eduSchool') }}</div>
            <div class="education-major">{{ t('resume.eduMajor') }}</div>
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

.education-item {
  padding: var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xs);
}

.education-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.education-period {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  white-space: nowrap;
}

.education-school {
  font-size: 14px;
  color: var(--text-link);
  margin-bottom: var(--spacing-xs);
}

.education-major {
  font-size: 14px;
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