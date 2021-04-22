<template>
  <div class="no_data">
    <img src="~assets/images/sh_b@3x.png"
         alt="">
    <p>{{mess}}</p>
  </div>
</template>

<script>
export default {
  name: 'emptyData',
  props: {
    mess: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>
<style lang='less' scoped>
.no_data {
  display: flex;
  align-items: center;
  padding-top: 2.4rem;
  flex-direction: column;
  img {
    max-width: 1.4rem;
  }
  p {
    padding-top: 0.48rem;
    font-size: 0.28rem;
    color: #999;
  }
}
</style>
