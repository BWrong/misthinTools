import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import addAntd from '@/plugins/antd';
// import datastore from './plugins/datastore';
// import { contextmenu } from './utils/menu';

// contextmenu();
const app = createApp(App);
addAntd(app);
// app.config.globalProperties.$db = datastore;
app.use(store).use(router).mount('#app');
export default app;