<template>
  <div class="nav-bar">
    <div class="statusBar" :style="{height: `${statusBarHeight+46}px`}"></div>
    <div class="nav-bar-content hairline">
      <div class="status-bar-nav" :style="{height: `${statusBarHeight}px`}"></div>
      <van-nav-bar
        :title="title"
        :left-text="leftText"
        :right-text="rightText"
        :left-arrow="isShowLeft"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template slot="left">
          <slot name="left"></slot>
        </template>
        <template slot="title">
          <slot name="title"></slot>
        </template>
        <template slot="right">
          <slot name="right"></slot>
        </template>
      </van-nav-bar>
    </div>
  </div>
</template>

<script>
import gMixin from '@/libs/mixin/index.js'
export default {
  mixins: [gMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    leftText: {
      type: String,
      default: ''
    },
    isShowLeft: {
      type: Boolean,
      default: true
    },
    rightText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    onClickLeft () {
      this.backFn()
    },
    onClickRight () {
      this.$emit('clickRight')
    }
  }
}
</script>

<style lang="less">
  .nav-bar{
    position: relative;
    z-index: 999;
  }
  .statusBar{
    width: 100%;
    position: relative;
    background-color: #f9f9f9;
  }
  .status-bar-nav{
    position: relative !important;
    width: 100%;
    background-color: #f9f9f9;
  }
  .nav-bar-content{
    width: 100%;
    position: fixed !important;
    left: 0;
    top: 0;
  }
  .nav-bar .van-nav-bar__title,
  .nav-bar .van-nav-bar__text,
  .nav-bar .van-nav-bar .van-icon
  {
    color: #ffffff;
  }
  .nav-bar .van-nav-bar__text:active{
    background-color: inherit;
  }
  .nav-bar [class*=van-hairline]::after{
    border: none !important;
  }
</style>
