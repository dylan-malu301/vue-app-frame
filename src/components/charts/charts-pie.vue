<!--
 * @Description: 饼图组件
 * @Author: malu
 -->
<template>
  <div style="height: 100%;">
    <div ref="chartDom" class="chart chart-pie"></div>
  </div>
</template>

<script>
import lodash from 'lodash'
import echarts from 'echarts'
export default {
  name: 'chartPie',
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
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: ['选项一', '选项二', '选项三', '选项四', '选项五']
          },
          series: [
            {
              name: '选项',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 335, name: '选项一' },
                { value: 310, name: '选项二' },
                { value: 234, name: '选项三' },
                { value: 135, name: '选项四' },
                { value: 1548, name: '选项五' }
              ]
            }
          ]
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
