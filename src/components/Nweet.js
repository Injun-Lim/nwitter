import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "./../fBase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are You sure to delete?");
    if (ok) {
      const docRef = doc(dbService, `nweets`, nweetObj.id);
      await deleteDoc(docRef);
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
