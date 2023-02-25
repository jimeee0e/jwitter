import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { BsPlusCircleFill } from "react-icons/bs";
import { RiDeleteBack2Fill } from "react-icons/ri";
//Jweets생성을 담당
const JweeetFactory = ({ userObj }) => {
  const [jweet, setJweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async event => {
    if (jweet === "") {
      return;
    }
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
  };
  return (
    <>
      {" "}
      <form
        onSubmit={onSubmit}
        className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={jweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input
            type="submit"
            value="&rarr;"
            className="factoryInput__arrow"
          />
        </div>
        <label
          htmlFor="attach-file"
          className="factoryInput__label">
          <span>Add photos</span>
          <BsPlusCircleFill />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div
              className="factoryForm__clear"
              onClick={onClearAttachment}>
              <span>Remove</span>
              <RiDeleteBack2Fill />
            </div>
          </div>
        )}
      </form>
    </>
  );
};
export default JweeetFactory;
