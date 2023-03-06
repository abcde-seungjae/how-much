import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  updateProfile,
} from "firebase/auth";
import "firebase/auth";
import React from "react";
import { app } from "api/firebase-util";
import { getErrorMessage } from "util/function";

import { ReactComponent as Key } from "asset/image/account/key.svg";
import { ReactComponent as Mail } from "asset/image/account/mail.svg";
import { ReactComponent as Name } from "asset/image/account/name.svg";
import { ReactComponent as Check } from "asset/image/common/check.svg";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function Join() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [passwordValidate, setPasswordValidate] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordChkFocus, setPasswordChkFocus] = useState(false);
  const [displayNameFocus, setDisplayNameFocus] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (passwordChk === event.target.value) {
      setPasswordValidate(true);
    } else {
      setPasswordValidate(false);
    }
  };

  const handlePasswordChkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordChk(event.target.value);
    if (password === event.target.value) {
      setPasswordValidate(true);
    } else {
      setPasswordValidate(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passwordValidate) {
      setError(getErrorMessage("auth/wrong-password-check"));
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const user = auth.currentUser;

        if (user) {
          updateProfile(user, {
            displayName: displayName,
          }).then(() => {
            //navigate("/joinSuccess");
          });
        }
      })
      .catch((error) => {
        setError(getErrorMessage(error.code));
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full my-auto">
      <h2 className="mb-6 font-bold text-hm-plum">회원가입</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full px-10"
      >
        <div
          className={`flex flex-row w-full items-center h-14 px-4 py-1 mb-4 border transition-all rounded-lg ${
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
          className={`flex flex-row w-full items-center h-14 px-4 py-1 mb-4 border transition-all rounded-lg ${
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
                passwordFocus ? "text-xs mb-1" : "text-sm cursor-text"
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
        <div
          className={`flex flex-row w-full items-center h-14 px-4 py-1 mb-4 border transition-all rounded-lg ${
            passwordChkFocus
              ? passwordChk && !passwordValidate
                ? "border-hm-plum"
                : "border-hm-yellow"
              : "border-slate-300 cursor-text"
          }
            `}
        >
          {passwordChk && passwordValidate ? (
            <Check className={`w-6 mr-4 transition-all fill-hm-green`} />
          ) : (
            <Key
              className={`w-6 mr-4 transition-all ${
                passwordChkFocus
                  ? passwordChk && !passwordValidate
                    ? "fill-hm-plum"
                    : "fill-hm-yellow"
                  : "fill-slate-700"
              }`}
            />
          )}
          <div className="flex flex-col justify-end w-full h-full">
            <label
              htmlFor="passwordChk"
              className={`relative block font-medium transition-all text-slate-500 ${
                passwordChkFocus ? "text-xs mb-1" : "text-sm cursor-text"
              }`}
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordChk"
              value={passwordChk}
              onChange={handlePasswordChkChange}
              onFocus={() => setPasswordChkFocus(true)}
              onBlur={() => {
                if (!passwordChk) {
                  setPasswordChkFocus(false);
                } else if (password === passwordChk) {
                  setPasswordValidate(true);
                }
              }}
              className={`text-slate-700 w-full transition-all border-none !outline-none !focus:outline-none appearance-none bg-inherit ${
                passwordChkFocus ? "text-sm" : "text-[8px]"
              }`}
              required
            />
          </div>
        </div>
        <div
          className={`flex flex-row w-full items-center h-14 px-4 py-1 mb-4 border transition-all rounded-lg ${
            displayNameFocus
              ? "border-hm-yellow"
              : "border-slate-300 cursor-text"
          }`}
        >
          <Name
            className={`w-6 mr-4 transition-all ${
              displayNameFocus ? "fill-hm-yellow" : "fill-slate-700"
            }`}
          />
          <div className="flex flex-col justify-end w-full h-full">
            <label
              htmlFor="name"
              className={`relative block font-medium transition-all text-slate-500 ${
                displayNameFocus ? "text-xs mb-1" : "text-sm cursor-text"
              }`}
            >
              이름
            </label>
            <input
              type="name"
              id="name"
              value={displayName}
              onChange={handleNameChange}
              onFocus={() => setDisplayNameFocus(true)}
              onBlur={() => {
                if (!displayName) {
                  setDisplayNameFocus(false);
                }
              }}
              className={`text-slate-700 w-full transition-all border-none !outline-none !focus:outline-none appearance-none bg-inherit ${
                displayNameFocus ? "text-sm" : "text-[8px]"
              }`}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold transition-colors duration-300 rounded-lg shadow-xl h-14 text-slate-700 bg-hm-yellow shadow-hm-yellow/40"
        >
          가입하기
        </button>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
}

export default Join;
