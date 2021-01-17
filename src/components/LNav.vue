<template>
  <div class="nav-bar">
    <div class="skip">
      <LeftOutlined class="icon" />
      <RightOutlined class="icon" />
      <ReloadOutlined class="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LeftOutlined, RightOutlined, ReloadOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    LeftOutlined,
    RightOutlined,
    ReloadOutlined
  },
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.nav-bar {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.skip {
  .icon{
    margin: 0 10px;
    font-size: 16px;
  }
}
</style>