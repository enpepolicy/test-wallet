import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/pages/Index.vue'

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: 'ERA2140 Wallet Test',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
