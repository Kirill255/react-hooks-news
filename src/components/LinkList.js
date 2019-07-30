import React, { useState, useEffect, useContext } from "react";

import LinkItem from "./LinkItem";

import { FirebaseContext } from "../firebase";

const LinkList = () => {
  const [links, setLinks] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = firebase.db.collection("links").onSnapshot((docsSnapshot) => {
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

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} link={link} showCount={true} index={index + 1} />
      ))}
    </div>
  );
};

export default LinkList;
