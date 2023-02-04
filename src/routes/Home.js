import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]); //기본값 array

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "jweet"), {
        jweet,
        createdAt: Date.now(),
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
            value="Nweet"
          />
        </form>
      </div>
    </>
  );
};
export default Home;
