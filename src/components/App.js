import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userObj, setUserObj] = useState(null);
  //어떻게 기다리냐면
  useEffect(() => {
    const auth = getAuth();
    //만약 로그인된다면 onAuthStateChanged 호출될 것이다.
    //우린 로그인 한 user를 받게된다.
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "잠시만 기다려봐"
      )}
    </>
  );
}

export default App;
