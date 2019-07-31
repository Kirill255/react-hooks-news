import React, { useState, useEffect, useContext } from "react";

import LinkItem from "./LinkItem";

import { FirebaseContext } from "../firebase";

const Search = () => {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getInitialLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getInitialLinks() {
    try {
      const linksRef = firebase.db.collection("links");
      const docsSnapshot = await linksRef.get();
      console.log(docsSnapshot);
      if (docsSnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      const linksFromDB = docsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLinks(linksFromDB);
    } catch (err) {
      console.log("Get initial links error: ", err);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.toLowerCase();
    const matchedLinks = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(q) ||
        link.url.toLowerCase().includes(q) ||
        link.postedBy.name.toLowerCase().includes(q)
      );
    });
    setFilteredLinks(matchedLinks);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          Search <input onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">OK</button>
        </div>
      </form>
      {filteredLinks.map((link, index) => (
        <LinkItem key={link.id} link={link} showCount={false} index={index} />
      ))}
    </div>
  );
};

export default Search;
