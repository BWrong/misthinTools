<template>
  <span @click="openUrl(url)">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { openUrlWithBrowser } from '~/utils';
export default defineComponent({
  props:{
    url:{
      type: String,
      default: ''
    }
  },
  setup (prop) {
    const openUrl= (url: string) => openUrlWithBrowser(url);
    return {
      openUrl
    };
  }
});
</script>
