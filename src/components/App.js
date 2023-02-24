import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, user => {
      if (user) {
        setUserObj(user);
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
        console.log(user);
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
