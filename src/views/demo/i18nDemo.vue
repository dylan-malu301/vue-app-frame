<template>
  <div class="i18n-demo">
    <nav-bar :left-text="backText" :title="title" :right-text="rightText" @clickRight="switchLang"></nav-bar>
    <van-popup v-model="isShowPopUp" position="bottom">
      <van-picker
        title="选择语言"
        show-toolbar
        :columns="langColumns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      isShowPopUp: false,
      langColumns: [
        { text: '中文', value: 'zh-CN' },
        { text: 'English', value: 'en-US' }
      ]
    }
  },
  watch: {
    '$store.state.pub.locale': {
      handler (newVal) {
        this.$i18n.locale = newVal
      }
    }
  },
  computed: {
    backText () {
      return this.$t('components.navBar.backText')
    },
    rightText () {
      return this.$i18n.locale === 'zh-CN' ? '切换语言' : 'switch-language'
    },
    title () {
      return this.$i18n.locale === 'zh-CN' ? '多语言示例' : 'i18nDemo'
    }
  },
  methods: {
    ...mapMutations({
      setLang: 'pub/setLang'
    }),
    switchLang () {
      this.isShowPopUp = true
    },
    onConfirm (data) {
      this.setLang(data.value)
      this.isShowPopUp = false
    },
    onCancel () {
      this.isShowPopUp = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
