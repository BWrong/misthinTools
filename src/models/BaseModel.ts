import fs from 'fs-extra';
import path from 'path';
import Lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import config from '@/config';
// import LodashId from 'lodash-id';
import defaultData from '../config/defaultData';
import {IAppSetting} from '@/interfaces/settings';
export default abstract class BaseModel {
  protected userDataPath = config.userPath;
  protected db: LowdbSync<IAppSetting>;
  constructor() {
    this.db = this.initStore();
  }
  private initStore() {
    // 存储位置
    const STORE_PATH = this.userDataPath;
    if (process.type !== 'renderer') {
      if (!fs.pathExistsSync(STORE_PATH)) {
        fs.mkdirpSync(STORE_PATH);
      }
    }
    const adapter = new FileSync(path.join(STORE_PATH, '.misthin.config.json'), {
      defaultValue: defaultData as IAppSetting
    });
    const db = Lowdb(adapter);
    // db._.mixin(LodashId); // 生成唯一标识id
    // 初始化数据
    // for (const key in defaultData) {
    //   if (Object.prototype.hasOwnProperty.call(defaultData, key)) {
    //     if (!db.has(key).value() || !Object.keys(db.get(key).value()).length) {
    //       db.set(key, (<any>defaultData)[key]).write();
    //     }
    //   }
    // }
    return db;
  }
  public getAppSetting():IAppSetting {
    return this.db.getState();
  }
}
