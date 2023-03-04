import { Accounts, AccountsInfo } from 'types/accounts';


/** 회원가입 */
export type postAccountsSignupResponse = AccountsInfo;


/** 로그인 */
export type postAccountsLoginResponse = AccountsInfo;


/** 토큰 갱신 */
export interface postAccountsTokenRefreshResponse {
  access_token: string;
}


/** 마이페이지 회원정보 호출 */
export type getAccountsInfoResponse = Accounts<{}>;


/** 마이페이지 회원정보 수정 */
/** 마이페이지 비밀번호 변경 */
/** 이메일 중복체크 */
/** 전화번호 중복체크 */

