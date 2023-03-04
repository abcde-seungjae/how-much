import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        // 로그인 성공
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">로그인</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">이메일</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm appearance-none"
              required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">비밀번호</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm appearance-none"
              required />
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <button type="submit" className="w-full px-4 py-2 text-white transition-colors duration-300 bg-blue-500 rounded-lg hover:bg-blue-600">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default Login