import React, { useEffect, useState } from "react";
import "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "api/firebase-util";

import { ReactComponent as Key } from "asset/image/account/key.svg";
import { ReactComponent as Mail } from "asset/image/account/mail.svg";

import { Link } from "react-router-dom";

import { getErrorMessage } from "util/function";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      //navigate("/travel");
    }
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/travel");
      })
      .catch((error) => {
        setError(getErrorMessage(error.code));
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full my-auto">
      <h2 className="mb-6 font-bold text-hm-plum">로그인</h2>
      <form className="w-full px-10" onSubmit={handleSubmit}>
        <div
          className={`flex flex-row items-center h-14 px-4 py-1 mb-4 border transition-all rounded-lg ${
            emailFocus ? "border-hm-yellow" : "border-slate-300 cursor-text"
          }`}
        >
          <Mail
            className={`w-6 mr-4 transition-all ${
              emailFocus ? "fill-hm-yellow" : "fill-slate-700"
            }`}
          />
          <div className="flex flex-col justify-end w-full h-full">
            <label
              htmlFor="email"
              className={`relative block font-medium transition-all text-slate-500 ${
                emailFocus ? "text-xs mb-1" : "text-sm cursor-text"
              }`}
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => {
                if (!email) {
                  setEmailFocus(false);
                }
              }}
              className={`text-slate-700 w-full transition-all border-none !outline-none !focus:outline-none appearance-none bg-inherit ${
                emailFocus ? "text-sm" : "text-[8px]"
              }`}
              required
            />
          </div>
        </div>
        <div
          className={`flex flex-row items-center h-14 px-4 py-1 mb-4 border transition-all rounded-lg ${
            passwordFocus ? "border-hm-yellow" : "border-slate-300 cursor-text"
          }`}
        >
          <Key
            className={`w-6 mr-4 transition-all ${
              passwordFocus ? "fill-hm-yellow" : "fill-slate-700"
            }`}
          />
          <div className="flex flex-col justify-end w-full h-full">
            <label
              htmlFor="password"
              className={`relative block font-medium transition-all text-slate-500 ${
                passwordFocus ? "text-sm mb-1" : "text-sm cursor-text"
              }`}
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => {
                if (!password) {
                  setPasswordFocus(false);
                }
              }}
              className={`text-slate-700 w-full transition-all border-none !outline-none !focus:outline-none appearance-none bg-inherit ${
                passwordFocus ? "text-sm" : "text-[8px]"
              }`}
              required
            />
          </div>
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold transition-colors duration-300 rounded-lg shadow-xl h-14 text-slate-700 bg-hm-yellow shadow-hm-yellow/40"
        >
          로그인
        </button>
      </form>
      <div className="mt-4 text-sm font-medium text-slate-500">
        <Link to="/join">
          아직 계정이 없으신가요?
          <span className="ml-1 text-hm-plum">가입하러가기</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
