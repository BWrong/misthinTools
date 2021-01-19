### 使用说明
#### 使用示例
- 安装
```js
import webUpdate from '@/plugin/webUpdate';
Vue.use(webUpdate);
```
- 调用
以下值为默认值
```js
this.$webUpdate.update({
  widArr: [webId] // 需要更新的网站
}).then(res=>{});
```
---
[//]: # (Author: wangwenbing Date: 2018-09-12 11:16:50)
