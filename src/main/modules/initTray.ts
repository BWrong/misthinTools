import path from 'path';
import { BrowserWindow, nativeImage, Menu, Tray } from 'electron';

export default (win: BrowserWindow): void => {
  let mainW = win as BrowserWindow & { _tray: Tray | null };
  mainW._tray = null;
  // app.on('ready', () => {
    const image = nativeImage.createFromPath(path.join(__static, 'images/trayTemplate.png'));
    image.setTemplateImage(true);
    mainW._tray = new Tray(image); //系统托盘图标

    const contextMenu = Menu.buildFromTemplate([
      // 菜单项
      {label: '显示', type: 'radio', click: () => {win.show();}},
      {label: '隐藏', type: 'radio', click: () => {win.hide();}},
    ]);

    mainW._tray.setToolTip('This is my application.'); // 鼠标放上时候的提示

    mainW._tray.setContextMenu(contextMenu); // 应用菜单项
  // });
};
