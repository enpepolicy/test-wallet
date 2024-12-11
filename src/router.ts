import { createRouter, createWebHistory, NavigationGuardNext } from 'vue-router'
import { h, resolveComponent } from 'vue'

const activeLocales = ['en', 'fr']
const defaultLocale = activeLocales[0]

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppIndex.vue'),
    meta: {
      title: 'Wallet Asset Viewer'
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        beforeEnter: (to: any, from: any, next: NavigationGuardNext) => {
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
