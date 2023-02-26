import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

import { BsTrash, BsPencilSquare } from "react-icons/bs";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState([jweetObj.text]);
  // const [newJJweet, setNewJJweet] = useState([jweetObj.creatorName]);

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
    console.log("너 뭐들어있냐고", jweetObj, newJweet);
    await updateDoc(doc(dbService, "jweets", `${jweetObj.id}`), {
      text: newJweet, //input에 있는 text
    });
    setEditing(false);
  };
  const onChange = event => {
    const {
      target: { value, value2 },
    } = event;
    setNewJweet(value);
  };
  return (
    <div className="jweet">
      {editing ? (
        <>
          <form
            onSubmit={onSubmit}
            className="container jweetEdit">
            <input
              type="text"
              placeholder="Edit your jweet"
              value={newJweet}
              required
              autoFocus
              onChange={onChange}
            />

            <input
              type="submit"
              value="Update Jweet"
              className="formBtn"
            />
          </form>
          <span
            onClick={toggleEditing}
            className="formBtn cancelBtn">
            Cancel
          </span>
          {/* <button onClick={toggleEditing}>Cancle</button> */}
        </>
      ) : (
        <>
          <h4 className="username">{jweetObj.creatorName}</h4>
          <h4>{jweetObj.text}</h4>

          {jweetObj.attachmentUrl && <img src={jweetObj.attachmentUrl} />}

          {isOwner && (
            <div className="jweet__actions">
              <span onClick={onDeleteClick}>
                <BsTrash />
              </span>
              <span onClick={toggleEditing}>
                <BsPencilSquare />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Jweet;
