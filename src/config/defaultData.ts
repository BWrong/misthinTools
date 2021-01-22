import config from '@/config';
import { IDeploy, ISetting } from '@/interfaces/settings';
const setting: ISetting = {
  theme: 'system',
  autoUpdate: true,
  privateKey: `${config.userPath}/.ssh/id_rsa`,
  passphrase: ''
};
const deploys: IDeploy[] = [];
export default {
  setting,
  deploys
};
