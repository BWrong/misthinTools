import { App } from 'vue';
// 对首屏性能有要求的话，可以在使用的页面引入
import { ConfigProvider, Button,Icon, message, Modal } from 'ant-design-vue';
export default (app: App): void => {
  app.use(ConfigProvider);
  app.use(Button);
  app.use(Icon);
  app.config.globalProperties.$message = message;
  app.config.globalProperties.$modal = Modal;
};
