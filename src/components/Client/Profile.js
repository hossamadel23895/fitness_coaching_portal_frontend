import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const navigate = useNavigate();

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
    var formdata = new FormData();
    if (name_en != "") {
      formdata.append("name_en", name_en);
    } else {
      formdata.append("name_en", props.client.name_en);
    }

    if (email != "") {
      formdata.append("email", email);
    } else {
      formdata.append("email", props.client.email);
    }

    if (mobile != "") {
      formdata.append("mobile", mobile);
    } else {
      formdata.append("mobile", props.client.mobile);
    }

    if (date_of_birth != "") {
      formdata.append("date_of_birth", date_of_birth);
    } else {
      formdata.append("date_of_birth", props.client.date_of_birth);
    }

    if (image != "") {
      formdata.append("image", image);
    } else {
      formdata.append("image", props.client.image);
    }

    formdata.append("password", password);
    formdata.append("password_confirm", passwordConfirm);
    formdata.append("gender", gender);

    fetch(`http://127.0.0.1:8000/api/update/${props.client.id}?_method=PUT`, {
      method: "POST",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      body: formdata,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response.errors", response.errors);
        if (response.status === 200) {
          setErrors({});
          alert.success(response.message);
          setTimeout(() => {
            window.location.href = "http://localhost:3006/profile";
          }, 1000);
        } else {
          setErrors(response.errors);
          alert.error(response.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert.error(error);
      });
  };
  var profileImage;
  if (profileImg === "") {
    profileImage = (
      <img
        className="rounded-circle img-thumbnail"
        style={{ width: 130, height: 130 }}
        src={"http://127.0.0.1:8000/storage/" + props.client.image}
      />
    );
  } else {
    profileImage = (
      <img
        className="rounded-circle img-thumbnail"
        style={{ width: 130, height: 130 }}
        src={profileImg}
      />
    );
  }

  var validationErrors;
  if (JSON.stringify(errors) != JSON.stringify({})) {
    validationErrors = (
      <ul className="alert alert-danger">
        {Object.keys(errors).map(function (key) {
          return <li key={errors[key]}>{errors[key][0]}</li>;
        })}
      </ul>
    );
  }

  if (props.client) {
    return (
      <React.Fragment>
        <title>Profile</title>
        <div className="container my-4 profile">
          <h3 className="mb-4 font-weight-normal">Manage Profile</h3>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fa fa-user-edit"></i> Edit Info
              </h5>
            </div>
            <div className="card-body">
              {validationErrors}
              <form className="form-signin" onSubmit={submit}>
                <div style={{ textAlign: "center" }}>{profileImage}</div>
                <div className="row">
                  <div className="form-group col-lg-4 col-md-6">
                    <label>Name in English</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(e) => setName_en(e.target.value)}
                      defaultValue={props.client.name_en}
                    />
                  </div>

                  <div className="form-group col-lg-4 col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      defaultValue={props.client.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-lg-4 col-md-6">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      autoComplete="on"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-lg-4 col-md-6">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      autoComplete="on"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-lg-4 col-md-6">
                    <label>Mobile</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      onChange={(e) => setMobile(e.target.value)}
                      defaultValue={props.client.mobile}
                    />
                  </div>

                  <div className="form-group col-lg-4 col-md-6">
                    <label>Date of brith</label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      onChange={(e) => setDate(e.target.value)}
                      defaultValue={props.client.date_of_birth}
                    />
                  </div>

                  <div className="form-group col-lg-4 col-md-6">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      required
                      onChange={(e) => setGender(e.target.value)}
                      defaultValue={props.client.gender}
                    >
                      {options.map((o) => (
                        <option key={o} value={o}>
                          {" "}
                          {o}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-lg-4 col-md-6">
                    <label>Image</label>
                    <input
                      type="file"
                      className="form-control-file"
                      onChange={imageHandler}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-lg btn-dark btn-block w-25">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <title>Profile</title>
      </React.Fragment>
    );
  }
}
