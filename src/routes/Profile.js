import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      /*  firebase에 있는 profile을 업데이트 시켜준 후, 
    react.js에 있는 profile을 새로고침 해준다.*/
      refreshUser();
    }
  };
  //   const getMyJweets = async () => {
  //     const getMyJweetsQuery = query(
  //       collection(dbService, "jweets"),
  //       where("creatorId", "==", userObj.uid)
  //     );

  //     const querySnapsot = await getDocs(getMyJweetsQuery);
  //     querySnapsot.forEach(doc => {
  //       console.log(doc.id, "=>", doc.data());
  //     });
  //   };

  //   useEffect(() => {
  // getMyJweets();
  //     //데이터베이스 서비스
  //   }, []);

  return (
    <div className="container">
      {" "}
      <form
        onSubmit={onSubmit}
        className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />{" "}
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span
        className="formBtn cancelBtn logOut"
        onClick={onLogOutClick}>
        {" "}
        Log Out
      </span>
    </div>
  );
};

export default Profile;
