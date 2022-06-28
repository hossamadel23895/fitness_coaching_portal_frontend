import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Reset(props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    const token = props.match.params.token;

    fetch("http://localhost:8000/api/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token: token,
        password: password,
        password_confirm: passwordConfirm,
      }),
    })
      .then((response) => {
        setRedirect(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <React.Fragment>
      <title>Reset</title>
      <div
        className=" w-100 d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <form className="form-signin w-50 p-5" onSubmit={submit}>
          <h1 className="h3 mb-3 font-weight-bold text-center text-secondary pb-3">
            Please reset your password
          </h1>

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control mt-2"
            placeholder="Confirm Password"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <button
            className="btn btn-outline-secondary btn-block font-weight-bold py-2 mt-3"
            type="submit"
          >
            Reset password
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Reset;
