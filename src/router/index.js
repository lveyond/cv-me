import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Trading from '../views/Trading.vue'
import Strategies from '../views/Strategies.vue'
import Assets from '../views/Assets.vue'
import Analytics from '../views/Analytics.vue'
import Orders from '../views/Orders.vue'
import Community from '../views/Community.vue'
import Game from '../views/Game.vue'
import ResumePage from '../views/ResumePage.vue'

const routes = [{
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        alias: '/dashboard' // 添加别名，/dashboard 也会指向 Dashboard
    },
    {
        path: '/trading',
        name: 'Trading',
        component: Trading
    },
    {
        path: '/strategies',
        name: 'Strategies',
        component: Strategies
    },
    {
        path: '/assets',
        name: 'Assets',
        component: Assets
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: Analytics
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders
    },
    {
        path: '/community',
        name: 'Community',
        component: Community
    },
    {
        path: '/game',
        name: 'Game',
        component: Game
    },
    {
        path: '/resume',
        name: 'Resume',
        component: ResumePage
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL), // 使用哈希路由，避免部署后刷新404问题
    routes
})

// 确保根路径正确加载 Dashboard
router.beforeEach((to, from, next) => {
    // 如果访问根路径且不是 Dashboard，重定向到 Dashboard
    if (to.path === '/' && to.name !== 'Dashboard') {
        next({ name: 'Dashboard', replace: true })
        return
    }
    next()
})

export default router