<template>
  <div class="about">
   <div v-for="(item,key) in templateList" :key="key" >{{key}}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import templateList from '@/config/templateList';
export default defineComponent({
  setup() {
    return {
      templateList
    };
  }
});
</script>
<style lang="less">

</style>
