export interface ITemplate {
  name: string;
  description: string;
  value: string;
  author: string,
  keywords: string[]
}
export interface ITemplateList {
  [key: string]: ITemplate[];
}