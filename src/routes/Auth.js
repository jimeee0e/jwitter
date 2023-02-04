import { authService } from "fbase";
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
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
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        const data = await signInWithEmailAndPassword(auth, email, password);
      }
      // console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  //이전 값을 가져와서 그 값에 반대되는 것을 리턴할 거야.
  const toggleAccount = () => setNewAccount(prev => !prev);
  const onSocialClick = async event => {
    // console.log(event.target.name);
    const {
      target: { name },
    } = event;
    let provide;
    if (name === "google") {
      provide = new GoogleAuthProvider();
    }
    if (name === "github") {
      provide = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provide);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
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
          value={newAccount ? "Sign in" : "Create Account"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Aren't you a member yet?" : "Sign in"}
      </span>
      <div>
        <button
          onClick={onSocialClick}
          name="google">
          Continue with Google
        </button>
        <button
          onClick={onSocialClick}
          name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
