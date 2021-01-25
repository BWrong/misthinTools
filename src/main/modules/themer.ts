import { BrowserWindow, ipcMain, nativeTheme } from 'electron';
import SettingModel from '@/models/SettingModel';
export default (win?: BrowserWindow): void => {
  ipcMain.handle('set-theme-mode', (ev, data) => {
    if (['dark', 'light', 'system'].includes(data)) {
      nativeTheme.themeSource = data;
      SettingModel.update('theme', data);
      return { isDark: nativeTheme.shouldUseDarkColors, themeSource: nativeTheme.themeSource };
    }
    return null;
  });
  ipcMain.handle('get-theme-mode', () => nativeTheme.themeSource);
};
