import { app, ipcMain, nativeTheme } from 'electron';
import SettingModel from '@/models/SettingModel';
ipcMain.handle('theme-mode', (ev, data) => {
  if (['dark', 'light', 'system'].includes(data)) {
    nativeTheme.themeSource = data;
    SettingModel.update('theme', data);
    return { isDark: nativeTheme.shouldUseDarkColors, themeSource: nativeTheme.themeSource };
  }
  return null;
});
