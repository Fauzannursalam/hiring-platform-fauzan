import type { AxiosError } from 'axios';


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAxiosError<T = { code?: string; message?: string }>
  extends AxiosError<T> {}