import path from 'path';
import { app, nativeImage, Menu, Tray, App } from 'electron';
import config from '@/config';
app.whenReady().then(() => {
  let mapp = app as App & { _tray: Tray | null };
  mapp._tray = null;
  const image = nativeImage.createFromPath(path.join(__static, 'images/trayTemplate.png'));
  image.setTemplateImage(true);
  mapp._tray = new Tray(image); //系统托盘图标

  const contextMenu = Menu.buildFromTemplate([
    // 菜单项
    {
      label: '显示',
      type: 'radio',
      click: () => {
        app.show();
      }
    },
    {
      label: '隐藏',
      type: 'radio',
      click: () => {
        app.hide();
      }
    }
  ]);

  mapp._tray.setToolTip(config.appTitle); // 鼠标放上时候的提示

  mapp._tray.setContextMenu(contextMenu); // 应用菜单项
});
