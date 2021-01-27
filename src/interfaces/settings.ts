import { TThemeName } from '@/interfaces/theme';
export interface ISetting{
  theme: TThemeName,
  autoUpdate: boolean,
  privateKey: string,
  passphrase: string
}
export interface IAppSetting{
  setting: ISetting,
  deploys: IDeploy[]
}
export interface IDeployMode{
  name: string,
  script?: string,
  host: string,
  port: number,
  username: string,
  password?: string,
  distPath: string,
  webDir: string,
  backupDir?: string
}
export interface IDeploy{
  name: string,
  path: string,
  lastTime?: string,
  id?: number,
  modes: IDeployMode[]
}
