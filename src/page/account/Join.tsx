import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import "firebase/auth";
import React from "react";

interface UserWithUpdateProfile extends User {
  updateProfile: (profile: {
    displayName?: string | null;
  }) => Promise<void>;
}

const auth = getAuth();

function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user as UserWithUpdateProfile;

        user.updateProfile({
          displayName: displayName
        })
        .then(() => {
          console.log("사용자 정보 업데이트 성공");
        })
        .catch((error) => {
          console.log("사용자 정보 업데이트 실패", error);
        });
      })
      .catch((error) => {
        console.log("사용자 생성 실패", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold">회원가입</h1>
      <label className="mb-2">
        이메일
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full p-2 border border-gray-400"
        />
      </label>
      <label className="mb-2">
        비밀번호
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full p-2 border border-gray-400"
        />
      </label>
      <label className="mb-4">
        이름
        <input
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          className="w-full p-2 border border-gray-400"
        />
      </label>
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
        가입하기
      </button>
    </form>
  );
}

export default Join;