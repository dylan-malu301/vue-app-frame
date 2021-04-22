<template>
  <div class="list-demo">
    <nav-bar title="分页示例" left-text="返回"></nav-bar>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="list-content">
          <template v-for="(item, index) in list">
            <p :key="index">{{ item }}</p>
          </template>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isRefresh: false,
      finished: false,
      loading: false,
      list: []
    }
  },
  methods: {
    onRefresh () {
      this.isRefresh = true
      setTimeout(() => {
        this.list = []
        for (let i = 0; i < 15; i++) {
          this.list.push(this.list.length + 1)
        }
        this.isRefresh = false
      }, 1000)
    },
    onLoad () {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 15; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false
        if (this.list.length >= 50) {
          this.finished = true
        }
      }, 1000)
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  .list-content{
    width: 100%;
    >p{
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 36px;
      color: #333333;
      background: #dddddd;
      margin: 10px 0;
    }
  }
</style>
