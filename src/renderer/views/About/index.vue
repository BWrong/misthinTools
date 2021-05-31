<template>
  <div class="about">
    <div class="main">
      <img class="logo" src="../../assets/logo.png" />
      <div class="appname">{{ appTitle }} @ 2021 {{appAuthor}}</div>
      <div class="slogan"></div>
      <ul class="txt">
        <li>
          软件版本：<span>{{ appVersion }}</span>
        </li>
        <li>
          Electron：<span>{{ versions.electron }}</span>
        </li>
        <li>
          Chrome：<span>{{ versions.chrome }}</span>
        </li>
        <li>
          NodeJs：<span>{{ versions.node }}</span>
        </li>
        <li>
          V8：<span>{{ versions.v8 }}</span>
        </li>
      </ul>
      <div class="btn">
        <a @click="update">检测更新</a>
        <a @click="openLog">更新日志</a>
      </div>
    </div>
    <bubble></bubble>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { remote, ipcRenderer } from 'electron';
import config from '@/config';
import { openUrlWithBrowser } from '~/utils';
import Bubble from '~/components/Bubble.vue';
export default defineComponent({
  components: {
    Bubble
  },
  setup() {
    const openLog = () => {
      openUrlWithBrowser(config.logUrl);
    };
    const update = () => {
      ipcRenderer.send('checkForUpdate');
    };
    return {
      versions: remote.process.versions,
      appTitle: config.appTitle,
      appVersion: config.appVersion,
      appAuthor: config.appAuthor,
      update,
      openLog
    };
  }
});
</script>
<style lang="less" scoped>
.about {
  padding-top: 4%;
  text-align: center;
  position: relative;
  height: 100vh;
  overflow: hidden;
  .logo {
    margin: 30px auto 0;
    width: 100px;
    display: block;
  }
  .appname {
    color: #999;
    font-size: 14px;
    margin-bottom: 20px;
  }
  ul {
    padding: 0;
    margin: 0 auto;
    list-style: none;
    li {
      font-size: 12px;
      line-height: 2;
      color: #777;
    }
  }
  .btn {
    margin-top: 20px;
    a {
      display: inline-block;
      color: @primary-color;
      cursor: pointer;
      font-size: 14px;
      margin: 0 10px;
    }
  }
}
.main{
  position: relative;
  z-index: 1;
}
</style>
