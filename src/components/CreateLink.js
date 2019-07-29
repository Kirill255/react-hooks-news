import React from "react";

import useFormValidation from "../hooks/useFormValidation";
import validateCreateLink from "../utils/validateCreateLink";

const INITIAL_STATE = {
  description: "",
  url: ""
};

const CreateLink = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    console.log("Link created!");
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
        type="text"
        placeholder="The URL for the link"
        autoComplete="off"
        name="url"
        value={values.url}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateLink;
