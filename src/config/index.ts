import { remote, app } from 'electron';
const APP = process.type === 'renderer' ? remote.app : app;
const isDevelopment = process.env.NODE_ENV !== 'production';
export default {
  appTitle: 'MisthinTools',
  appAuthor: 'Bwrong',
  appVersion: APP.getVersion(),
  userPath: APP.getPath('userData'),
  homePath: APP.getPath('home'),
  logUrl: 'https://github.com/BWrong/misthinTools/releases',
  repositoryUrl: 'https://github.com/BWrong/misthinTools',
  issuesUrl: 'https://github.com/BWrong/misthinTools/issues',
  docsUrl: 'https://github.com/BWrong/misthinTools',
  downloadUrl: 'https://github.com/BWrong/misthinTools/releases',
  releaseUrl: 'https://api.github.com/repos/BWrong/misthinTools/releases/latest',
  iconUrl: isDevelopment?'//at.alicdn.com/t/font_2331326_5s5wvfar2o9.js':'/iconfont/iconfont.js',
  deployModeLimit: 5,
  themeList: {
    system: {
      icon: 'system',
      next: 'light',
      title: '跟随系统',
      name: 'system'
    },
    light: {
      icon: 'light',
      next: 'dark',
      title: '明亮模式',
      name: 'light'
    },
    dark: {
      icon: 'dark',
      next: 'system',
      title: '暗黑模式',
      name: 'dark'
    }
  }
};