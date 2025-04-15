import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarketView from '@/views/MarketView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import TransactionHistoryView from '@/views/TransactionHistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/market',
      name: 'market',
      component: MarketView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionHistoryView,
    },
  ],
})

export default router
