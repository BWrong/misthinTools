import { remote, app } from 'electron';
const pkg = require('../../package.json');
const APP = process.type === 'renderer' ? remote.app : app;
export default {
  appTitle: 'MisthinTools',
  appAuthor: 'Bwrong',
  appVersion: pkg.version,
  userPath: APP.getPath('userData'),
  logUrl: 'https://github.com/BWrong/misthinTools/releases',
  repositoryUrl: 'https://github.com/BWrong/misthinTools',
  docsUrl: 'https://github.com/BWrong/misthinTools',
  iconUrl: '//at.alicdn.com/t/font_2331326_eftvzmpuic.js'
  // iconUrl: '/iconfont/iconfont.js'
};