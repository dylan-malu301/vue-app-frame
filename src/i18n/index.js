import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '@/libs/util'
import config from '@/config'

Vue.use(VueI18n)

const localeLanguage = navigator.language
const language = (localeLanguage === 'zh-CN' || localeLanguage === 'en-US') ? localeLanguage : false
let lang = config.isUseI18n ? localRead('local') || language || 'zh-CN' : 'zh-CN'

const i18n = new VueI18n({
  locale: lang,
  messages: {
    'zh-CN': require('./lang/zh-CN'),
    'en-US': require('./lang/en_US')
  }
})

export default i18n
