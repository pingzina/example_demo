<template>
  <div id="app">
    <el-container>
      <router-view />
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    // fetch("/api")
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //     this.api = data;
    //   });
  },
  data() {
    return {
      api: {}
    };
  }
};
</script>

<style lang="less">
//引入css文件
@import url("./base/style/reset.less");

/*路由切换动效*/
.router-enter-active {
  animation: routerOut 0.5s;
}
.router-leave-active {
  animation: routerOut 0.5s reverse;
}

@keyframes routerOut {
  0% {
    transform: translateX(5px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
