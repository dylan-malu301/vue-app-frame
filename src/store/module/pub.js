import { localSave, localRead } from '@/libs/util'
export default {
  namespaced: true, // 命名空间（必须加上，用来区分模块）
  state: {
    themeId: 0,
    isLoading: true,
    routerId: '',
    routerId2: '',
    locale: localRead('local')
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateRouterId (state, id) {
      state.routerId = id
    },
    updateRouterId2 (state, id) {
      state.routerId2 = id
    },
    changeTheme (state, id) {
      state.themeId = id
      localSave('_themeId', id)
    },
    setLang (state, lang) {
      localSave('local', lang)
      state.locale = lang
    }
  },
  getters: {

  },
  actions: {
    // 请求操作
  }
}
