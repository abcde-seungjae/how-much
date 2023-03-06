export const errorMessages = {
  "auth/user-not-found": "이메일 혹은 비밀번호가 일치하지 않습니다.",
  "auth/wrong-password": "이메일 혹은 비밀번호가 일치하지 않습니다.",
  "auth/wrong-password-check": "비밀번호 확인이 일치하지 않습니다.",
  "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
  "auth/weak-password": "비밀번호는 6글자 이상이어야 합니다.",
  "auth/network-request-failed": "네트워크 연결에 실패 하였습니다.",
  "auth/invalid-email": "잘못된 이메일 형식입니다.",
  "auth/internal-error": "잘못된 요청입니다.",
};

export type messageType = keyof typeof errorMessages;
