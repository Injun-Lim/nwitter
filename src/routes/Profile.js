import React, { useEffect } from "react";
import { authService, dbService } from "fBase";
import { useHistory } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNweets = async () => {
    const nweetsRef = collection(dbService, "nweets"); //레퍼런스
    const q = await query(
      nweetsRef,
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt")
    ); //쿼리
    const nweetSnapshot = await getDocs(q);
    nweetSnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
