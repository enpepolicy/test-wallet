import { createRouter, createWebHistory } from 'vue-router'
import { h, resolveComponent } from 'vue'

const activeLocales = ['en', 'fr']
const defaultLocale = activeLocales[0]

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppIndex.vue'),
    meta: {
      title: 'ERA2140 Wallet Test'
    },
    children: [
      {
        path: '',
        redirect: defaultLocale
      },
      {
        path: ':locale?',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        beforeEnter: (to: any, from: any, next: any) => {
          if (activeLocales.includes(to.params.locale)) {
            next()
          } else {
            next({ path: `${defaultLocale}/not-found` })
          }
        },
        children: [
          {
            path: '',
            name: 'HomeSection',
            component: () => import('@/views/HomeSection.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
