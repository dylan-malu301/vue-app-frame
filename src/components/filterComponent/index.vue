<template>
  <div class="filter-component">
    <van-popup
      v-model="isShowFilter"
      position="right"
      :overlay="isShowOverlay"
      :style="{ height: '100%' }"
      :safe-area-inset-bottom="true"
      :close-on-click-overlay="false"
      @click-overlay="overlayClick"
    >
      <div class="filter-box" :style="{ paddingTop: `calc(${statusBarHeight}px + 0.58rem)` }">
        <van-tabs v-model="active">
          <van-tab title="综合筛选">
            <div class="filter_type_box">
              <div>
                <h3>设备类型</h3>
                <div class="type_content">
                  <template v-for="(item, index) in equipTypeList">
                    <div
                      :key="index"
                      @click="selectEquTypeFn(item)"
                      :class="{ activeCss: item.checked }"
                    >{{ item.text }}</div>
                  </template>
                </div>
              </div>
              <div>
                <h3>需求类型</h3>
                <div class="type_content">
                  <template v-for="(item, index) in demandTypeList">
                    <div
                      :key="index"
                      @click="selectDemandTypeFn(item)"
                      :class="{ activeCss: item.checked }"
                    >{{ item.text }}</div>
                  </template>
                </div>
              </div>
              <div>
                <h3>需求年月</h3>
                <van-datetime-picker
                  v-model="currentDate"
                  :show-toolbar="false"
                  :item-height="30"
                  :visible-item-count="3"
                  type="year-month"
                  :formatter="formatter"
                  @change="selectDate"
                />
              </div>
            </div>
          </van-tab>
          <van-tab title="供电公司">
            <van-tree-select
              :items="TreeSelectItems"
              :active-id.sync="activeIds"
              :height="530"
              :main-active-index.sync="activeIndex"
              @click-item="clickTreeItem"
            />
          </van-tab>
        </van-tabs>
        <div class="bottom-copy"></div>
      </div>
      <div class="bottomBar">
        <span @click="reset">重置</span>
        <span @click="confirmFn">确定</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { cityTree } from '@/data/cityTree.js'
