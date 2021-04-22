<template>
  <div class="charts-demo">
    <nav-bar left-text="返回" title="图表组件示例"></nav-bar>
    <div class="charts-line-box">
      <charts-line :option="option"></charts-line>
    </div>
    <div class="charts-bar-box">
      <charts-bar :option="option"></charts-bar>
    </div>
    <div class="charts-pie-box">
      <charts-pie :option="option"></charts-pie>
    </div>
  </div>
</template>

<script>
import chartsBar from '_c/charts/charts-bar.vue'
import chartsPie from '_c/charts/charts-pie.vue'
import chartsLine from '_c/charts/charts-line.vue'
export default {
  name: 'chartDemo',
  components: {
    chartsBar,
    chartsPie,
    chartsLine
  },
  data () {
    return {
      option: {}
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  .charts-demo{
    width: 100%;
    .charts-line-box,
    .charts-bar-box,
    .charts-pie-box
    {
      width: 100%;
      height: 4.5rem;
    }
  }
</style>
