import path from 'path';
import * as Datastore from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import fs from 'fs-extra';
// import LodashId from 'lodash-id'
import { remote, app } from 'electron';
import initData from '../config/initData';
// 存储位置
const APP = process.type === 'renderer' ? remote.app : app;
const STORE_PATH = APP.getPath('userData');
if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH);
  }
}
const adapter = new FileSync(path.join(STORE_PATH, '.misthin.config.json'));
const db = Datastore(adapter);
// db._.mixin(LodashId); // 生成唯一标识id
// 初始化数据
// for (const key in initData) {
//   if (initData.hasOwnProperty(key)) {
//     if (!db.has(key).value() || !Object.keys(db.get(key).value()).length) {
//       db.set(key, initData[key]).write();
//     }
//   }
// }
export default db;
