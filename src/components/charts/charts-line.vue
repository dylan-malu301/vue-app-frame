<!--
 * @Description: 折线图组件
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
  name: 'chartLine',
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
          grid: {
            left: 70,
            bottom: 20
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#eeeeee'
              }
            },
            axisLine: {
              show: false
            },
            data: ['01', '02', '03', '04', '05', '06', '07', '08']
          },
          yAxis: {
            type: 'value',
            name: '交易历史                 ',
            nameTextStyle: {
              color: '#333',
              fontWeight: 'bold'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f1f1f1'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          tooltip: {
            backgroundColor: '#ffffff',
            borderRadius: 5,
            padding: [2, 5, 2, 5],
            borderColor: '#ccc',
            borderWidth: 1,
            textStyle: {
              color: '#333333'
            },
            formatter: '{b}<br />交易值: {c}'
          },
          series: [{
            data: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
            type: 'line',
            itemStyle: {// 折线拐点标志的样式。
              normal: {
                color: '#30ace3'
              }
            },
            areaStyle: {// 区域填充样式
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(119, 213, 255, 0.5)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(119, 213, 255, 0.01)'
                    }
                  ],
                  globaCoord: false
                }
              }
            }
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
