import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, query } from "firebase/firestore";
import Jweet from "components/Jweet";
import JweeetFactory from "components/JweeetFactory";

const Home = ({ userObj }) => {
  const [jweets, setJweets] = useState([]);
  useEffect(() => {
    const q = query(collection(dbService, "jweets"));
    onSnapshot(q, snapshot => {
      const jweetArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJweets(jweetArr);
    });
  }, []);

  return (
    <>
      <div className="jweet-container ">
        <JweeetFactory userObj={userObj} />
        <div style={{ marginTop: 20 }}>
          {jweets.map(jweet => (
            <Jweet
              key={jweet.id}
              jweetObj={jweet}
              isOwner={jweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
