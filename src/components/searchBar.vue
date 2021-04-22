<template>
  <div class="search_con">
    <div class="search_bar"
         :style="{position: inner ? 'relative' : 'fixed'}">
      <input type="text"
             v-model="seachKey"
             :placeholder="placeholder">
    </div>
    <div class="search_copy"
         v-if="!inner"></div>
  </div>
</template>

<script>
import lodash from 'lodash'
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    inner: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      seachKey: ''
    }
  },
  watch: {
    // 防止频繁搜索 使用lodash的debounce函数做防抖操作
    seachKey: lodash.debounce(function (newVal) {
      let that = this
      that.searchFn()
    }, 500, { 'maxWait': 1000 })
  },
  methods: {
    searchFn () {
      this.$emit('search', this.seachKey)
    }
  },
  mounted () {
    console.log(this.inner)
  }
}
</script>

<style lang="less" scoped>
.search_bar {
  width: 100%;
  padding: 0.16rem 0.32rem;
  background: #fff;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
  z-index: 1;
  > input {
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.32rem;
    height: 0.64rem;
    padding: 0 0.66rem;
    height: 0.64rem;
    font-size: 0.3rem;
    color: #333333;
    background: url("~assets/images/ss@3x.png") no-repeat 0.2rem center #f4f4f4;
    background-size: 0.32rem 0.32rem;
    &::-webkit-input-placeholder{
      color: #999999;
    }
  }
}
.search_copy {
  width: 100%;
  height: 0.96rem;
}
</style>
