# 前端app vue开发框架说明文档

## UI框架
登录账号密码配置在config/account.js

## UI框架
UI框架使用的是有赞开源的[vant](https://youzan.github.io/vant/#/zh-CN/)，可查阅相关api以便使用
>（old） vant相关组件未进行全局注册，页面引入方式如下：
```
import { Popup } from 'vant'
components: {
  [Popup.name]: Popup
}
```
>（new） 如果为内网项目，内网会屏蔽第三方域名资源，为防止组件icon加载失败，将vant组件进行直接一次性全部导入，加载本地字体图标库，避免不必要的bug及差的用户体验。<br>
当前项目中，相关vant组件直接在页面使用即可，无需引入注册。<br>
比较特殊的是Toast和Dialog的用法
```
this.$toast('')
this.$dialog.confim({
  message: ''
})
```
具体各个api详细参数请参考官方文档


## rem适配

本模板使用的是vw结合rem的方式来设定文档根元素（HTML）的font-size以达到适配各尺寸屏幕的效果，具体计算方式如下：<br>
为了换算单位的方便，我们设置HTML的font-size为100px，100vw等于手机屏幕的宽度，假设我们的设计稿的宽度为750px，换算一下1px就等于100/750vw，那我们设置根元素的font-size就为100x(100/750)vw。<br>
```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

// 设置 rem 函数
const setRem = () => {
  // 获取html的Dom元素
  let htmlDom = document.getElementsByTagName('html')[0]
  let designWidth = 750 // 默认设计稿尺寸为750px，如果设计师提供设计稿为别的尺寸，则替换相应尺寸
  htmlDom.style.fontSize = 100 / designWidth * 100 + 'vw' // 设置根元素字体大小
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = () => {
  setRem()
}

```
在开发过程中，如果设计稿宽度变化还是按照以上换算根元素的font-size大小。在写css的时候，假如设计稿上一张图片的宽度为210px，那么css表达式中设置图片的宽度就为2.1rem，以此类推，字体大小等都需要换算为rem。
>在此基础上，本模板使用了postcss插件的pxtorem来进行单位转换，在开发过程中只需要按照设计稿的尺寸来写就行，不用考虑转换rem。具体配置在postcss.config.js。另外此模板默认设计稿为750px，如果ui设计稿尺寸不用则需修改src/libs/rem.js中的designWidth。

>不建议使用postcss默认转换第三方插件及vant ui的固定样式，目前已在postcss.config.js中配置忽略转换vant ui及日历插件的默认样式，后续如果引入此类插件，需视情况而定是否需要对其进行转换。
### postcss配置

```
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100, // 基础尺寸设置为100,主要是为了方便计算（便于查错）
      propList: ['*'],
      selectorBlackList: ['.van', '.calendar', '.nav-bar'] // 忽略转换.van、.calendar、.nav-bar开头的样式
    }
  }
}
```



## 框架整体

Vue全家桶基本上均有涉及，其中app开发过程中vuex的使用较为广泛
vuex建议使用module模块化分组，详细使用方式请参考官方文档
数据请求方面使用的是[axios.js](http://axios-js.com/)，基本请求配置已完成，详情参考libs/axios.js，后续开发如需更改可在此基础上增改。

### vuex
* 本项目架构使用vuex module的写法，文件地址为src/store.
* store文件夹下moudule里面放置各个模块的仓库存储信息，输入文件为index.js和getter.js.
* getter.js作用时为项目中的常用变量做一个导出，getter算是state的一个计算属性，方便我们拿到并使用这些变量（例如用户信息、code之类的常用数据就可以放在getter）.
* index.js则是vuex的整体配置。在使用方法上没有特定的要求，可以使用this.$store.state.模块名.参数名、this.$store.commit('模块名/方法名'， 参数)、this.$store.dispatch('模块名/方法名'， 参数)，也可以使用vuex提供的{mapState, mapMutations, mapActions, mapGetters}，结合es6的扩展运算符来使用相关模块的参数和方法。具体使用方式参考官方文档。
>必须要注意的是：在module下的各个模块必须加上命名空间，以防变量冲突。

### axios
* axios配置请求和响应拦截，请求拦截采用上行参数进行加密处理结合随机生成key值传入后台，加密方法可参考libs/crypto.js，方法依赖固定2.3.1版本的jsencrypt。
* 并且建立api方法时设置isToken为false时可不需要验证token进行访问（一般情况下，默认将token设置在请求头）。
* 响应拦截主要针对请求失败的情况进行处理，主要是根据后台的code判断是否失败并弹出错误信息，便于后期维护。
>axios各个参数解释：
1. isToken默认为true，在接口不需要token的时候可设置为false。isEncrypt是否加密，默认加密。
2. otherToken用于第三方登录信息（如有需要，最好后台传）
3. isRequestTip是否展示接口信息，默认弹出，如接口不需要则设置false
4. isZip是否对上行参数进行压缩传输，目的为了提高传输效率，默认压缩.
5. 和isEncrypt一样，做了调试情况处理，在需要定位bug的情况下，设置session和当前时间一致即可不进行压缩和加密处理（时间精确到小时，如2020-04-01-10）。
#### 代码示例
```
instance.interceptors.request.use(
  config => {
    const { isToken, isEncrypt, otherToken, isRequestTip, isZip } = options
    config.isRequestTip = isRequestTip
    const token = store.state.user.token
    if (!token && isToken !== false) {
      Toast.fail('token不能为空')
      return
    }
    // 请求头，拼接otherToken
    if (otherToken) {
      config.headers._OtherToken_ = otherToken
    }
    // 请求头，拼接token
    if (isToken !== false) {
      let token = store.state.user.token || ''
      config.headers.token = token
    }
    // 控制后台返回参数是否压缩
    if (isZip) {
      config.headers.compressType = 'gzip'
    }
    const currHours = getDate(new Date().getTime(), 'hours')
    if (sessionRead(currHours) === currHours) {
      delete config.headers.compressType
    }
    /**
      * 拦截上行参数，加密
      */
    // 生成key 加密传入后台
    if (isEncrypt !== false && sessionRead(currHours) !== currHours) {
      this.key = this.encrypt.rndStr(16)
      const secretKey = this.encrypt.keyJsencrypt(this.key)
      config.headers.secretKey = secretKey
    }
    // 加密上行参数
    let params = config.data
    if (params) {
      params.platform = this.platform
      params.version = this.version
      if (isEncrypt !== false && sessionRead(currHours) !== currHours) {
        params = this.cloneParams(params)
      }
      config.data = params
      this.argsOnSecret = params
    }
    this.queue[options.url] = true
    store.commit('pub/updateLoadingStatus', { isLoading: true })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```

### 自定义指令
本项目自定义指令位于src/directive文件夹下，相关注册配置已完成，只需要后续添加方便开发的自定义指令（一般情况下牵扯到dom操作的情况下，优先考虑使用自定义指令实现），可参考示例，具体自定义写法及各个参数请自行参考官方文档，这里不做赘述。
#### 代码示例
```
// src/directive/index.js
import autoFocus from './modules/autoFocus'
import debounce from './modules/debounce'
const globalDirectives = Vue => {
  Vue.directive('autoFocus', autoFocus)
  Vue.directive('debounce', debounce)
}
export default globalDirectives

// main.js
import globalDirectives from './directive/index'
globalDirectives(Vue)
```

### 项目结构
本项目采用vue cli3.0为基础结构，项目结构及配置文档写法较之前有所不同，如需增加/修改相关配置，请参考官方文档。

### 组件
项目公共组件统一放置在src/components文件夹下，页面级组件放置在对应页面文件夹下，防止与公共组件混淆
```
// src/components/index.js

import navBarCom from './navBar/index.vue'
import searchBarCom from './searchBar.vue'
import filterCom from './filterComponent/index.vue'
import calendar from '_c/vueHashCalendar/index'

const registerFn = (Vue) => {
  const navBar = {
    install: (Vue) => {
      Vue.component('navBar', navBarCom)
    }
  }
  const searchBar = {
    install: (Vue) => {
      Vue.component('searchBar', searchBarCom)
    }
  }
  const filterComponent = {
    install: (Vue) => {
      Vue.component('filterComponent', filterCom)
    }
  }
  const hashCalendar = {
    install: (Vue) => {
      Vue.component('hashCalendar', calendar)
    }
  }
  Vue.use(navBar)
  Vue.use(searchBar)
  Vue.use(filterComponent)
  Vue.use(hashCalendar)
}
export default registerFn

// main.js

import componentsRegister from '@/components/index.js'
componentsRegister(Vue)
```
目前已有公共组件有：
#### 日历插件[vue-hash-calendar](https://github.com/TangSY/vue-hash-calendar)
##### 安装使用说明
  >日历插件已进行全局注册<br>
  可直接在VUE文件中引入组件:
  ```
  <hash-calendar
      ref="calendarPicker"
      :visible.sync="isShowCalendar"
      :disabledWeekView="true"
      weekStart="monday"
      pickerType="date"
      :markDate="markDate"></hash-calendar>
  ```
##### api
| 属性                        | 说明                                                                                                                                                  |   类型   |      默认      | 是否必传 |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | :------------: | :------: |
| visible                     | 控制日历组件的显示或隐藏,需使用 `.sync` 修饰符                                                                                                        | Boolean  |     false      |    否    |
| scrollChangeDate            | 控制滑动的时候是否修改选中的日期                                                                                                                      | Boolean  |      true      |    否    |
| model                       | 日历组件以哪种形式展示。inline：内联的方式。dialog：弹窗的方式                                                                                        |  String  |     inline     |    否    |
| defaultDatetime             | 指定默认时间。                                                                                                                                        |   Date   |    当前时间    |    否    |
| format                      | 确认日期时，回调事件返回的日期格式。如“YY/MM/DD hh:mm” 、“YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分”、“MM DD,YY at hh:mm F”                           |  String  | YY/MM/DD hh:mm |    否    |
| weekStart                   | 以星期几作为日历每一周的起始星期。可选['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']                                  |  String  |     sunday     |    否    |
| pickerType                  | 选择器类型 datetime：日期+时间 date：日期 time：时间                                                                                                  |  String  |    datetime    |    否    |
| showTodayButton             | 是否显示返回今日按钮                                                                                                                                  | Boolean  |      true      |    否    |
| isShowWeekView              | 是否以周视图展示组件                                                                                                                                  | Boolean  |     false      |    否    |
| disabledWeekView            | 禁用周视图（设置为 true 后，无法上下滑动进行周/月切换）                                                                                               | Boolean  |     false      |    否    |
| disabledDate                | 设置日期的禁用状态，参数为当前日期，要求返回 Boolean （禁用该日期需返回 true）                                                                        | Function |      ---       |    否    |
| markDate                    | 需要被标记的日期，可按不同颜色分组标记（不分组默认蓝色）。如：[{color: 'red',date: ['2019/02/25']},{color: 'blue',date: ['2019/01/20']},'2019/03/20'] |  Array   |       []       |    否    |
| markType                    | 标记图案类型 dot：小圆点（日期下方小圆点标记） circle：小圆圈（日期被小圆圈包围） dot+circle：同时使用小圆点与圆圈标记                                |  String  |      dot       |    否    |
| minuteStep                  | 间隔时间。（分钟的步长）                                                                                                                              |  Number  |       1        |    否    |
| lang                        | 选择的语言版本。可选值:['CN', 'EN']                                                                                                                   |  String  |       CN       |    否    |
| disabledClassName           | 日期被禁用时的 className。用于修改日期被禁用时的默认样式                                                                                              |  String  |      ---       |    否    |
| notCurrentMonthDayClassName | 非当前展示月份日期的 className(例如日历前面几天与后面几天灰色部分)。用于修改非当前展示月份日期的默认样式                                              |  String  |      ---       |    否    |
| checkedDayClassName         | 日期被选中时的 className。用于修改日期被选中时的默认样式                                                                                              |  String  |      ---       |    否    |
| todayClassName              | 当天日期的 className。用于修改当天日期的默认样式                                                                                                      |  String  |      ---       |    否    |
| firstDayOfMonthClassName    | 每月第一天的 className。用于修改每月第一天的默认样式                                                                                                  |  String  |      ---       |    否    |

##### 事件

| 事件名称    | 说明                                                                                      | 参数                               |
| :---------- | :---------------------------------------------------------------------------------------- | :--------------------------------- |
| change      | 日期改变时，触发该事件。（返回的日期格式取决于 format 属性）                              | (date: 日期改变时，选中的日期)     |
| confirm     | 点击确认按钮时，触发该事件，dialog 模式中才有该按钮。（返回的日期格式取决于 format 属性） | (date: 点击确认按钮时，选中的日期) |
| click       | 点击日期时，触发该事件。（返回的日期格式取决于 format 属性）                              | (date: 当前点击的日期)             |
| touchstart  | 日历滑动 start 事件，同于原生该事件。                                                     | （event: touch 事件）              |
| touchmove   | 日历滑动 move 事件，同于原生该事件。                                                      | （event: touch 事件）              |
| touchend    | 日历滑动 end 事件，同于原生该事件。                                                       | （event: touch 事件）              |
| slidechange | 日历滑动的方向。返回值：right、left、up、down 。                                          | （direction: 滑动的方向）          |

##### 插槽 Slot

| name | 说明                                                                                                                                                                                                                                                                                                                                                                                      |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| day  | 自定义日期内容。例如可用于添加农历之类的。配合自定义 className 使用，效果更佳！参数为 { date, extendAttr }，其中 extendAttr 参数包含 `isMarked`（该日期是否被标记）、`isDisabledDate`（该日期是否被禁用）、`isToday`（该日期是否为今天）、`isChecked`（该日期是否被选中）、`isCurrentMonthDay`（该日期是否为本月日期）、`isFirstDayOfMonth`（该日期是否为当月第一天），可用于一些特殊需求 |
| week | 自定义星期内容。例如可用于自定义星期样式等等。参数为 { week }                                                                                                                                                                                                                                                                                                                             |   

#### 公共搜素组件searchBar.vue
搜索组件目前按照报工系统的样式呈现，之后应根据实际项目决定样式，但方法基本一致，如需输入之后就进行搜索操作，则必须进行防抖处理，避免多次调取接口。
>默认searchBar组件固定头部，如需跟随页面滑动则设置inner

```
<searchBar placeholder="搜索姓名、部门、岗位、项目角色" @search="search" inner/> 

search (searchKey) {
  // do something
}

```

#### 公共loading组件Loading.vue：
目前loading组件应用在与后台交互发送请求时出现loading组件，请求完成（失败或成功）消失，具体可参考libs/axios.js。loading组件的应用是在App.vue

```
<Loading v-if="isLoading"></Loading>

computed: {
  ...mapState({
    isLoading: state => state.pub.isLoading
  })
}
```

#### 公共空数据组件emptyData.vue：
具体样式需要根据项目和ui设计稿来决定（可做二次封装）
#### 图表组件（chart-bar、charts-line、chart-pie）：
路径src/components/charts,主要利用echarts图表组件api做二次封装，目前已有柱状图组件、饼图组件、折线图组件，在开发过程中只需要关注图表的数据和样式方面（option属性），其余初始化、监听等的功能均已在组件中完成.

```
<div class="charts-line-box">
  <charts-line :option="option"></charts-line>
</div>
<div class="charts-bar-box">
  <charts-bar :option="option"></charts-bar>
</div>
<div class="charts-pie-box">
  <charts-pie :option="option"></charts-pie>
</div>
```

#### 筛选组件（filterComponent）
筛选组件主要是根据vant提供的Popup, Tab, Tabs, DatetimePicker, TreeSelect等组件进行二次封装，使用方式可参考首页组件实例demo代码，其中使用到的vant组件的api移步官方文档查阅。
>组件内进行筛选的内容可根据项目需要进行更改。<br>
组件重要的几个事件，分别是关闭事件overlayClick（父组件定义）、确定事件confirmFn（父组件定义）、重置事件reset
两个prop参数：isShowFilter（是否展示组件，默认false）、isShowOverlay（是否展示遮罩，默认展示）

##### 代码示例
```
overlayClick () {
  // 点击遮罩关闭组件（需设置close-on-click-overlay为false，已默认设置）
  this.$emit('overlayClick')
},
reset () {
  this.currentDate = new Date()
  this.equipTypeList = lodash.forEach(this.equipTypeList, item => {
    item.checked = false
  })
  this.demandTypeList = lodash.forEach(this.demandTypeList, item => {
    item.checked = false
  })
  this.activeIds = []
  this.currentDate = 0
  this.isDateChange = false
},
confirmFn () {
  let selectEquipType = lodash.filter(this.equipTypeList, item => {
    return item.checked
  })
  let selectDemandType = lodash.filter(this.demandTypeList, item => {
    return item.checked
  })
  let equIds = lodash.map(selectEquipType, item => {
    return item.id
  })
  let demandIds = lodash.map(selectDemandType, item => {
    return item.id
  })

  let selectDate = this.isDateChange
    ? this.date
    : this.formatterDate(this.currentDate)
  this.$emit('confirmFn', equIds, demandIds, selectDate, this.treeSelectData)
}

// 父组件使用
<!-- html -->
<filter-component :isShowFilter="isShowFilterCom" @overlayClick="closeFilter" @confirmFn="confirm"></filter-component>
<!-- html -->

// 筛选组件参数
isShowFilterCom: false,

// method
showFilterCom () {
  this.isShowFilterCom = true
},
closeFilter () {
  this.isShowFilterCom = false
},
confirm (equIds, demandIds, selectDate, treeSelectData) {
  this.isShowFilterCom = false
  console.log(treeSelectData)
  this.selectData = `您的筛选条件为：设备类型编号${equIds.join('、')}，需求类型编号${demandIds.join('、')}，需求日期为${selectDate}`
}

```

### devServe配置
开发环境devServe已从vue.config.js剥离出来，文件路径为根目录/config/devServe.js
``` 
// config/devServe.js
const devServer = {
  port: 3000,
  disableHostCheck: true,
  proxy: {
    '/api': {
      target: 'http://192.168.1.184:9009/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}

module.exports = devServer

// vue.config.js
const devServer = require('./config/devSever')
devServer: devServer
```

### 混入
* 文件路径：libs/mixin/index.js
* 基于此前项目，目前混入有以下参数和方法：
  >参数：backConfig（全局页面返回路由配置）<br>
  参数：statusBarHeight（手机顶部信息状态栏高度）<br>
  方法：backFn（依据返回路由配置，在当前页面点击返回按钮绑定此事件）<br>
  方法：getPhoneStatus（获取终端信息）、getPhoto（拍照）、findPicture（打开相册）、getScanCode（扫描）
* 获取手机信息需安卓人员支持，将页面内嵌到安卓apk中，通过window.android访问安卓提供给页面使用的参数及方法，安卓使用页面定义的方法则将方法挂在window对象上面，安卓使用同一函数名称获取即可

```
  methods: {
    backFn () {
      const currRouterName = this.$route.name
      backConfig.forEach((item) => {
        if (item.current === currRouterName) {
          if (typeof item.parent === 'string') {
            this.$router.push({ name: item.parent })
          } else {
            let routerId = this.$route.params.routerId !== null && this.$route.params.routerId !== undefined ? this.$route.params.routerId : this.$store.state.pub.routerId
            this.$router.push({ name: item.parent[routerId] })
          }
        }
      })
    },
    /**
     * 获取终端信息
     */
    getPhoneStatus () {
      if (window.android) {
        return window.android.getPhoneStatus()
      }
      Toast('web端暂不支持获取终端信息！')
    },
    /**
     * 拍照
     */
    getPhoto () {
      if (window.android) {
        return window.android.getPhoto()
      }
      Toast('web端暂不支持拍照！')
    },
    /**
     * 打开相册
     */
    findPicture () {
      if (window.android) {
        return window.android.findPicture()
      }
      Toast('web端暂不支持打开相册！')
    },
    /**
     * 扫描
     */
    getScanCode () {
      if (window.android) {
        return window.android.getScanCode()
      }
      Toast('web端暂不支持扫描二维码！')
    },

    /**
     * key-value形式保存数据
     * @param key
     * @param value
     */
    setValueKey (key, value) {
      if (window.android) {
        return window.android.setValueKey(key, value)
      }
      Toast('没有找到安卓终端！')
    },
    /**
     * 根据已知key获取保存的数据
     * @param key
     */
    getValueKey (key) {
      if (window.android) {
        return window.android.getValueKey(key)
      }
      Toast('没有找到安卓终端！')
    },
    /**
     * Toast
     *
     * @param message
     */
    showWebToast (message) {
      if (window.android) {
        return window.android.showWebToast(message)
      }
      Toast('没有找到安卓终端！')
    }
  },
  mounted () {
    // 接收二维码信息
    window.codeResult = (code) => {
      if (typeof this.codeResult === 'function') {
        this.codeResult(code)
      }
    }
    // 接收照片
    window.photoResult = (pic) => {
      if (typeof this.photoResult === 'function') {
        this.photoResult(pic)
      }
    }
    // 返回
    window.backFn = () => {
      if (typeof this.backFn === 'function') {
        this.backFn()
      }
    }
  }
```

### 多语言
本模板多语言功能采用vue-i18n作为依赖支撑，配置文件src/i18n/，lang文件夹下是各个语言对应字段翻译，在项目文件中使用this.$t('字段名称')即可，如需了解更多此功能建议查阅官方文档
```
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '@/libs/util'

Vue.use(VueI18n)

const localeLanguage = navigator.language
const language = (localeLanguage === 'zh-CN' || localeLanguage === 'en-US') ? localeLanguage : false
let lang = language || localRead('local') || 'zh-CN'

const i18n = new VueI18n({
  locale: lang,
  messages: {
    'zh-CN': require('./lang/zh-CN'),
    'en-US': require('./lang/en_US')
  }
})

export default i18n

// main.js

import i18n from '@/i18n/index'
new Vue({
  router,
  store,
  i18n,
  mounted () {
    if (window.localStorage.getItem('_themeSign')) {
      let themeSign = window.localStorage.getItem('_themeSign')
      theme.changeTheme(themeSign)
    } else {
      theme.changeTheme()
    }
  },
  render: h => h(App)
}).$mount('#app')
```

### 主题色切换
* 主题色配置文件在src/libs/theme.js(只是一个设置的方法)
* 本功能主要借助less的函数功能预先定义一个设置全局色变量的函数，在参数里面可以预先设置本主题需要的各种颜色，例如背景色、文字颜色、按钮颜色等（src/assets/theme/color.less）
* 在theme.less中引入此前定义的函数并定义基础主体类（即将各个主题相关颜色参数传入函数中执行），具体设置方式可参考theme.js。
* 主题色转换组件switchTheme（src/components/switchTheme）

```
// color.less
.setTheme(@mainColor: #333333, @textColor: #333333, @buttonColor: #333333){
  .top-nav-background {
    background: @mainColor !important;
  }
  .van-nav-bar {
    background: @mainColor;
  }
  .van-picker__confirm {
    color: @textColor;
  }
  .van-picker__cancel {
    color: @textColor;
  }
}

// theme.less
@import url('./color.less');
.dark {
  .setTheme()
}
.gray-blue {
  .setTheme(#1e446b, #1e446b, #1e446b)
}
.sky-blue {
  .setTheme(#0875fc, #0875fc, #0875fc)
}
.green {
  .setTheme(#269f8d, #269f8d, #269f8d)
}

// libs/theme.js

export default {
  changeTheme (themeName = 'green') {
    let Dom = document.getElementById('app')
    Dom.className = themeName
    window.localStorage.setItem('_themeSign', themeName)
  }
}

// main.js

import theme from './libs/theme'
new Vue({
  router,
  store,
  i18n,
  mounted () {
    if (window.localStorage.getItem('_themeSign')) {
      let themeSign = window.localStorage.getItem('_themeSign')
      theme.changeTheme(themeSign)
    } else {
      theme.changeTheme()
    }
  },
  render: h => h(App)
}).$mount('#app')

```
### 公共less变量
目前项目已配置供全局使用的src/assets/theme/base.less,此文件用于定义项目全局使用的公共样式变量（比如border、title字体、动画等属性），配置方面使用style-resources-loader使其可以在全局范围使用，具体配置详见vue.config.js

```
// vue.config.js

pluginOptions: {
  'style-resources-loader': {
    preProcessor: 'less',
    patterns: [path.resolve(__dirname, 'src/assets/theme/base.less')]
  }
}
```

## 备注

图片、css文件可根据对于项目进行增删处理，公共组件也进一步丰富完善，在开发使用过程中有好的建议都可以来完善此开发模板。

