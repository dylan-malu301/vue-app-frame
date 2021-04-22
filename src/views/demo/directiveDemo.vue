<template>
  <div class="directive-demo">
    <nav-bar left-text="返回" title="自定义指令示例"></nav-bar>
    <div class="demo-content">
      <label for="text">自动聚焦</label>
      <input name="text" type="text">
      <van-button type="default" v-debounce="log1">自定义指令v-debounce(不传参)</van-button>
      <van-button type="default" v-debounce:log2="[text, '54365']">自定义指令v-debounce传参但不传事件对象</van-button>
      <van-button type="default" v-debounce="[($event)=>{ log3($event, '423'), 1000}]">v-debounce传递事件对象及其他参数</van-button>
      <p>{{ `不传参，执行${test1}次` }}</p>
      <p>{{ `传参但不传事件对象，执行${test2}次` }}</p>
      <p>{{ `传递事件对象和其他参数及延迟时间，执行${test3}次` }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      test1: 0,
      text: '测试',
      test2: 0,
      test3: 0
    }
  },
  methods: {
    log1 () {
      this.test1++
    },
    log2 (text, number) {
      console.log(text)
      console.log(number)
      this.test2++
    },
    log3 (ev, yy) {
      console.log(ev)
      console.log(yy)
      this.test3++
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  .directive-demo{
    .demo-content{
      width: 100%;
      height: auto;
      box-sizing: border-box;
      background: #ffffff;
      padding: 20px 0;
    }
    label{
      font-size: 30px;
      color: #333333;
      margin-right: 20px;
    }
    input{
      width: 60%;
      height: 50px;
      line-height: 50px;
      border: 1px solid #eeeeee;
      margin: 0 0 20px;
    }
  }
</style>
