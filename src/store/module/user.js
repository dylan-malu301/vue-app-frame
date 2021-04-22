import { TOKEN_KEY, sessionSave, sessionRead } from '@/libs/util'
import { login } from '@/apis/user.js'

export default {
  namespaced: true, // 命名空间（必须加上，用来区分模块）
  state: {
    userCode: '',
    token: sessionRead(TOKEN_KEY),
    dutiesCode: sessionRead('_dutiesCode'),
    dutiesName: sessionRead('_dutiesName'),
    empName: sessionRead('_empName'),
    empCode: sessionRead('_empCode'),
    endTime: sessionRead('_endTime'),
    fullName: sessionRead('_fullName'),
    groupPk: sessionRead('_groupPk'),
    loginDate: sessionRead('_loginDate'),
    loginTime: sessionRead('_loginTime'),
    orgName: sessionRead('_orgName'),
    orgCode: sessionRead('_orgCode'),
    pkEmp: sessionRead('_pkEmp'),
    pkOrg: sessionRead('_pkOrg'),
    userName: sessionRead('_userName'),
    userPk: sessionRead('_userPk'),
    userRole: sessionRead('_userRole'),
    userType: sessionRead('_userType'),
    startWkTime: sessionRead('_startWKTime'),
    endWkTime: sessionRead('_endWKTime'),
    forgetWKList: [],
    backWKList: [],
    auditWkCount: '',
    WkAuditList: [],
    WkAuditPassList: [],
    isFirstPage: true
  },
  mutations: {
    updateIsFirstPage (state, status) {
      state.isFirstPage = status
    },
    updateUserCode (state, code) {
      state.userCode = code
    },
    setToken (state, token) {
      state.token = token
      sessionSave(TOKEN_KEY, token)
    },
    setDutiesName (state, value) {
      state.dutiesName = value
      sessionSave('_dutiesName', value)
    },
    setDutiesCode (state, value) {
      state.dutiesCode = value
      sessionSave('_dutiesCode', value)
    },
    setEmpName (state, value) {
      state.empName = value
      sessionSave('_empName', value)
    },
    setEmpCode (state, value) {
      state.empCode = value
      sessionSave('_empCode', value)
    },
    setEndTime (state, value) {
      state.endTime = value
      sessionSave('_endTime', value)
    },
    setFullName (state, value) {
      state.fullName = value
      sessionSave('_fullName', value)
    },
    setGroupPk (state, value) {
      state.groupPk = value
      sessionSave('_groupPk', value)
    },
    setLoginDate (state, value) {
      state.loginDate = value
      sessionSave('_loginDate', value)
    },
    setLoginTime (state, value) {
      state.loginTime = value
      sessionSave('_loginTime', value)
    },
    setOrgName (state, value) {
      state.orgName = value
      sessionSave('_orgName', value)
    },
    setOrgCode (state, value) {
      state.orgCode = value
      sessionSave('_orgCode', value)
    },
    setPkEmp (state, value) {
      state.pkEmp = value
      sessionSave('_pkEmp', value)
    },
    setPkOrg (state, value) {
      state.pkOrg = value
      sessionSave('_pkOrg', value)
    },
    setUserName (state, value) {
      state.userName = value
      sessionSave('_userName', value)
    },
    setUserPk (state, value) {
      state.userPk = value
      sessionSave('_userPk', value)
    },
    setUserType (state, value) {
      state.userType = value
      sessionSave('_userType', value)
    },
    setUserRole (state, value) {
      state.userRole = value
      sessionSave('_userRole', value)
    },
    updateForgetWKList (state, data) {
      state.forgetWKList = data
    },
    updateBackWKList (state, data) {
      state.backWKList = data
    },
    updateWkAuditList (state, data) {
      state.WkAuditList = data
    },
    updateWkAuditPassList (state, data) {
      state.WkAuditPassList = data
    },
    updateAuditWkCount (state, count) {
      state.auditWkCount = count
    },
    updateStartWKTime (state, startWkTime) {
      state.startWkTime = startWkTime
      sessionSave('_startWKTime', startWkTime)
    },
    updateEndWKTime (state, endWkTime) {
      state.endWkTime = endWkTime
      sessionSave('_endWKTime', endWkTime)
    }
  },
  getters: {

  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((res) => {
          if (res.code === 200) {
            commit('setEmpName', res.data.name)
            commit('setToken', res.token)
            commit('setUserRole', res.data.userRole)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    loginOut ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setEmpName', '')
        commit('setToken', '')
        commit('setUserRole', '')
      })
    }
  }
}
