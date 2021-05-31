import BaseModel from './BaseModel';
import { ISetting } from '@/types/interfaces/settings';
class SettingModel extends BaseModel {
  private localDb = () =>  this.db.read().get('setting');
  constructor() {
    super();
  }
  getAll() {
    return this.localDb().value();
  }
  getOne<T extends keyof ISetting>(key: T): ISetting[T] | undefined {
    let setting = this.getAll();
    if (key in setting) {
      return setting[key];
    }
  }
  update<T extends keyof ISetting>(key: T, value: any) {
    let setting = this.getAll();
    if (key in setting) {
      setting[key] = value;
      this.db.read().set('setting', setting).write();
      return { msg: '操作成功', code: 0 };
    }
    return { msg: '无效的配置', code: 1 };
  }
  updateAll(setting:ISetting) {
    this.db.read().set('setting', setting).write();
    return { msg: '操作成功', code: 0 };
  }
}
export default new SettingModel();