import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ResetView from '@/views/ResetView.vue'
import AccountView from '@/views/AccountView.vue'
import RechargeView from '@/views/RechargeView.vue'
import TransferView from '@/views/Transfer/TransferView.vue'
import ReportView from '@/views/Report/ReportView.vue'
import CommunityView from '@/views/Community/CommunityView.vue'
import SearchView from '@/views/Search/SearchView.vue'
import SseView from '@/views/Sse/SseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/account'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/reset',
      name: 'Reset',
      component: ResetView
    },
    {
      path: '/account',
      name: 'Account',
      component: AccountView,
      meta: {
        aside: true
      }
    },
    {
      path: '/recharge',
      name: 'Recharge',
      component: RechargeView,
      meta: {
        aside: true
      }
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: TransferView
    },
    {
      path: '/report',
      name: 'Report',
      component: ReportView
    },
    {
      path: '/community',
      name: 'Community',
      component: CommunityView
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchView
    },
    {
      path: '/project',
      name: 'project',
      component: SseView
    }
  ]
})

export default router
