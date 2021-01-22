import { ipcMain, app } from 'electron';
// app.whenReady().then(() => {
  ipcMain.on('message', (event,data) => {
    event.sender.send('reMessage','主线程收到了:'+data);
  });
// });
// ipcMain.handle('getDeployConfig', async (event, data) => {
//   console.log(event, data);
//   let configFile = require(data);
//   return configFile;
// });