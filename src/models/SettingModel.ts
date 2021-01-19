import BaseModel from './BaseModel';
import { ISetting } from '@/interfaces/settings';
class SettingModel extends BaseModel {
  private settings: ISetting;
  constructor() {
    super();
    this.settings = this.db.get('setting').value();
  }
  getAll() {
    return this.settings;
  }
  getOne<T extends keyof ISetting>(key: T): ISetting[T] | undefined {
    if (key in this.settings) {
      return this.settings[key];
    }
  }
  update<T extends keyof ISetting>(key: T, value: any) {
    if (key in this.settings) {
      this.settings[key] = value;
      this.db.read().set('setting', this.settings).write();
    }
  }
}
export default new SettingModel();