import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false); //firebase가 초기화되기를 기다림, 그런 다음에 로그인여부 상태 바뀌어야함
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, user => {
      if (user) {
        setUserObj(user);
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
        console.log("유저 있니 없니", user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "잠시만 기다려봐"
      )}
    </>
  );
}

export default App;
