import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'

const activeLocales = ['fr', 'en']
const defaultLocale = activeLocales[0]

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale[0],
  fallbackLocale: 'fr',
  messages: {
    en,
    fr
  }
})

export default i18n
