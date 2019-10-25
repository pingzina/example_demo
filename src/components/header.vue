<template>
  <div class="el-header" style="height: 60px;">
    <div class="main">
      <h3>
        <a href="#/" class="router-link-active">
          <!-- <img src="../assets/logo.png" class="logo" /> -->
          demo管理
        </a>
      </h3>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="less" scoped>
.el-header {
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 100;
  background-color: #fff;
  border-bottom: #e6e6e6 solid 1px;
  padding: 0 40px;
  .main {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 26px;
      font-weight: normal;
      .router-link-active {
        display: flex;
        align-items: center;
      }
    }
  }
  .logo {
    width: 150px;
    margin-right: 5px;
  }
}
</style>