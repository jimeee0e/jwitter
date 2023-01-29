import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); //유저의 로그인 여부를 알 수 있게 됨.
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Jwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
