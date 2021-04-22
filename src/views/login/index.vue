<template>
  <div class="login-page">
    <div class="login-logo">
      <img src="~assets/images/icon1080.png" alt="">
    </div>
    <div class="login-form">
        <van-field v-model="loginForm.userName" clearable placeholder="用户名" :formatter="formatter"/>
        <i class="user-error error-text" v-if="isShowUserErr">{{ userError }}</i>
        <van-field v-model="loginForm.password" clearable type="password" placeholder="密码" :formatter="formatter"/>
        <i class="pwd-error error-text" v-if="isShowPwdErr">{{ pwdError }}</i>
        <div class="login-button">
          <van-button :disabled="isDisabled" type="primary" block color="#009d85" @click="submit">登录</van-button>
        </div>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      isShowUserErr: false,
      isShowPwdErr: false,
      userError: '用户名不能为空',
      pwdError: '密码不能为空'
    }
  },
  computed: {
    isDisabled () {
      return lodash.isEmpty(this.loginForm.userName) || lodash.isEmpty(this.loginForm.password)
    }
  },
  methods: {
    ...mapActions({
      Login: 'user/Login'
    }),
    formatter (value) {
      return value.replace(' ', '')
    },
    submit () {
      const params = this.loginForm
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '登录中...'
      })
      this.Login(params).then(res => {
        if (res.code === 200) {
          this.$toast.clear()
          this.$router.push({ name: 'home' })
        } else {
          this.$toast.clear()
        }
        this.$toast(res.message)
      })
    }
  }
}
</script>
<style lang="less">
  .login-page {
    .van-cell{
      padding: 16px 0;
      .van-field__control{
        font-size: 0.36rem;
        color: #001613;
      }
    }
    .van-cell:not(:last-child)::after{
      left: 0;
      border-bottom: 1px solid #dddddd;
    }
  }
</style>
<style lang="less" scoped>
  .login-page{
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
  }
  .login-logo{
    width: 120px;
    height: 120px;
    margin: 0 auto;
    padding: 0.8rem 0;
  }
  .login-form{
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    .error-text{
      width: 100%;
      display: block;
      color: #ff0000;
      text-align: left;
      margin-top: 20px;
      font-size: 0.2rem;
    }
  }
  .login-button{
    margin-top: 80px;
  }
</style>
