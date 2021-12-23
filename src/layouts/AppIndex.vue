<template>
  <app-nav />

  <app-view />

  <app-footer />
</template>

<script lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import AppNav from '@/layouts/AppNav.vue'
import AppView from '@/layouts/AppView.vue'
import AppFooter from '@/layouts/AppFooter.vue'

export default {
  components: {
    AppNav,
    AppView,
    AppFooter
  },
  setup() {
    const route = useRoute()
    const i18n = useI18n()

    function setLocale() {
      if (route.params.locale) {
        i18n.locale.value = String(route.params.locale)
      }
    }

    onMounted(setLocale)
  }
}
</script>
