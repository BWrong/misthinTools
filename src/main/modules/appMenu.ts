import { app, Menu, MenuItem } from 'electron';

let template:MenuItem[] = [
  {
    label: '操作',
    submenu: [
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: '重新加载',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        }
      }
    ]
  },
  {
    label: '加载网页',
    submenu: [
      {
        label: '优酷',
        accelerator: 'CmdOrCtrl+P',
        click: () => {
          console.log('time to print stuff');
        }
      },
      {
        type: 'separator'
      },
      {
        label: '百度'
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
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: '隐藏其它',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
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
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }
    ]
  });
}

app.whenReady().then(() => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
