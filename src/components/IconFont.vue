<template>
  <icon v-bind="attrs"/>
</template>

<script lang="ts">
import { defineComponent,getCurrentInstance,ComponentInternalInstance } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import config from '@/config';
const Icon = createFromIconfontCN({
  scriptUrl: config.iconUrl
});
export default defineComponent({
  components: {
    Icon,
  },
  setup () {
    const { attrs } = getCurrentInstance() as ComponentInternalInstance;
    return {
      attrs
    };
  }
});
</script>

<style scoped>

</style>