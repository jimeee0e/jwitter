import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import Jweet from "components/Jweet";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);
  const [attachment, setAttachment] = useState(""); //default는 없음.
  // const fileInput = useRef();

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

  const onSubmit = async event => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
      // console.log(
      //   "getDownloadURL(response.ref)야.",
      //   await getDownloadURL(attachmentUrl)
      // );
    }

    const jweetObj = {
      text: jweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "jweets"), jweetObj);
    setJweet("");
    setAttachment("");
  };
  //'event로부터' 즉 event안에 있는 target안에 있는 value를 달라!!
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };

  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      console.log("finishedEvent야", finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment("");
    // fileInput.current.value = null;
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
            type="file"
            accept="image/*"
            onChange={onFileChange}
            // ref={fileInput}
          />
          <input
            type="submit"
            value="Jweet"
          />
          {attachment && (
            <div>
              <img
                src={attachment}
                width="50px"
                height="50px"
              />
              <button onClick={onClearAttachment}>Clear</button>
            </div>
          )}
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
