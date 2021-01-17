<template>
  <a-config-provider :locale="locale">
    <div class="frame">
      <l-menu />
      <div class="content">
        <!-- <l-nav/> -->
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade-transform">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import LMenu from '@/components/LMenu.vue';
import LNav from '@/components/LNav.vue';
export default defineComponent({
  components: {
    LMenu,
    LNav
  },
  setup(){
    return {
      locale: require('ant-design-vue/es/locale/zh_CN').default
    };
  }
});
</script>
<style lang="less">
.frame {
  width: 100vw;
  height: 100vh;
  display: flex;
  // background-color: #f8f8f9;
  position: relative;
  .content {
    // padding: 24px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    background: #fff;
    color: #333;
  }
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s ease;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-10px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
@media (prefers-color-scheme: dark) {
  .frame .content {
    background-color: #1E1E1F;
    color: #aaa;
  }
}
</style>
