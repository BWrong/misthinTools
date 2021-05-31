<template>
  <div class="content-box">
    <a-tabs size="small">
      <a-tab-pane key="1"
        ><template #tab><GlobalOutlined />Server</template> 开发中... </a-tab-pane
      >
      <a-tab-pane key="2"
        ><template #tab><DatabaseOutlined />Mock</template> 开发中... </a-tab-pane
      >
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { GlobalOutlined,DatabaseOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    GlobalOutlined,
    DatabaseOutlined
  },
  setup() {
    return {};
  }
});
</script>
<style lang="less">
</style>
