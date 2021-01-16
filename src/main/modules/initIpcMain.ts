import { ipcMain } from 'electron';
function initIpcMain():void {
  ipcMain.on('message', (event,data) => {
    event.sender.send('reMessage','主线程收到了:'+data);
  });
}

export default initIpcMain;