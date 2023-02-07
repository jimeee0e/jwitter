import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const Home = () => {
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);

  const getJweets = async () => {
    const q = query(collection(dbService, "jweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      const jweetObj = {
        ...doc.data,
        id: doc.id,
      };
      setJweets(prev => [jweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getJweets();
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "jweets"), {
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
  console.log(jweets);

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
        <div>
          {jweets.map(jweet => (
            <div key={jweet.id}>
              <h4>{jweet.jweet}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
