import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';
export default (win?:BrowserWindow):void => {
  ipcMain.on('message', (event, data) => {
    event.sender.send('reMessage', '主线程收到了:' + data);
  });
  // ipcMain.handle('getDeployConfig', async (event, data) => {
  //   console.log(event, data);
  //   let temp = path.normalize(data);
  //   console.log(temp);
  //   let configFile = require(temp);
  //   return configFile;
  // });
};
