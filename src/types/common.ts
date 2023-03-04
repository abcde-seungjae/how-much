export interface ApiCommonResponse<T = any> {
  data: T;
  msg: string;
  code: number;
}