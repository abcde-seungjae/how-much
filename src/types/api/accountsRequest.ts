import { Accounts } from 'types/accounts';


/** 회원가입 */
export type postAccountsSignupRequest = Accounts<{
  password: string;
}>;

/** 로그인 */
export interface postAccountsLoginRequest {
  email: string;
  password: string;
}

/** 마이페이지 회원정보 수정 */
export interface putAccountsProfileRequest {
  name: string;
  phone_number: string;
}


/** 마이페이지 비밀번호 변경 */
export interface putAccountsPasswordRequest {
  old_password: string;
  password_new: string;
}


/** 이메일 중복체크 */
export interface postAccountDuplicateEmailRequest {
  email: string;
}


/** 전화번호 중복체크 */
export interface postAccountDuplicatePhoneRequest {
  phone_number: string;
}

