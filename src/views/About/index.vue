<template>
  <div class="about">
    <img class="logo" src="../../assets/logo.png" />
    <div class="appname">{{ appTitle }} @ Bwrong</div>
    <div class="slogan"></div>
    <ul class="txt">
      <li><a @click="update">检测更新</a></li>
      <li><a href="https://github.com/BWrong/misthinTools/releases" target="_blank">更新日志</a></li>
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
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { remote, ipcRenderer } from 'electron';
import config from '@/config';
export default defineComponent({
  setup() {
    return {
      versions: remote.process.versions,
      appTitle:config.appTitle,
      appVersion:config.appVersion,
      update() {
        ipcRenderer.send('checkForUpdate');
      }
    };
  }
});
</script>
<style lang="less">
.about {
  padding-top: 2%;
  text-align: center;
  .logo {
    margin: 30px auto;
    display: block;
  }
  ul {
    padding: 0;
    margin: 24px auto;
    list-style: none;
    li {
      font-size: 14px;
      line-height: 2;
      color: #777;
    }
    a {
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
