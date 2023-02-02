import { authService } from "fbase";
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
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
    event.preventDefault(); //기본 행위가 실행되는 걸 원치 않는다.
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        //creat account
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        //log in
        const data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  //이전 값을 가져와서 그 값에 반대되는 것을 리턴할 거야.
  const toggleAccount = () => setNewAccount(prev => !prev);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email} //input값들을 가져다 쓰고 싶기때문
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>

      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
