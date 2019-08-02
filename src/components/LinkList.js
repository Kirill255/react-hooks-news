import React, { useState, useEffect, useContext } from "react";

import LinkItem from "./LinkItem";

import { FirebaseContext } from "../firebase";

// location from router
const LinkList = ({ location }) => {
  const [links, setLinks] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const isTopPage = location.pathname.includes("top");

  useEffect(() => {
    const unsubscribe = getLinks();

    return () => unsubscribe();
    // https://github.com/facebook/react/issues/14920
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTopPage]);

  function getLinks() {
    if (isTopPage) {
      // prettier-ignore
      return firebase.db.collection("links").orderBy("voteCount", "desc").onSnapshot(handleSnapshot);
    }
    // prettier-ignore
    return firebase.db.collection("links").orderBy("created", "desc").onSnapshot(handleSnapshot);
  }

  function handleSnapshot(docsSnapshot) {
    console.log(docsSnapshot);
    if (docsSnapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    const linksFromDB = docsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // return a new object with the added id
    setLinks(linksFromDB);
  }

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} link={link} showCount={true} index={index + 1} />
      ))}
    </div>
  );
};

export default LinkList;
