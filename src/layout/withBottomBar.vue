<template>
  <div class="layout-content">
    <div class="page-content" :style="{ height: `calc(100vh - 50px)` }">
      <router-view></router-view>
    </div>
    <van-tabbar route fixed v-model="active" active-color="#009d85" inactive-color="#001613">
      <van-tabbar-item replace :to="{ name: 'home' }">
        <span>{{ this.$t('navigation.index') }}</span>
        <template #icon="props">
          <img :src="props.active ? homeIcon.active : homeIcon.inactive"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace :to="{ name: 'user' }">
        <span>{{ this.$t('navigation.user') }}</span>
        <template #icon="props">
          <img :src="props.active ? userIcon.active : userIcon.inactive"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import gMixin from '@/libs/mixin/index'
export default {
  mixins: [gMixin],
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
      active: 0,
      homeIcon: {
        active: require('./icon/sy_pre@3x.png'),
        inactive: require('./icon/sy@3x.png')
      },
      userIcon: {
        active: require('./icon/wd_pre@3x.png'),
        inactive: require('./icon/wd@3x.png')
      }
    }
  },
  computed: {

  },
  mounted () {

  }
}
</script>
<style lang="less">
  .layout-content{
    .van-tabbar-item__icon img{
      width: 24px;
      height: 24px;
    }
  }
</style>
<style lang="less" scoped>
  .page-content{
    .phone-status-bar{
      width: 100%;
      background: transparent;
    }
    >div{
      height: 100%;
      overflow-y: auto;
    }
  }
</style>
