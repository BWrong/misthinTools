export type TThemeName = 'light' | 'dark' | 'system';
export interface ITheme {
  icon: string;
  next: string;
  title: string;
  name: string;
}
export type TThemeList = { [key in TThemeName]: ITheme };