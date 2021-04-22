<template>
  <div class="home">
    <div class="status-bar" :style="{height: `${statusBarHeight}px`, background: isSlide ? '#f9f9f9' : 'transparent'}"></div>
    <div class="banner" ref="topBanner"></div>
    <div class="tips top-nav-background">
      <span></span>
      <span>{{ $t('home.title') }}{{ userName==='' ? '' : `，欢迎用户${userName}` }}</span>
    </div>
    <div class="split_box"></div>
    <div class="part_box">
      <template v-for="(item, index) in menuList">
        <div :key="index">
          <p @click="partClick(item.routerName)">
            <img :src="item.img" alt v-if="item.img" />
            <span>{{ item.text }}</span>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import { sessionRead } from '@/libs/util'
import gMixin from '@/libs/mixin/index.js'
export default {
  name: 'home',
  mixins: [gMixin],
  data () {
    return {
      roleMenuList: config.indexMenuList,
      platform: config.platform,
      version: config.version,
      userRole: sessionRead('_userRole'),
      userName: sessionRead('_empName'),
      scrollTop: 0
    }
  },
  watch: {

  },
  computed: {
    menuList () {
      let list = []
      let menuList = []
      let obj = {}
      let roleArr = this.userRole.split(',')
      for (let i = 0; i < roleArr.length; i++) {
        for (let k = 0; k < this.roleMenuList.length; k++) {
          const item = this.roleMenuList[k]
          if (item.role.indexOf(roleArr[i]) !== -1) {
            list.push({
              routerName: item.name,
              img: item.img,
              text: this.$t(`home.parts.${item.name}`)
            })
          }
        }
      }
      // 去重
      list.forEach((item) => {
        let str = JSON.stringify(item)
        if (!obj[str]) {
          menuList.push(item)
          obj[str] = 1
        }
      })
      return menuList
    },
    isSlide () {
      return this.scrollTop < 0
    }
  },
  methods: {
    partClick (routerName) {
      this.$router.push({
        name: routerName
      })
    },
    handleScroll () {
      this.scrollTop = this.$refs.topBanner.getBoundingClientRect().top
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to.name)
    console.log(this.platform)
    next()
  },
  created () {},
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang="less" scoped>
.home {
  background: @body-background;
  .item-wrap::after {
    content: "";
    width: 100%;
    height: 16px;
    background: #f4f4f4;
    display: block;
    border-top: 1px solid #f4f4f4;
  }
  .report_list::after {
    content: "";
    width: 100%;
    background: #f4f4f4;
    display: block;
    border-top: 1px solid #f4f4f4;
  }
  .banner {
    width: 100%;
    height: 430px;
    background: #999999;
    background-size: 100% 100%;
  }
  .split_box {
    width: 100%;
    height: 10px;
    background: #f4f4f4;
  }
  .tips {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0 0 32px;
    height: 72px;
    background: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #dcdcdc;
    > span {
      &:nth-child(1) {
        width: 32px;
        height: 32px;
        background: url(~assets/images/tz@2x.png) no-repeat center;
        background-size: 100% 100%;
      }
      &:nth-child(2) {
        font-size: 24px;
        color: #666666;
        margin-left: 16px;
      }
    }
  }
  .part_box {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    > div {
      width: 33.3333%;
      height: 200px;
      box-sizing: border-box;
      background: #ffffff;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      display: flex;
      justify-content: center;
      align-items: center;
      &:nth-child(3n + 3) {
        border-right: none;
      }
      > p {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-top: 40px;
        > i {
          width: 30px;
          height: 30px;
          background: #f74c32;
          color: #fff;
          line-height: 30px;
          border-radius: 50%;
          padding: 3px;
          position: absolute;
          font-size: 24px;
          right: 10px;
          top: 20px;
          &.doubleCss {
            width: 36px;
            right: 0;
            border-radius: 15px;
          }
          &.tripleCss {
            width: 46px;
            right: -4px;
            top: 25px;
            border-radius: 15px;
          }
        }
      }
      img {
        width: 72px;
        height: 72px;
        margin: 0 auto 20px;
      }
      span {
        color: #666666;
        font-size: 24px;
      }
    }
  }
  .margin_box {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding-left: 30px;
    display: flex;
    align-items: center;
    font-size: 28px;
    color: #666666;
    background: #f4f4f4;
  }
  .tab_bar {
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    padding: 32px 0 32px 34px;
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      margin-right: 32px;
      height: 60px;
      > span {
        font-size: 32px;
        color: #999999;
        display: inline-block;
        transition: all 0.1s;
      }
      > i {
        width: 24px;
        height: 24px;
        background: #f84028;
        color: #fff;
        line-height: 24px;
        border-radius: 50%;
        padding: 3px;
        margin-left: 8px;
      }
      .currentTab {
        font-size: 40px;
        color: #2eae9b;
        font-weight: bold;
      }
    }
  }
}
.tab_content {
  > div {
    > div:last-child::after {
      height: 0;
      border: none;
    }
  }
}
.empty_box {
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > img {
    width: 200;
  }
  > span {
    font-size: 28px;
    color: #999;
    margin-top: 32px;
  }
}
.backReason {
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  font-size: 0;
  textarea {
    border: none;
    resize: none;
    height: 150px;
    width: 100%;
    background-color: #f4f4f4;
    border-radius: 8px;
    font-size: 30px;
    color: #999;
    padding: 24px;
    box-sizing: border-box;
  }
  .btn_box {
    padding-top: 24px;
    display: flex;
    justify-content: flex-end;
    button {
      height: 48px;
      padding: 0;
      width: 112px;
      border-radius: 24px;
      background: #009d85;
      margin: 0;
      outline: none;
      color: #ffffff;
      border: none;
      font-size: 24px;
    }
    button:disabled {
      background: #f4f4f4;
      color: #999;
    }
  }
}
</style>
