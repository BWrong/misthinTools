<template>
  <div id="app">
    <div class="update-process" v-if="showProcess"><el-progress :percentage="process|int"></el-progress></div>
    <div class="frame">
      <cus-sider />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import CusSider from '@/components/CusSider';
import { ipcRenderer } from 'electron';
const message = {
  checking: '检查更新中……',
  error: '检查更新出错！',
  updateAva: '即将下载新版本！',
  updateNotAva: '当前已是最新版本！'
};
export default {
  data() {
    return {
      process: 0,
      showProcess: false
    };
  },
  components: {
    CusSider
  },
  filters: {
    int(val) {
      return parseInt(val);
    }
  },
  created() {
    ipcRenderer.on('updateMessage', (event, msg) => {
      console.log(message[msg.type]);
      this.$msg.closeAll();
      let msgData = {
            message: message[msg.type],
            position: 'bottom-right',
            showClose: true
          };
      switch (msg.type) {
        case 'checking':
          this.$msg.loading(msgData);
          break;
        case 'error':
          this.$msg.error(msgData);
          break;
        default:
          this.$msg.info(msgData);
          break;
      }
    });
    //注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
    ipcRenderer.on('downloadProgress', (event, progressObj) => {
      this.showProcess = true;
      let downloadPercent = progressObj.percent || 0;
      this.process = downloadPercent;
    });
    ipcRenderer.on('updateReady', () => {
      this.showProcess = false;
      this.$confirm('新版本已下载，立即更新？', '提示', {
        confirmButtonText: '立即更新',
        cancelButtonText: '下次再说',
        type: 'success'
      })
        .then(() => {
         ipcRenderer.send('updateInstall');
        });
    });
    ipcRenderer.send('checkForUpdate');
  }
};
</script>
<style lang="scss">
@import "./assets/scss/common.scss";
</style>
<style lang="scss" scoped>
@import "./assets/scss/_variable";
.frame {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: $bg;

  .content {
    padding: 24px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    background: lighten($color: $bg, $amount: 2%);
  }
}
.update-process{
  position: fixed;
  bottom: 4px;
  right: 0;
  width: 200px;
}
</style>
