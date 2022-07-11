import Nweet from "components/Nweet";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "./../fBase";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  //forEach 사용 방법, useEffect에서 호출
  const getNweets = async () => {
    //const dbNweets = await dbService.collection("nweets").get(); 대신
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    dbNweets.forEach((document) => {
      //   console.log(document.data());
      const nweetObject = {
        ...document.data(),
        id: document.id, //document에서 id값 가져오기 (db의 문서id)
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(() => {
    // getNweets();
    // onSnapshot(collection(dbService, "nweets"), (snapshot) => {
    //   const nweetArray = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data,
    //   }));
    //   setNweets(nweetArray);
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };
  const onChange = (event) => {
    setNweet(event.target.value);
  };
  //   console.log(nweets);
  return (
    <div>
      <form>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" onClick={onSubmit} />
      </form>
      <div>
        {nweets.map((data) => (
          <Nweet
            key={data.id}
            nweetObj={data}
            isOwner={data.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
