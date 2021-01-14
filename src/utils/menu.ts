import { MenuItemConstructorOptions, remote } from 'electron';
const Menu = remote.Menu;
const contextmenuTpl:MenuItemConstructorOptions[] = [
  {
    label: '刷新',
    accelerator: 'CommandOrControl+F5', // 绑定快捷键
    click() {
      // 绑定事件
      location.reload();
    }
  },{
    label: '重新载入',
    accelerator: 'CommandOrControl+alt+F5', // 绑定快捷键
    role: 'forceReload'
  },{
    label: '开发者工具',
    accelerator: 'F12', // 绑定快捷键
    role: 'toggleDevTools'
  }
];

const m = Menu.buildFromTemplate(contextmenuTpl);
export function contextmenu():void {
  // 绑定右键菜单
  window.addEventListener(
    'contextmenu',
    e => {
      console.log(e);
      // e.preventDefault();
      // m.popup({
      //   window: remote.getCurrentWindow()
      // });
    },
    false
  );
}
