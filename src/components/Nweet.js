import React from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner ? (
        <>
          <button>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      ) : null}
    </div>
  );
};

export default Nweet;
