<template>
  <a-config-provider :locale="locale">
  <div class="frame">
    <l-menu />
    <div class="content">
      <router-view />
    </div>
  </div>
  </a-config-provider>
</template>
<script>
import {defineComponent} from 'vue';
import LMenu from '@/components/LMenu';
export default defineComponent({
  components:{
    LMenu
  },
  data() {
    return {
      locale: {}
    };
  },
  created() {
    this.locale = require('ant-design-vue/es/locale/zh_CN').default;
  }
});
</script>
<style lang="less">
.frame {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #f8f8f9;

  .content {
    padding: 24px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    background: lighten(#f8f8f9, 2%);
  }
}
.update-process{
  position: fixed;
  bottom: 4px;
  right: 0;
  width: 200px;
}
</style>
