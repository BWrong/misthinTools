import config from '@/config';
export default {
  setting: {
    theme: 'system',
    autoUpdate: true,
    privateKey: `${config.userPath}/.ssh/id_rsa`,
    passphrase: ''
  },
  deploys:[]
};