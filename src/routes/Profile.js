import { authService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  //내 Jweets를 얻는 function을 호출할거야
  const getMyJweets = async () => {};
  useEffect(() => {
    getMyJweets();
    //데이터베이스 서비스
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
