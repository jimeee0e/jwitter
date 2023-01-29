import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const onSubmit = event => {
    event.preventDefault();
  };

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
          value={password} //input값들을 가져다 쓰고 싶기때문
          onChange={onChange}
        />
        <input
          type="submit"
          placeholder="Log In"
        />
      </form>

      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
