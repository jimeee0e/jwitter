import { authService } from "fbase";
import React from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";

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
    <div>
      <AuthForm />
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
