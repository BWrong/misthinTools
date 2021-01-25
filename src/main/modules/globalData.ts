import { nativeTheme } from 'electron';
import settingModel from '@/models/SettingModel';
import { TThemeName } from '@/interfaces/theme';
const setting = settingModel.getAll();
const themeSeting = setting.theme || 'system';
nativeTheme.themeSource = themeSeting as TThemeName;
export default {
  isDark: nativeTheme.shouldUseDarkColors,
  themeSource: nativeTheme.themeSource,
  setting
};