<template>
  <div class="main-container">
    <!-- demo头部 -->
    <header-title></header-title>
    <!-- 列表 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>

    <router-view></router-view>
  </div>
</template>


<script>
import Header from "@/components/header.vue";

export default {
  components: {
    "header-title": Header
  },
  created() {
    console.log(this.$route);
  },
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>



<style lang="less" scoped>
.main-container {
  padding: 80px 80px 100px 80px;
}
</style>