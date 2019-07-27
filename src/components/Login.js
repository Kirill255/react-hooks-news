import React, { useState } from "react";

import useFormValidation from "../hooks/useFormValidation";
import validateLogin from "../utils/validateLogin";
import firebase from "../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

const Login = (props) => {
  const [login, setLogin] = useState(true);
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

  async function authenticateUser() {
    const { name, email, password } = values;
    const response = login
      ? await firebase.login(email, password)
      : await firebase.register(name, email, password);
    console.log({ response });
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        {!login && (
          <input
            type="text"
            placeholder="Your name"
            autoComplete="off"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        )}
        <input
          className={errors.email && "error-input"}
          type="email"
          placeholder="Your email"
          autoComplete="off"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          className={errors.password && "error-input"}
          type="password"
          placeholder="Choose a secure password"
          name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
