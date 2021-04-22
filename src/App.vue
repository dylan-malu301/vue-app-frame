<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>
<script>
import Loading from '_c/Loading.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Loading
  },
  data () {
    return {
      transitionName: ''
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.pub.isLoading
    })
  },
  watch: {
    $route (to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Helvetica, Arial, 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .3s;
  position: absolute;
  width:100%;
  height: 100%;
  left:0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}

</style>
