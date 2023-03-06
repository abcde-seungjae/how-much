import { errorMessages, messageType } from "./error-message";

export const getErrorMessage = (message: messageType) => {
  return errorMessages[message] || "알 수 없는 오류 발생";
};
