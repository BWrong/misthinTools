import { BrowserWindow, ipcMain  } from 'electron';
import { autoUpdater } from 'electron-updater';
// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
export function updateHandle(win:BrowserWindow):void {
  autoUpdater.setFeedURL('https://github.com/BWrong/misthinTools/releases/download/latest');
  autoUpdater.on('error', function (error) {
    sendUpdateMessage(win, {
      type: 'error',
      msg: error
    });
  });
  autoUpdater.on('checking-for-update', function () {
    sendUpdateMessage(win, {
      type: 'checking',
      msg: 'checking'
    });
  });
  autoUpdater.on('update-available', function (info:string) {
    sendUpdateMessage(win, {
      type: 'updateAva',
      msg: info
    });
  });
  autoUpdater.on('update-not-available', function (info:string) {
    sendUpdateMessage(win, {
      type: 'updateNotAva',
      msg: info
    });
  });
  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    console.log(progressObj);
    win.webContents.send('downloadProgress', progressObj);
  });
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    console.log('update-downloaded');
    win.webContents.send('updateReady');
    ipcMain.on('updateInstall', (e, arg) => {
      //some code here to handle event
      autoUpdater.quitAndInstall();
    });
  });

  ipcMain.on('checkForUpdate', () => {
    //执行自动更新检查
    autoUpdater.checkForUpdates();
  });
}

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(win: any, message: any) {
  console.log('update:',message);
  win.webContents.send('updateMessage', message);
}
