<!--
 * @Description: 柱状图组件
 * @Author: malu
 -->
<template>
  <div style="height: 100%;">
    <div ref="chartDom" class="chart chart-bar"></div>
  </div>
</template>

<script>
import lodash from 'lodash'
import echarts from 'echarts'
export default {
  name: 'chartBar',
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      chartDom: null
    }
  },
  watch: {
    option: {
      handler () {
        this.chartInit()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    chartInit () {
      this.$nextTick(() => {
        let option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        }
        if (!lodash.isEmpty(this.option)) {
          option = this.option
        }
        if (!this.chartDom) {
          this.chartDom = echarts.init(this.$refs.chartDom)
        }
        this.chartDom.resize()
        this.chartDom.setOption(option, true)
      })
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
    .chart{
        width: 100%;
        height: 100%;
    }
</style>
