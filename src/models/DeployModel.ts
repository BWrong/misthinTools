import BaseModel from './BaseModel';
import { ISetting } from '@/interfaces/settings';
class DeployModel extends BaseModel {
  deploys: any;
  constructor() {
    super();
    this.deploys = this.db.get('deploys').value();
  }
  getAll() {
    return this.deploys;
  }
}
