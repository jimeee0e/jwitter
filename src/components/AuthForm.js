import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = event => {
    //심플하게 form을 컨트롤 할 수 있는 방법
    const {
      target: { name, value },
    } = event; //event로 부터 target을 받아옴
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="container">
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          className="authInput"
          onChange={onChange}
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "계정 만들기" : "로그인"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span
        onClick={toggleAccount}
        className="authSwitch">
        {newAccount ? "계정이 있나요?" : "계정이 없나요?"}
      </span>
    </>
  );
};
export default AuthForm;
