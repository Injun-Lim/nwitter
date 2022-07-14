import Nweet from "components/Nweet";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "./../fBase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

  //forEach 사용 방법, useEffect에서 호출
  // const getNweets = async () => {
  //   //const dbNweets = await dbService.collection("nweets").get(); 대신
  //   const dbNweets = await getDocs(collection(dbService, "nweets"));
  //   dbNweets.forEach((document) => {
  //     //   console.log(document.data());
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id, //document에서 id값 가져오기 (db의 문서id)
  //     };
  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };
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
    let fileUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }

    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: fileUrl,
    });

    setNweet("");
    fileInput.current.value = ""; //useRef에서 선언한 부분
    setAttachment("");
  };
  const onChange = (event) => {
    setNweet(event.target.value);
  };
  const onChangeFile = (event) => {
    setAttachment("");
    const theFile = event.target.files[0];
    // console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => {
    fileInput.current.value = ""; //useRef에서 선언한 부분
    setAttachment("");
  };

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
        <input
          type="file"
          accept="image/*"
          onChange={onChangeFile}
          ref={fileInput}
        />
        <input type="submit" value="Nweet" onClick={onSubmit} />
        {attachment ? (
          <div>
            <img src={attachment} width="50px" height="50px" alt="preview" />
            <button onClick={onClearAttachmentClick}>Clear Photo</button>
          </div>
        ) : null}
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
