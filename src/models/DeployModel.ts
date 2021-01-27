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
  add(data: IDeploy) {
    let hasData = this.localDb().find({ name: data.name }).size().value();
    if (hasData) {
      return { msg: '已存在该项目', code: 1 };
    }
    let saveData = {
      ...data,
      id: +new Date(),
      createTime: +new Date(),
      updateTime: +new Date()
    };
    this.localDb().push(saveData).write();
    return { msg: '操作成功', code: 0 };
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
  update(data: IDeploy) {
    let saveData = {
      ...data,
      updateTime: +new Date()
    };
    this.localDb().find({ id: data.id }).assign(saveData).write();
    return { msg: '操作成功', code: 0 };
  }
}
export default new DeployModel();