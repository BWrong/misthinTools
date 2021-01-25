import { ipcMain, Notification } from 'electron';
export default () => {
ipcMain.on('show-notification',showNotification);
};

function showNotification(){
  const notification = {
    title: '通知',
    body: '主进程发送的通知'
  };
  new Notification(notification).show();
}
