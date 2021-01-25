import { app, globalShortcut,BrowserWindow, dialog } from 'electron';
// 注册系统快捷键
export default (win?: BrowserWindow): void => {
  // app.whenReady().then(() => {
    globalShortcut.register('CmdOrCtrl+1', () => {
      dialog.showMessageBox({
        type: 'info',
        message: '你按下了全局注册的快捷键CmdOrCtrl+1'
      });
    });
  // });
};