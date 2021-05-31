<template>
  <a-config-provider :locale="locale">
    <div class="frame">
      <the-menu />
      <div class="content">
        <!-- <l-nav/> -->
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="slide">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TheMenu from '~/components/TheMenu.vue';
import TheNav from '~/components/TheNav.vue';
export default defineComponent({
  components: {
    TheMenu,
    TheNav
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
/* slide */
.slide-leave-active,
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.slide-leave-to {
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
