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
        color={"#04AAFF"}
        size="30"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button
          onClick={onSocialClick}
          name="google"
          className="authBtn">
          Continue with Google <AiOutlineGoogle />
        </button>
        <button
          onClick={onSocialClick}
          name="github"
          className="authBtn">
          Continue with Github <AiFillGithub />
        </button>
      </div>
    </div>
  );
};

export default Auth;
