import React, { useState } from "react";

function Forgot() {
  const [email, setEmail] = useState("");
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8001/api/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => {
        setNotify({
          show: true,
          error: false,
          message: "Email was sent!",
        });
      })
      .catch((error) => {
        console.log(error);

        setNotify({
          show: true,
          error: true,
          message: "Email does not exist!",
        });
      });
  };

  let info;

  if (notify.show) {
    info = (
      <div
        className={notify.error ? "alert alert-danger" : "alert alert-success"}
        role="alert"
      >
        {notify.message}
      </div>
    );
  }

  return (
    <React.Fragment>
      <title>Forgot</title>
      <div
        className=" w-100 d-flex justify-content-center align-items-center"
        style={{ minHeight: "250px" }}
      >
        <form className=" form-signin w-50 p-5" onSubmit={submit}>
          {info}

          <h1 className="h3 mb-3 font-weight-bold text-center text-secondary pb-3">
            Please set your email
          </h1>

          <input
            type="email"
            className="form-control mb-4 "
            placeholder="Email address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="btn btn-outline-secondary btn-block font-weight-bold py-2 "
            type="submit"
          >
            Send Email
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Forgot;
