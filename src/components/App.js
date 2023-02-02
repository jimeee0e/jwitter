import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
// import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false); //초기화 전 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //어떻게 기다리냐면
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true);
        const uid = user.uid;
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "잠시만 기다려봐"}
    <footer>&copy; Jwitter {new Date().getFullYear()}</footer>
  </>;
}

export default App;
