import { ipcMain, app } from 'electron';
// app.whenReady().then(() => {
  ipcMain.on('message', (event,data) => {
    event.sender.send('reMessage','主线程收到了:'+data);
  });
// });
