import { TThemeName } from '@/interfaces/theme';
export interface ISetting{
  theme: TThemeName,
  autoUpdate: boolean,
  privateKey: string,
  passphrase: string
}
export interface IAppSetting{
  setting: ISetting,
  deploys: any[]
}