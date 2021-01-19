import { useStore } from 'vuex';
import { computed } from 'vue';
import { ipcRenderer } from 'electron';
import {TThemeName,ITheme,TThemeList} from '@/interfaces/theme';
const themeList: TThemeList = {
  light: {
    icon: 'light',
    next: 'dark',
    title: '浅色模式',
    name: 'light'
  },
  dark: {
    icon: 'dark',
    next: 'system',
    title: '深色模式',
    name: 'dark'
  },
  system: {
    icon: 'system',
    next: 'light',
    title: '跟随系统',
    name: 'system'
  }
};
export default () => {
  const { state, commit } = useStore();
  const themeMode = computed<TThemeName>(() => state.themeSource);
  const theme = computed<ITheme>(() => themeList[themeMode.value]);
  const toggleTheme = async () => {
    const toTheme = theme.value.next || 'system';
    const themeInfo = await ipcRenderer.invoke('theme-mode', toTheme);
    commit('toggleTheme', themeInfo);
  };
  return {
    theme,
    toggleTheme
  };
};