import lodash from 'lodash'
import gMixin from '@/libs/mixin/index'
export default {
  mixins: [gMixin],
  props: {
    isShowFilter: {
      type: Boolean,
      default: false
    },
    isShowOverlay: {
      // 是否显示遮罩
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      active: 0,
      activeIds: [],
      activeIndex: 0,
      date: '',
      equipTypeList: [
        { text: '单相表（1级）', id: 11, checked: false },
        { text: '单相表（2级）', id: 22, checked: false },
        { text: '三相表（0.5s级）', id: 33, checked: false },
        { text: '三相表（0.2s级）', id: 44, checked: false },
        { text: 'HPLC（单相）', id: 55, checked: false },
        { text: 'HPLC（三相）', id: 66, checked: false },
        { text: 'HPLC（集中器）', id: 77, checked: false },
        { text: '互感器', id: 88, checked: false },
        { text: '专变采集终端', id: 99, checked: false },
        { text: '集中器', id: 10, checked: false }
      ],
      demandTypeList: [
        { text: '月度需求', id: 1, checked: false },
        { text: '应急需求', id: 2, checked: false }
      ],
      treeSelectData: [],
      TreeSelectItems: cityTree,
      currentDate: new Date(),
      isDateChange: false
    }
  },
  methods: {
    clickTreeItem (data) {
      this.treeSelectData.push(data)
    },
    overlayClick () {
      // 点击遮罩关闭组件（需设置close-on-click-overlay为false，已默认设置）
      this.$emit('overlayClick')
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    selectEquTypeFn (item) {
      item.checked = !item.checked
    },
    selectDemandTypeFn (item) {
      item.checked = !item.checked
    },
    formatterDate (date) {
      let year = date.getFullYear()
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`
      return `${year}-${month}`
    },
    selectDate () {
      this.isDateChange = true
      this.date = this.formatterDate(this.currentDate)
    },
    reset () {
      this.currentDate = new Date()
      this.equipTypeList = lodash.forEach(this.equipTypeList, item => {
        item.checked = false
      })
      this.demandTypeList = lodash.forEach(this.demandTypeList, item => {
        item.checked = false
      })
      this.activeIds = []
      this.currentDate = 0
      this.isDateChange = false
    },
    confirmFn () {
      let selectEquipType = lodash.filter(this.equipTypeList, item => {
        return item.checked
      })
      let selectDemandType = lodash.filter(this.demandTypeList, item => {
        return item.checked
      })
      let equIds = lodash.map(selectEquipType, item => {
        return item.id
      })
      let demandIds = lodash.map(selectDemandType, item => {
        return item.id
      })

      let selectDate = this.isDateChange
        ? this.date
        : this.formatterDate(this.currentDate)
      this.$emit('confirmFn', equIds, demandIds, selectDate, this.treeSelectData)
    }
  }
}
</script>
<style>
.filter-component .van-tree-select__content {
  background-color: #444444;
}
.filter-component .van-tree-select__item {
  font-weight: normal;
  color: #999999;
  border-bottom: 1px solid #555555;
  font-size: 0.26rem !important;
  padding: 0;
}
.filter-component .van-tree-select__item.van-tree-select__item--active {
  background: #222222;
}
.filter-component .van-tree-select__selected {
  display: none;
}
.filter-component .van-sidebar-item.van-sidebar-item--select,
.van-sidebar-item.van-sidebar-item--select:active {
  background: #222222;
}
.filter-component .van-sidebar-item {
  background-color: #333333;
  color: #999999;
  font-size: 0.28rem;
  border: none;
}
.filter-component .van-tree-select {
  margin-top: 0.49rem;
}
.filter-component .van-tree-select__nav {
  background-color: #333333;
}
.filter-component .van-tabs__line {
  display: none;
}
.filter-component .van-tabs--line .van-tabs__wrap {
  height: 0.4rem;
}
.filter-component .van-tabs__nav--line {
  width: 2.8rem;
  margin: 0 auto;
}
.filter-component .van-tab {
  font-size: 0.22rem;
  color: #dddddd;
  padding: 0;
  background: #333333;
  border: 1px solid #dddddd;
  line-height: 0.4rem;
}
.filter-component .van-tab.van-tab--active {
  color: #333333;
  background: #dddddd;
  line-height: 0.4rem;
}
.filter-component .van-tab span {
  height: 100%;
  font-size: 0.22rem !important;
}
.filter-component .van-picker.van-datetime-picker {
  background: transparent !important;
  border-radius: 0 !important;
}
.filter-component .van-datetime-picker .van-picker-column__item {
  color: #dddddd !important;
}
.filter-component .van-datetime-picker .van-picker__mask {
  background-image: linear-gradient(
      180deg,
      rgba(54, 54, 54, 0.7),
      rgba(54, 54, 54, 0.4)
    ),
    linear-gradient(0deg, rgba(54, 54, 54, 0.9), rgba(54, 54, 54, 0.4));
}
.filter-component .van-popup.van-popup--right {
  border-radius: 0 !important;
  background: rgba(51, 51, 51, 0.98);
}
</style>
<style lang="less" scoped>
.filter-box {
  width: 5.4rem;
  background: rgba(51, 51, 51, 0.98);
  box-sizing: border-box;
  padding-top: 0.58rem;
  height: calc(100% - 0.8rem);
  overflow-y: auto;
}
.bottomBar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  > span:nth-child(1) {
    width: 38%;
    height: 0.8rem;
    background: #666666;
    font-size: 0.3rem;
    color: #dddddd;
    line-height: 0.8rem;
    text-align: center;
    display: inline-block;
  }
  > span:nth-child(2) {
    width: 62%;
    height: 0.8rem;
    background: #3ec5a3;
    font-size: 0.3rem;
    color: #ffffff;
    line-height: 0.8rem;
    text-align: center;
    display: inline-block;
  }
}
.filter_type_box {
  width: 100%;
  padding: 0.6rem 0.28rem 0;
  box-sizing: border-box;
  text-align: left;
  overflow-y: auto;
  > div {
    width: 100%;
    padding: 0;
    &:nth-child(3) {
      margin-top: 0.4rem;
    }
    > h3 {
      font-size: 0.28rem;
      color: #dddddd;
      margin-bottom: 0.28rem;
    }
    > .type_content {
      > div {
        width: 2.1rem;
        height: 0.54rem;
        background: #333333;
        color: #999999;
        font-size: 0.22rem;
        border-radius: 5px;
        line-height: 0.54rem;
        display: inline-block;
        text-align: center;
        margin-bottom: 0.28rem;
        &:nth-child(2n + 1) {
          margin-right: 0.32rem;
        }
        &.activeCss {
          color: #333333;
          background: #999999;
        }
      }
    }
  }
}
</style>
