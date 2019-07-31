import React, { useState, useEffect, useContext } from "react";

import LinkItem from "./LinkItem";

import { FirebaseContext } from "../firebase";

// location from router
const LinkList = ({ location }) => {
  const [links, setLinks] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const isNewPage = location.pathname.includes("new");

  useEffect(() => {
    // prettier-ignore
    const unsubscribe = firebase.db.collection("links").orderBy("created", "desc").onSnapshot((docsSnapshot) => {
      console.log(docsSnapshot);
      if (docsSnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      const linksFromDB = docsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // return a new object with the added id
      setLinks(linksFromDB);
    });

    return () => unsubscribe();
    // https://github.com/facebook/react/issues/14920
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLinks = () => {
    if (isNewPage) return links;
    const topLinks = links.slice().sort((a, b) => b.votes.length - a.votes.length);
    return topLinks;
  };

  return (
    <div>
      {renderLinks().map((link, index) => (
        <LinkItem key={link.id} link={link} showCount={true} index={index + 1} />
      ))}
    </div>
  );
};

export default LinkList;
