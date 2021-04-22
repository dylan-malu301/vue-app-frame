<template>
  <div class="loading-mask">
    <van-loading type="spinner" color="#000000" />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="less">
.loading-mask {
  position: fixed;
  margin: auto;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .loading-mask__box {
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  box-shadow: 0.266667rem 0.266667rem #4f4d49, -0.266667rem 0.266667rem #dfdfdf,
    -0.266667rem -0.266667rem #4f4d49, 0.266667rem -0.266667rem #dfdfdf;
  -o-box-shadow: 0.266667rem 0.266667rem #4f4d49,
    -0.266667rem 0.266667rem #dfdfdf, -0.266667rem -0.266667rem #4f4d49,
    0.266667rem -0.266667rem #dfdfdf;
  -ms-box-shadow: 0.266667rem 0.266667rem #4f4d49,
    -0.266667rem 0.266667rem #dfdfdf, -0.266667rem -0.266667rem #4f4d49,
    0.266667rem -0.266667rem #dfdfdf;
  -webkit-box-shadow: 0.266667rem 0.266667rem #4f4d49,
    -0.266667rem 0.266667rem #dfdfdf, -0.266667rem -0.266667rem #4f4d49,
    0.266667rem -0.266667rem #dfdfdf;
  -moz-box-shadow: 0.266667rem 0.266667rem #4f4d49,
    -0.266667rem 0.266667rem #dfdfdf, -0.266667rem -0.266667rem #4f4d49,
    0.266667rem -0.266667rem #dfdfdf;
  animation: cssload-spin ease infinite 4.6s;
  -o-animation: cssload-spin ease infinite 4.6s;
  -ms-animation: cssload-spin ease infinite 4.6s;
  -webkit-animation: cssload-spin ease infinite 4.6s;
  -moz-animation: cssload-spin ease infinite 4.6s;
}
@keyframes cssload-spin {
  0%,
  100% {
    box-shadow: 10px 10px rgb(79, 77, 73), -10px 10px rgb(223, 223, 223),
      -10px -10px rgb(79, 77, 73), 10px -10px rgb(223, 223, 223);
  }
  25% {
    box-shadow: -10px 10px rgb(223, 223, 223), -10px -10px rgb(79, 77, 73),
      10px -10px rgb(223, 223, 223), 10px 10px rgb(79, 77, 73);
  }
  50% {
    box-shadow: -10px -10px rgb(79, 77, 73), 10px -10px rgb(223, 223, 223),
      10px 10px rgb(79, 77, 73), -10px 10px rgb(223, 223, 223);
  }
  75% {
    box-shadow: 10px -10px #dfdfdf, 10px 10px #4f4d49, -10px 10px #dfdfdf,
      -10px -10px #4f4d49;
  }
} */

</style>
