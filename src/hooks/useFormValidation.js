import React, { useState } from "react";

const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);

  function handleChange(e) {
    e.persist();
    setValues((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submit");
    console.log({ values });
  }

  return { values, handleChange, handleSubmit };
};

export default useFormValidation;
