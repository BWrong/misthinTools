'use strict';
import path from 'path';
import { app, protocol, BrowserWindow,nativeTheme } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { autoUpdater } from 'electron-updater';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { updateHandle } from './helpers/updater';
import initIpcMain from './modules/initIpcMain';
import initMenu from './modules/initMenu';
import initShortcut from './modules/initShortcut';
import initTray from './modules/initTray';
import globalData from './modules/globalData';
const isDevelopment = process.env.NODE_ENV !== 'production';
import config from '../config';
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);
(global as any).state = globalData;
async function createWindow() {
  // Create the browser window.
  let win: BrowserWindow|null = new BrowserWindow({
    width: 1400,
    height: 600,
    minWidth: 800,
    minHeight: 560,
    center: true,
    frame: false,
    autoHideMenuBar: true,
    title: config.appTitle,
    icon: path.join(__static, 'images/logo.png'),
    backgroundColor: '#eee', // 背景颜色
    titleBarStyle: 'hidden',
    // show: false,
    webPreferences: {
      // webSecurity: false, //跨域限制
      // sandbox: false,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js'),
      // nodeIntegrationInWorker: true,
      // nodeIntegrationInSubFrames: true,
      enableRemoteModule: true,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://../index.html');
    // 更新
    // updateHandle(win);
    autoUpdater.checkForUpdatesAndNotify();
  }
  // 添加功能模块
  initIpcMain();
  initMenu();
  initShortcut();
  initTray(win);
  // 导航完成时触发，即选项卡的旋转器将停止旋转，并指派onload事件后。
  // win.webContents.on('did-finish-load', () => {
  //     // 发送数据给渲染程序
  //     win.webContents.send('reMessage', '主进程发送到渲染进程的数据');
  // });
  win.on('closed', () => { win = null; });
  // 设置dock进度条
  // win.setProgressBar(0.5);
  // 获取使用的主题模式，系统、深色、浅色
  // console.log(nativeTheme.themeSource);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// 加载完成再显示
app.once('ready-to-show' as any, () => {
  app.show();
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      // await installExtension({
      //   id:'ljjemllljcmogpfapbkkighbhhppjdbg',
      //   electron: '>=1.2.1'
      // });
      // await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
