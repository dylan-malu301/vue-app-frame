<template>
  <div class="switch-theme">
    <van-popup v-model="isShowPopup" position="bottom">
      <van-picker
          show-toolbar
          title=""
          :columns="columns"
          :default-index="defaultTheme"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
    </van-popup>
  </div>
</template>

<script>
import theme from '@/libs/theme'
import lodash from 'lodash'
import { localRead } from '@/libs/util'
export default {
  data () {
    return {
      themeList: [
        {
          name: '绿',
          sign: 'green'
        },
        {
          name: '灰蓝色',
          sign: 'gray-blue'
        },
        {
          name: '天蓝色',
          sign: 'sky-blue'
        },
        {
          name: '黑色',
          sign: 'dark'
        }
      ],
      isShowPopup: false,
      defaultTheme: localRead('_themeId')
    }
  },
  computed: {
    columns () {
      let list = lodash.map(this.themeList, (item) => {
        return item.name
      })
      return list
    }
  },
  methods: {
    changeTheme (themeName) {
      theme.changeTheme(themeName)
    },
    onCancel () {
      this.isShowPopup = false
    },
    onConfirm (value, index) {
      let selectedTheme = this.themeList[index].sign
      this.$store.commit('pub/changeTheme', index)
      this.changeTheme(selectedTheme)
      this.isShowPopup = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
