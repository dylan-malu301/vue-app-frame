import Vue from 'vue'
import Vuex from 'vuex'
import pub from './module/pub'
import user from './module/user'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters,
  modules: {
    pub,
    user
  }
})
