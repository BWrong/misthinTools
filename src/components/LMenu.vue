<template>
  <div class="sider">
    <img class="logo" src="../assets/logo.png" alt="" />
    <div class="menu">
      <router-link v-for="(item, index) in menu" :key="index" :to="item.link"><i :class="item.icon"></i>{{ item.title }}</router-link>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue';
export default defineComponent({
  data() {
    return {
      menu: [
        {
          title: '项目模板',
          link: '/template',
          icon: 'el-icon-receiving'
        },
        {
          title: '自动部署',
          link: '/deploy',
          icon: 'el-icon-tickets'
        },
        {
          title: '关  于',
          link: '/about',
          icon: 'el-icon-warning-outline'
        }
      ]
    };
  }
});
</script>
<style lang="less" scoped>
.sider {
  flex: 0 0 200px;
  overflow-y: auto;
  border-right: 1px solid #f8f8f9;
  padding: 12px;
  .logo {
    width: 60px;
    display: block;
    margin: 40px auto;
  }
}
.menu {
  a {
    display: block;
    text-align: center;
    line-height: 2;
    font-size: 16px;
    color: #515a6e;
    margin: 10px auto;
    border-radius: 3px;
    outline: none;
    text-decoration: none;
    &.router-link-active {
      background: darken(#f8f8f9, 5%);
      color: #409EFF;
    }
    i {
      margin-right: 8px;
    }
  }
}
</style>
