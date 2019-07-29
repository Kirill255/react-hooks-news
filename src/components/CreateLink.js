import React, { useState, useContext } from "react";

import { FirebaseContext } from "../firebase";
import useFormValidation from "../hooks/useFormValidation";
import validateCreateLink from "../utils/validateCreateLink";

const INITIAL_STATE = {
  description: "",
  url: ""
};

// history from router
const CreateLink = ({ history }) => {
  const { user, firebase } = useContext(FirebaseContext);
  const [createLinkError, setCreateLinkError] = useState(null);
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);

  async function handleCreateLink() {
    try {
      if (!user) {
        history.push("/login");
      } else {
        const { description, url } = values;
        const newLink = {
          description,
          url,
          postedBy: {
            id: user.uid,
            name: user.displayName
          },
          votes: [],
          comments: [],
          created: Date.now()
        };
        await firebase.db.collection("links").add(newLink);
        history.push("/");
      }
    } catch (err) {
      console.log("Create link error: ", err);
      setCreateLinkError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        className={errors.description && "error-input"}
        type="text"
        placeholder="A description for your link"
        autoComplete="off"
        name="description"
        value={values.description}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        className={errors.url && "error-input"}
        type="url"
        placeholder="The URL for the link"
        autoComplete="off"
        name="url"
        value={values.url}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      {createLinkError && <p className="error-text">{createLinkError}</p>}
      <button
        type="submit"
        className="button"
        disabled={isSubmitting}
        style={{ background: isSubmitting ? "grey" : "orange" }}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateLink;
