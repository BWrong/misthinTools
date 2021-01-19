import { App } from 'vue';
// 对首屏性能有要求的话，可以在使用的页面引入
import { ConfigProvider,Row,Col,List, Button, Icon, Tabs, message,Tooltip,Modal,Form, Input,Spin } from 'ant-design-vue';
import '@/assets/style/rewrite.less';
export default (app: App): void => {
  app.use(ConfigProvider);
  app.use(Row);
  app.use(Col);
  app.use(List);
  app.use(Button);
  app.use(Icon);
  app.use(Tabs);
  app.use(Tooltip);
  app.use(Modal);
  app.use(Form);
  app.use(Input);
  app.use(Spin);
};
