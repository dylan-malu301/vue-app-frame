<template>
  <div class="not-found-page">
    <nav-bar left-text="返回" title="404"></nav-bar>
    <div class="content">
      <span>404</span>
      <span>not found</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .not-found-page{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    .content{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      >span{
        font-size: 30px;
        font-weight: 600;
      }
    }
  }
</style>
