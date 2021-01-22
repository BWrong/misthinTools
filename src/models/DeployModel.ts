import { IDeploy } from '@/interfaces/settings';
import BaseModel from './BaseModel';
class DeployModel extends BaseModel {
  // 操作必须先read，否则数据不同步
  private localDb = () =>  this.db.read().get('deploys');
  constructor() {
    super();
  }
  getAll() {
    return this.localDb().value();
  }
  getOne(name:string) {
    return this.localDb().find({name}).value();
  }
  clear() {
    return this.localDb().remove().write();
  }
  delete(name: IDeploy['name']) {
    if(!name) return console.log('参数错误');
    return this.localDb().remove({name}).write();
  }
  find(name: IDeploy['name']) {
    if (name) {
      return this.localDb().filter((item) => !!item.name.match(name)).value();
    } else {
      return this.getAll();
    }
  }
  add(data: IDeploy) {
    let hasData = this.localDb().find({ name: data.name }).value();
    console.log(hasData);
    return this.localDb().push(data).write();
  }
  update(data: IDeploy) {
    console.log(this.localDb().find({name: data.name}).assign(data).write());
    return;
  }
}
export default new DeployModel();