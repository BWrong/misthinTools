export type TStatus = 'info'|'success'|'error'|'start'
export interface ILog{
  status: TStatus,
  txt: string
}