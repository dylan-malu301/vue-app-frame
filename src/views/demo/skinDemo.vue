<template>
  <div class="skin-demo">
    <nav-bar :title="title" leftText="返回" rightText="切换主题" @clickRight="switchThemeColor"></nav-bar>
    <switch-theme ref="switchComponent"></switch-theme>
  </div>
</template>

<script>
import navBar from '_c/navBar/index.vue'
import switchTheme from '_c/switchTheme/index.vue'
export default {
  components: {
    navBar,
    switchTheme
  },
  data () {
    return {
      title: this.$route.meta.title
    }
  },
  methods: {
    switchThemeColor () {
      this.$refs.switchComponent.isShowPopup = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
