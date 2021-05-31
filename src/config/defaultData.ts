import config from '@/config';
import { IDeploy, ISetting } from '@/types/interfaces/settings';
const setting: ISetting = {
  theme: 'system',
  autoUpdate: true,
  privateKey: '',
  passphrase: ''
};
const deploys: IDeploy[] = [];
export default {
  setting,
  deploys
};
