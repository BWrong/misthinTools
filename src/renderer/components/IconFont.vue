<template>
  <icon v-bind="attrs"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import config from '@/config';
const Icon = createFromIconfontCN({
  scriptUrl: config.iconUrl
});
export default defineComponent({
  components: {
    Icon,
  },
  setup (props,context) {
    return {
      attrs:context.attrs
    };
  }
});
</script>

<style scoped>

</style>