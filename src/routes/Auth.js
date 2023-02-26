import { authService } from "fbase";
import React from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";

import {
  AiOutlineTwitter,
  AiOutlineGoogle,
  AiFillGithub,
} from "react-icons/ai";

const Auth = () => {
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
    await signInWithPopup(authService, provide);
  };
  return (
    <div className="authContainer">
      <AiOutlineTwitter
        color={"#3E54AC"}
        size="30"
        style={{ marginBottom: 20 }}
      />
      <h5 className="main-title">
        지금 전 세계에서 무슨 일이
        <br /> 일어나고 있는지 알아보세요.
      </h5>
      <AuthForm />
      <h5 className="auth-title ">다른 계정이 있으신가요?</h5>
      <div className="authBtns">
        <button
          onClick={onSocialClick}
          name="google"
          className="authBtn">
          <AiOutlineGoogle
            color={"#fffbeb"}
            size="20"
          />
        </button>
        <button
          onClick={onSocialClick}
          name="github"
          className="authBtn">
          <AiFillGithub
            color={"#fffbeb"}
            size="20"
          />
        </button>
      </div>
    </div>
  );
};

export default Auth;
