<template>
  <div class="component-demo">
    <nav-bar left-text="返回" title="组件示例" right-text="筛选" @clickRight="showFilterCom"></nav-bar>
    <filter-component :isShowFilter="isShowFilterCom" @overlayClick="closeFilter" @confirmFn="confirm"></filter-component>
    <p>{{ selectData }}</p>
    <hash-calendar
      ref="calendarPicker"
      :visible.sync="isShowCalendar"
      :disabledWeekView="true"
      format="YY-MM-DD"
      weekStart="monday"
      pickerType="date"
      :markDate="markDate"
    ></hash-calendar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选组件参数
      isShowFilterCom: false,
      selectData: '',
      // 日历插件参数
      isShowCalendar: true, // 是否展示日历插件
      markDate: [
        {
          color: 'red',
          date: ['2020/4/16', '2020/5/17', '2020/6/17', '2020/7/17', '2020/8/17']
        },
        {
          color: 'yellow',
          date: ['2020/9/16', '2020/10/17', '2020/11/17', '2020/12/17']
        }
      ]
    }
  },
  methods: {
    showFilterCom () {
      this.isShowFilterCom = true
    },
    closeFilter () {
      this.isShowFilterCom = false
    },
    confirm (equIds, demandIds, selectDate, treeSelectData) {
      this.isShowFilterCom = false
      console.log(treeSelectData)
      this.selectData = `您的筛选条件为：设备类型编号${equIds.join('、')}，需求类型编号${demandIds.join('、')}，需求日期为${selectDate}`
    }
  }
}
</script>

<style lang="less" scoped>

</style>
