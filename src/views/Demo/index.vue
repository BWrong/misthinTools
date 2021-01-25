<template>
  <div class="content-box">
    <a-button @click="sendIpc" type="primary" ghost>发送ipc消息</a-button>
    <a-button @click="dialog" type="primary">dialog</a-button>
    <a-button @click="getGlobalData">获取全局数据</a-button>
    <a-button @click="hideTray">隐藏tray</a-button>
    <a-button @click="showTray">显示tray</a-button>
    <a-button @click="notification">通知</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ipcRenderer, remote } from 'electron';
import { message } from 'ant-design-vue';
export default defineComponent({
  setup() {
    // 向主进程发送消息
    const sendIpc = () => {
      ipcRenderer.send('message', '我是渲染进程发来的信息');
      ipcRenderer.on('reMessage', (event, data) => {
        message.destroy();
        message.info(data);
      });
    };
    // 弹出dialog
    const dialog = () => {
      remote.dialog.showMessageBox({
        type: 'info',
        message: '渲染进程弹出dialog'
      });
    };
    const getGlobalData = () => {
      console.log(remote.getGlobal('state'));
    };
    const hideTray = () => {
      ipcRenderer.send('hideTray');
    };
    const showTray = () => {
      ipcRenderer.send('showTray');
    };
    const notification = () => {
      const myNotification = new Notification('通知', {
        body: '这是渲染进程发的通知'
      });
      myNotification.onclick = () => {
        console.log('Notification clicked');
      };
      setTimeout(()=>{
        ipcRenderer.send('show-notification');
      },2000);


    };
    return {
      sendIpc,
      dialog,
      getGlobalData,
      hideTray,
      showTray,
      notification
    };
  }
});
</script>

<style scoped>
</style>