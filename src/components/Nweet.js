import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "./../fBase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are You sure to delete?");
    if (ok) {
      const docRef = doc(dbService, `nweets`, nweetObj.id);
      await deleteDoc(docRef);
      const fileRef = ref(storageService, nweetObj.attachmentUrl);
      await deleteObject(fileRef)
        .then(() => {
          //파일 삭제 성공시 실행 부분
        })
        .catch((error) => {
          //에러 발생시 실행 부분
        });
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChangeText = (event) => {
    setNewNweet(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const docRef = doc(dbService, `nweets`, nweetObj.id);
    updateDoc(docRef, { text: newNweet });
    toggleEditing();
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newNweet}
              required
              onChange={onChangeText}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt="nweet photos"
            />
          )}
          {isOwner ? (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Nweet;
