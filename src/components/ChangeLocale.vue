<template lang="">
  <div class="mx-auto md:pt-16">
    <p class="text-blue-400 font-bold pb-8 lg:pb-1 text-center">
      {{ t('components.change-locale.not-your-language-question') }}
    </p>
    <div
      class="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in"
    >
      <img
        :class="locale === 'fr' ? 'border-white-800/80 border-4' : ''"
        src="/img/fr.svg"
        class="cursor-pointer h-12 cover rounded-lg mr-12 transform hover:scale-125 duration-200 ease-in-out"
        @click="changeLocale('fr')"
      />
      <img
        :class="locale === 'en' ? 'border-white-800/80 border-4' : ''"
        src="/img/gb.svg"
        class="cursor-pointer h-12 cover rounded-lg transform hover:scale-125 duration-200 ease-in-out"
        @click="changeLocale('en')"
      />
    </div>
  </div>
</template>
<script lang="ts">
import router from '@/router'
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const i18n = useI18n()
    const { t, locale } = useI18n()

    function changeLocale(newLocale: string) {
      i18n.locale.value = newLocale
      router.push({ params: { locale: newLocale } })
    }

    return { t, locale, changeLocale }
  }
}
</script>
