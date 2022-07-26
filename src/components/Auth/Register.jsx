import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Footer from "../Layout/Footer";
function Register() {
  const alert = useAlert();
  const [profileImg, setProfileImg] = useState("");

  const options = ["male", "female"];
  const [name_en, setName_en] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [mobile, setMobile] = useState("");
  const [date_of_birth, setDate] = useState("");
  const [gender, setGender] = useState(options[0]);
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const submit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8001/sanctum/csrf-cookie", {
      method: "GET",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      credentials: "include",
    })
      .then((res) => {
        var formdata = new FormData();
        formdata.append("name_en", name_en);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("password_confirm", passwordConfirm);
        formdata.append("mobile", mobile);
        formdata.append("date_of_birth", date_of_birth);
        formdata.append("gender", gender);
        formdata.append("image", image);
        fetch("http://localhost:8001/api/register", {
          method: "POST",
          headers: { "X-Requested-With": "XMLHttpRequest" },
          body: formdata,
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.status === 201) {
              setRedirect(true);
              setErrors({});
              alert.success(response.message);
            } else {
              setErrors(response.errors);
              alert.error(response.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var profileImage;
  if (profileImg === "") {
    profileImage = (
      <img
        style={{ width: 100 }}
        src={"http://127.0.0.1:8001/storage/images/clients/default.png"}
      />
    );
  } else {
    profileImage = <img style={{ width: 100 }} src={profileImg} />;
  }

  if (redirect) {
    return <Navigate to="/login" />;
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
      <title>Register</title>
      <div className="login-box bg-dark p-4">
        <div className="login-box-body">
          <p className="login-box-msg">Sign Up</p>
          {validationErrors}
          <form className="form-signin" onSubmit={submit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                required
                placeholder="Name"
                onChange={(e) => setName_en(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-signature"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Mobile"
                required
                onChange={(e) => setMobile(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-phone"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="date"
                className="form-control"
                placeholder="Date Of Birth"
                required
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-calendar-week"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <select
                className="form-control"
                required
                onChange={(e) => setGender(e.target.value)}
              >
                {options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-venus-mars"></span>
                </div>
              </div>
            </div>

            <button
              className="btn btn-dark btn-block btn-flat"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <div className="d-flex justify-content-center my-3">
            <div className="d-flex align-items-end mx-2">Already a member?</div>
            <Link to="/login" className="forgot">
              Login instead.
              <i class="fa fa-arrow-right mx-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
