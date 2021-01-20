import path from 'path';
import { app,BrowserWindow, nativeImage,dialog, Menu, Tray, App,MenuItem,MenuItemConstructorOptions } from 'electron';
import config from '@/config';
app.whenReady().then(() => {
  const myApp = app as App & { _tray: Tray | null };
  myApp._tray = null; // 此变量保存Tray实例，需要用全局变量或挂载到其他全局对象上,否则会被回收
  const image = nativeImage.createFromPath(path.join(__static, 'images/trayTemplate.png'));
  image.setTemplateImage(true);
  myApp._tray = new Tray(image); //系统托盘图标
  const menuTemplate:Array<(MenuItemConstructorOptions) | (MenuItem)> = [
    {
      label: '关于',
      click () {
        dialog.showMessageBox({
          title: config.appTitle,
          message: config.appTitle,
          detail: `Version: ${config.appVersion}\nAuthor: ${config.appAuthor}\nGithub: ${config.repositoryUrl}`
        });
      }
    },
    {
      label: '显示控制台',
      type: 'radio',
      click: showWindow
    },
    {
      label: '隐藏控制台',
      type: 'radio',
      click: hideWindow
    },
    {
      role: 'quit',
      label: '退出'
    }
  ];
  const contextMenu = Menu.buildFromTemplate(menuTemplate);
  myApp._tray.setToolTip(config.appTitle); // 鼠标放上时候的提示
  // 右键点击
  myApp._tray.on('right-click', () => {
    myApp._tray?.popUpContextMenu(contextMenu); // 应用菜单项
  });
  // 左键点击
  myApp._tray.on('click', () => {
    showWindow();
  });
});
// 隐藏窗口
function hideWindow() {
  let mainWindow = BrowserWindow.getAllWindows()[0];
  mainWindow.hide();
}
// 显示窗口
function showWindow() {
  let mainWindow = BrowserWindow.getAllWindows()[0];
  mainWindow.show();
}