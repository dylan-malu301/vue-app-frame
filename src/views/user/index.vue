<template>
  <div class="user-page">
    <div class="user-banner">
      <img src="~assets/images/wd_bg@2x.png" alt="">
      <div class="user-msg">
        <span>
          <img src="~assets/images/icon1080.png" alt="">
        </span>
        <span>{{ userName }}</span>
      </div>
      <span class="btn-out" @click="loginOutFn">{{ this.$t('signOut') }}</span>
    </div>
  </div>
</template>

<script>
import { sessionRead } from '@/libs/util'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      userName: sessionRead('_empName')
    }
  },
  methods: {
    ...mapActions({
      loginOut: 'user/loginOut'
    }),
    loginOutFn () {
      this.$dialog.confirm({
        message: '确定要退出登录吗？'
      }).then(() => {
        this.$dialog.close()
        this.loginOut()
        this.$toast.loading({
          message: '正在退出...',
          onClose: () => {
            this.$router.push({ name: 'login' })
          }
        })
      }).catch(() => {
        this.$dialog.close()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .user-page{
    width: 100%;
    background: #ffffff;
    .user-banner{
      width: 100%;
      position: relative;
      .user-msg{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 64px;
        color: #ffffff;
        font-size: 36px;
        text-align: center;
        >span:nth-child(1){
          width: 120px;
          height: 120px;
          border: 5px solid #ffffff;
          border-radius: 50%;
          display: block;
          margin: 0 auto 32px;
          overflow: hidden;
        }
      }
      .btn-out{
        width: 200px;
        height: 60px;
        font-size: 30px;
        line-height: 60px;
        color: #ffffff;
        position: absolute;
        right: 0;
        top: 0;
        text-align: center;
      }
    }
  }
</style>
