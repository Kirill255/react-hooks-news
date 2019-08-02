import React, { useState, useEffect, useContext } from "react";

import LinkItem from "./LinkItem";

import { FirebaseContext } from "../firebase";
import { LINKS_PER_PAGE } from "../utils";

// location, match, history from router
const LinkList = ({ location, match, history }) => {
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const isNewPage = location.pathname.includes("new");
  const isTopPage = location.pathname.includes("top");
  const page = Number(match.params.page);

  useEffect(() => {
    const unsubscribe = getLinks();

    return () => unsubscribe();
    // https://github.com/facebook/react/issues/14920
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTopPage, page]);

  function getLinks() {
    const hasCursor = Boolean(cursor);
    if (isTopPage) {
      // prettier-ignore
      return firebase.db.collection("links").orderBy("voteCount", "desc").limit(LINKS_PER_PAGE).onSnapshot(handleSnapshot);
    } else if (page === 1) {
      // prettier-ignore
      return firebase.db.collection("links").orderBy("created", "desc").limit(LINKS_PER_PAGE).onSnapshot(handleSnapshot);
    } else if (hasCursor) {
      // prettier-ignore
      return firebase.db.collection("links").orderBy("created", "desc").startAfter(cursor.created).limit(LINKS_PER_PAGE).onSnapshot(handleSnapshot);
    }
  }

  function handleSnapshot(docsSnapshot) {
    console.log(docsSnapshot);
    if (docsSnapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    const linksFromDB = docsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // return a new object with the added id
    const lastLink = linksFromDB[linksFromDB.length - 1];
    setLinks(linksFromDB);
    setCursor(lastLink);
  }

  const visitPreviousPage = () => {
    if (page > 1) {
      history.push(`/new/${page - 1}`);
    }
  };

  const visitNextPage = () => {
    // if page <= total pages
    if (page <= Math.ceil(links.length / LINKS_PER_PAGE)) {
      history.push(`/new/${page + 1}`);
    }
  };

  // const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} link={link} showCount={true} index={index + 1} />
      ))}
      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>
            Previous
          </div>
          <div className="pointer" onClick={visitNextPage}>
            Next
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkList;

/*
const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

<LinkItem key={link.id} link={link} showCount={true} index={index + pageIndex} />
*/
