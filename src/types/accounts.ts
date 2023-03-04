export type Accounts<T = any> = {
  id: string;
  email: string;
  name: string;
} & T;


export interface AccountsInfo {
  email: string;
  name: string;
  phone_number: string;
  access_token: string;
}

