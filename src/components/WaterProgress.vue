<template>
  <!-- <teleport to="body"> -->
    <div class="progress-box">
      <div class="content">
        <div class="water-box">
          <div class="wave"></div>
        </div>
        <div class="title" v-if="status===0">任务执行中...</div>
        <div class="title error" v-if="status===-1">任务执行失败</div>
        <div class="title success" v-if="status===1">任务执行成功</div>
        <div class="log" ref="logBox">
          <template v-for="item in logs" :key="item.text">
            <div class="log-item success" v-if="item.status === 'success'"><CheckCircleOutlined />{{ item.txt }}</div>
            <div class="log-item error" v-else-if="item.status === 'error'"><CloseCircleOutlined />{{ item.txt }}</div>
            <div class="log-item start" v-else-if="item.status === 'start'"><MinusOutlined />{{ item.txt }}</div>
            <div class="log-item" v-else>{{ item.txt }}</div>
          </template>
        </div>
      </div>
    </div>
  <!-- </teleport> -->
</template>

<script lang="ts">
import { defineComponent, onUpdated, PropType, ref } from 'vue';
import { ILog } from '@/interfaces/common';
import { CheckCircleOutlined, CloseCircleOutlined,MinusOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    CheckCircleOutlined,
    CloseCircleOutlined,
    MinusOutlined
  },
  props: {
    logs: {
      type: Array as PropType<ILog[]>,
      default: () => []
    },
    status:{
      type:Number,
      default: 0
    }
  },
  setup() {
    const logBox = ref<HTMLElement|null>(null);
    onUpdated(()=>{
      logBox.value && (logBox.value.scrollTop = logBox.value?.scrollHeight);
    });
    return {
      logBox
    };
  }
});
</script>

<style scoped lang="less">
@water-size: 80px;
.progress-box {
  .content {
    min-height: 100px;
    position: relative;
  }
  .title {
    text-align: center;
    font-size: 16px;
    margin-top: -10px;
    margin-bottom: 20px;
    color: #666;
    &.error {
      color: @error-color;
    }
    &.success {
      color: @success-color;
    }
  }
  .log {
    border: 1px solid #eee;
    border-radius: 3px;
    padding: 10px;
    height: 200px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: block; /* Chrome Safari */
    }
    .log-item {
      font-size: 12px;
      line-height: 1.8;
      span {
        margin-right: 5px;
      }
      &.error {
        color: @error-color;
      }
      &.success {
        color: @success-color;
      }
      &.warning {
        color: @warning-color;
      }
    }
  }
}
.water-box {
  width: @water-size;
  height: @water-size;
  padding: 2px;
  border: 2px solid @primary-color;
  margin: 20px auto;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: content-box;
  position: relative;
  .wave {
    position: relative;
    width: @water-size;
    height: @water-size;
    background-color: @primary-color;
    border-radius: 50%;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: calc(@water-size * 2);
      height: calc(@water-size * 2);
      top: 0;
      left: 50%;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 40%;
      // border-radius: 45%;
      transform: translate(-50%, -70%) rotate(0);
      animation: rotate 6s linear infinite;
      z-index: 10;
    }

    &::after {
      border-radius: 38%;
      // border-radius: 47%;
      background-color: rgba(255, 255, 255, 0.9);
      transform: translate(-50%, -70%) rotate(0);
      animation: rotate 10s linear -5s infinite;
      z-index: 20;
    }
  }
}

@keyframes rotate {
  50% {
    transform: translate(-50%, -73%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -70%) rotate(360deg);
  }
}
</style>