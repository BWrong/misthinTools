import { remote } from 'electron';
import { createStore } from 'vuex';

export default createStore({
  state: {
    ...remote.getGlobal('state'),

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
