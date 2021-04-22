import config from '@/config'
export default {
  changeTheme (themeName = 'default') {
    let Dom = document.getElementById('app')
    Dom.className = themeName
    let theme = config.isUseTheme ? themeName : 'default'
    window.localStorage.setItem('_themeSign', theme)
  }
}
