import React, { useState, useEffect } from "react";

const useFormValidation = (initialState, validate, authenticate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0; // {}
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        console.log("Errors");
        console.log({ errors });
        setSubmitting(false);
      }
    }
  }, [authenticate, errors, isSubmitting, values]);

  function handleChange(e) {
    e.persist();
    setValues((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit };
};

export default useFormValidation;
