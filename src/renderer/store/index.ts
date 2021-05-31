import { remote } from 'electron';
import { createStore } from 'vuex';
import SettingModel from '@/models/SettingModel';
export default createStore({
  state: {
    ...remote.getGlobal('_state'),
    themeSource: SettingModel.getAll().theme
  },
  mutations: {
    toggleTheme(state, data) {
      state.isDark = data.isDark;
      state.themeSource = data.themeSource;
    }
  },
  actions: {},
  modules: {},
});
