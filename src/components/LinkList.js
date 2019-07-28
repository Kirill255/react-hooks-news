import React from "react";

import useAuth from "../hooks/useAuth";

const LinkList = () => {
  const user = useAuth();
  if (user) {
    console.log(user.toJSON()); // firebase метод объекта user https://firebase.google.com/docs/reference/js/firebase.User.html
  }
  return <div>LinkList</div>;
};

export default LinkList;
