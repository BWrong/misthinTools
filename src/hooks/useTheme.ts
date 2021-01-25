import { useStore } from 'vuex';
import { computed } from 'vue';
import { ipcRenderer } from 'electron';
import { TThemeName, ITheme, TThemeList } from '@/interfaces/theme';
import config from '@/config';
const themeList: TThemeList = config.themeList;
export default () => {
  const { state, commit } = useStore();
  const themeMode = computed<TThemeName>(() => state.themeSource);
  const theme = computed<ITheme>(() => themeList[themeMode.value]);
  const toggleTheme = async () => {
    const toTheme = theme.value.next || 'system';
    const themeInfo = await ipcRenderer.invoke('set-theme-mode', toTheme);
    commit('toggleTheme', themeInfo);
  };
  return {
    theme,
    toggleTheme
  };
};
