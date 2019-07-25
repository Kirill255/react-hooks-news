import React, { useState } from "react";

import useFormValidation from "../hooks/useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

const Login = (props) => {
  const { values, handleChange, handleSubmit } = useFormValidation(INITIAL_STATE);
  const [login, setLogin] = useState(true);

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
          type="email"
          placeholder="Your email"
          autoComplete="off"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Choose a secure password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
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
