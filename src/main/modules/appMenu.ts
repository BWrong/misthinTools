import { app, BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from 'electron';

let template: Array<MenuItemConstructorOptions | MenuItem> = [
  {
    label: '操作',
    submenu: [
      {
        label: '撤消',
        role: 'undo'
      },
      {
        label: '重做',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: '复制',
        role: 'copy'
      },{
        label: '剪切',
        role: 'cut'
      },
      {
        label: '粘贴',
        role: 'paste'
      }
    ]
  },
  {
    label: '窗口',
    submenu: [
      {
        label: '放大',
        role: 'zoomIn'
      },
      {
        label: '缩小',
        role: 'zoomOut'
      },
      {
        label: '默认',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label: '重载',
        role: 'reload'
      },
      {
        label: '强制重载',
        role: 'forceReload'
      },
      {
        label: '开发者工具',
        role: 'toggleDevTools'
      },
      {
        type: 'separator'
      },
      {
        label: '关闭',
        role: 'close'
      },{
        label: '退出',
        role: 'quit'
      }
    ]
  }
];

if (process.platform === 'darwin') {
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: `关于 ${name}`,
        role: 'about',
        accelerator: ''
      },
      {
        type: 'separator'
      },
      {
        label: '服务',
        role: 'services',
        accelerator: ''
      },
      {
        type: 'separator'
      },
      {
        label: `隐藏 ${name}`,
        role: 'hide'
      },
      {
        label: '隐藏其它',
        role: 'hideOthers'
      },
      {
        label: '显示全部',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: '退出',
        role: 'quit'
      }
    ]
  });
}
export default (win?:BrowserWindow): void => {
  // app.whenReady().then(() => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  // });
};