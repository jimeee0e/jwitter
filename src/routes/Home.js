import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import Jweet from "components/Jweet";

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, "jweets"));
    onSnapshot(q, snapshot => {
      const jweetArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(jweetArr);
      setJweets(jweetArr);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "jweets"), {
        text: jweet, //jweeet의 value, 즉 state(상태)
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setJweet("");
  };
  //'event로부터' 즉 event안에 있는 target안에 있는 value를 달라!!
  const onChange = ({ target: { value } }) => {
    setJweet(value);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={jweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind"
            maxLength={120}
          />
          <input
            type="submit"
            value="Jweet"
          />
        </form>
        <div>
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
