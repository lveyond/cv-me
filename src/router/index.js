import { createRouter, createWebHashHistory } from 'vue-router'
import ResumePage from '../views/ResumePage.vue'
import ResumePageMosaic from '../views/ResumePage.mosaic.vue'
import ResumePageQt from '../views/_archive/ResumePage.qt.vue'

const routes = [
  {
    path: '/',
    name: 'Resume',
    component: ResumePage
  },
  {
    path: '/mosaic',
    name: 'ResumeMosaic',
    component: ResumePageMosaic
  },
  {
    path: '/resume-qt',
    name: 'ResumeQt',
    component: ResumePageQt
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
