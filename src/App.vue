<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
     -->
<!-- 
    <p class="ft20 mt20">姓名：{{api.name}}</p>
    <p class="ft20">编号：{{api.id}}</p> -->
    <router-view />
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

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:not(:last-child)::after {
      content: "|";
      // display: inline-block;
      padding: 0 5px;
      color: black;
    }
  }
}
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
