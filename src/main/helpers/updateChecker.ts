import { app, dialog, shell,ipcMain } from 'electron';
import axios from 'axios';
import SettingModel from '@/models/SettingModel';
import config from '@/config';
const version = app.getVersion();
const release = config.releaseUrl;
const downloadUrl = config.downloadUrl;
const checkVersion = async (isForce = false):Promise<void> => {
  let showTip = SettingModel.getOne('autoUpdate');
  if (isForce || showTip) {
    console.log('检查更新...');
    try {
      const res = await axios.get(release, {
        timeout: 30000
      });
      if (res.status === 200) {
        const latest = res.data.version || res.data.name; // 获取版本号
        const result = compareVersion2Update(version, latest); // 比对版本号，如果本地版本低于远端则更新
        if (result) {
          dialog.showMessageBox({
            type: 'question',
            title: '发现新版本',
            buttons: ['立即下载', '下次再说'],
            defaultId: 0,
            message: `发现新版本${latest}，是否下载？`,
            checkboxLabel: '以后不再提醒',
            checkboxChecked: false
          }).then(({ response, checkboxChecked }) => {
            if (response === 0) {
              shell.openExternal(downloadUrl);
            }
            if (checkboxChecked) {
              SettingModel.update('autoUpdate', false);
            }
          });
        } else {
          console.log('当前没有可用的更新!');
          isForce && showMsg('当前没有可用的更新!');
        }
      } else {
        throw new Error('无法连接更新服务器！');
      }
    } catch (error) {
      console.log('无法连接更新服务器！');
      isForce && showMsg('连接更新服务器失败，请重试或手动下载！');
    }

  }
};
ipcMain.on('checkForUpdate', () => {
  checkVersion(true);
});
export default checkVersion;

function showMsg(message:string) {
  dialog.showMessageBox({
    title: '提示',
    message,
  });
}
function compareVersion2Update(current:string, latest:string){
  const currentVersion = current.split('.').map(item => parseInt(item));
  const latestVersion = latest.split('.').map(item => parseInt(item));
  let flag = false;
  for (let i = 0; i < 3; i++) {
    if (currentVersion[i] < latestVersion[i]) {
      flag = true;
    }
  }
  return flag;
};