<template>
  <div>
   <el-container>
  <el-header>
  <el-menu
  :default-active="activeIndex"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="/home">首页</el-menu-item>
  <el-menu-item index="/list">用户列表</el-menu-item>
  <el-menu-item index="/crm">消息中心</el-menu-item>
  <el-menu-item index="/order">订单管理</el-menu-item>
</el-menu>

  </el-header>
  <el-main>
      <!-- 在页面中添加 router-view 标签，它是一个容器，可以动态渲染已经选择的 router 。 -->
      <router-view></router-view>
  </el-main>
</el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        activeIndex: this.$router.path
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push(key);
      }
    }
}
</script>

<style>

</style>
