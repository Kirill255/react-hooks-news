import React, { useState, useContext, useEffect } from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import LinkItem from "./LinkItem";

import { FirebaseContext } from "../firebase";

// history and match from router
const LinkDetail = ({ history, match }) => {
  const linkId = match.params.linkId;
  const { user, firebase } = useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    getLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getLink() {
    try {
      const linkRef = firebase.db.collection("links").doc(linkId);
      const doc = await linkRef.get();
      if (!doc.exists) {
        console.log("No such document.");
      } else {
        console.log(doc.data());
        const linkFromDB = { id: doc.id, ...doc.data() };
        setLink(linkFromDB);
      }
    } catch (err) {
      console.log("Get link error: ", err);
    }
  }

  async function handleAddComment() {
    try {
      if (!user) {
        history.push("/login");
      } else {
        const linkRef = firebase.db.collection("links").doc(linkId);
        const doc = await linkRef.get();
        if (!doc.exists) {
          console.log("No such document.");
        } else {
          console.log(doc.data());
          const previousComments = doc.data().comments;
          const newComment = {
            text: commentText,
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now()
          };
          const updatedComments = [...previousComments, newComment];
          linkRef.update({ comments: updatedComments });
          setLink((prevState) => ({ ...prevState, comments: updatedComments }));
          setCommentText("");
        }
      }
    } catch (err) {
      console.log("Add comment error: ", err);
    }
  }

  if (!link) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LinkItem link={link} showCount={false} />
      <textarea
        cols="60"
        rows="6"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div>
        <button className="button" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      {link.comments.map((comment, index) => (
        <div key={index}>
          <p className="comment-author">
            {comment.postedBy.name} | {distanceInWordsToNow(comment.created)}
          </p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default LinkDetail;
