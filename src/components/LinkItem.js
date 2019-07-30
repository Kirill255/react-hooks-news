import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import { FirebaseContext } from "../firebase";
import getDomain from "../utils/getDomain";

// // history from router
const LinkItem = ({ history, link, showCount, index }) => {
  const { user, firebase } = useContext(FirebaseContext);

  async function handleVote() {
    try {
      if (!user) {
        history.push("/login");
      } else {
        const linkRef = firebase.db.collection("links").doc(link.id);
        const doc = await linkRef.get();
        if (!doc.exists) {
          console.log("No such document.");
        } else {
          // console.log(doc.data());
          const previousVotes = doc.data().votes;
          const newVote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, newVote];
          linkRef.update({ votes: updatedVotes });
        }
      }
    } catch (err) {
      console.log("Vote error: ", err);
    }
  }

  async function handleDeleteLink() {
    // we don't check for the user because the link is displayed only if postedByAuthUser
    try {
      const linkRef = firebase.db.collection("links").doc(link.id);
      await linkRef.delete();
      console.log(`Document with ID ${link.id} was deleted.`);
    } catch (err) {
      console.log("Delete link error: ", err);
    }
  }

  const postedByAuthUser = user && user.uid === link.postedBy.id;

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button" onClick={handleVote}>
          ▲
        </div>
      </div>
      <div className="ml1">
        <div>
          {link.description} <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes by {link.postedBy.name} {distanceInWordsToNow(link.created)}
          {" | "}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0 ? `${link.comments.length} comments` : "discuss"}
          </Link>
          {postedByAuthUser && (
            <>
              {" | "}
              <span className="delete-button" onClick={handleDeleteLink}>
                delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(LinkItem);
