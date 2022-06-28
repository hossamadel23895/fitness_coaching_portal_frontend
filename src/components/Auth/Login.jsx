import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAlert } from "react-alert";
function Login(props) {
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const submit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/sanctum/csrf-cookie", {
      method: "GET",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      credentials: "include",
    })
      .then((res) => {
        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);
        fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: { "X-Requested-With": "XMLHttpRequest" },
          credentials: "include",
          body: formdata,
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.status === 200) {
              setErrors({});
              setRedirect(true);
              props.setLogin();
              props.setClient(response);
            } else if (response.status === 401) {
              alert.error(response.message);
              props.setClient([]);
            } else {
              setErrors(response.errors);
              alert.error(response.message);
              //props.setClient([]);
            }
          })
          .catch((error) => {
            console.log(error);
            props.setClient([]);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  var validationErrors;
  if (JSON.stringify(errors) != JSON.stringify({})) {
    console.log("errors", errors);
    validationErrors = (
      <ul className="alert alert-danger">
        {Object.keys(errors).map(function (key) {
          return <li key={errors[key]}>{errors[key][0]}</li>;
        })}
      </ul>
    );
  }

  return (
    <React.Fragment>
      <title>Login</title>
      <div className="login-box bg-dark p-4">
        <div className="login-box-body">
          <p className="login-box-msg">Login</p>
          {validationErrors}
          <form className="form-signin" onSubmit={submit}>
            <label className="labelBtn">Your Email</label>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <label className="labelBtn">Your password</label>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <button
              className="btn btn-dark btn-block btn-flat mt-4"
              type="submit"
            >
              Login
            </button>
            <div className="row my-3">
              <div className="col-8">
                <div className="icheck-primary">
                  <input
                    type="checkbox"
                    id="remember"
                    name="rememberme"
                    value="1"
                  />
                  <label className="labelBtn" htmlFor="remember">
                    Remember Me
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className="mb-3">
            <Link to="/forgot" className="forget">
              Forgot password?
            </Link>
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex align-items-end mx-2">Not a member?</div>
            <Link to="/register" className="forgot">
              Register Here
              <i class="fa fa-arrow-right mx-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
