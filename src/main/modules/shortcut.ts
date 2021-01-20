import { app, globalShortcut, dialog } from 'electron';
app.whenReady().then(() => {
  globalShortcut.register('CmdOrCtrl+1', () => {
    dialog.showMessageBox({
      type: 'info',
      message: '你按下了全局注册的快捷键CmdOrCtrl+1'
    });
  });
});
