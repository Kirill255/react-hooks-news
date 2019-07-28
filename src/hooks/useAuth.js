import React, { useState, useEffect } from "react";

import firebase from "../firebase";

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    // дока firebase.auth().onAuthStateChanged(), но у нас в class Firebase {} сохранена ссылка на this.auth = app.auth(), поэтому firebase.auth.onAuthStateChanged()
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return authUser;
};

export default useAuth;
