import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this jweet?");
    console.log("ok는", ok);
    if (ok) {
      //delete jweet
      await deleteDoc(doc(dbService, "jweets", `${jweetObj.id}`));
      if (jweetObj.attachmentUrl !== "") {
        await deleteObject(ref(storageService, jweetObj.attachmentUrl));
      }
    }
  };
  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async event => {
    event.preventDefault();
    console.log(jweetObj, newJweet);
    await updateDoc(doc(dbService, "jweets", `${jweetObj.id}`), {
      text: newJweet, //input에 있는 text
    });
    setEditing(false);
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your jweet"
              value={newJweet}
              required
              onChange={onChange}
            />
            <input
              type="submit"
              value="Update Jweet"
            />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{jweetObj.text}</h4>
          {jweetObj.attachmentUrl && (
            <img
              src={jweetObj.attachmentUrl}
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Jweet</button>
              <button onClick={toggleEditing}>Edite Jweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Jweet;
