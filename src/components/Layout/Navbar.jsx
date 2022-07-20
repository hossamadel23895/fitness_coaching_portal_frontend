import React, { useState } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import "react-dropdown/style.css";
import logo from "../../static/img/logo.png";
import logo2 from "../../static/img/logo2.png";
import Cookies from "universal-cookie";

function Navbar(props) {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get("jwt");
  const logout = () => {
    fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        props.setClient("");
        props.setLogin();
      })
      .catch((err) => console.log(err));
  };

  let links;

  if (typeof isAuthenticated === "undefined") {
    links = (
      <ul className="navbar-nav my-2 my-lg-0">
        <li className="nav-item h5">
          <NavLink to="login" className="nav-link mt-2">
            Login
          </NavLink>
        </li>
        <li className="nav-item h5">
          <NavLink to="register" className="nav-link mt-2">
            Register <i class="fa-solid fa-arrow-right-to-bracket "></i>
          </NavLink>
        </li>
      </ul>
    );
  } else {
    links = (
      <ul className="navbar-nav my-2 my-lg-0">
        <li className="nav-item h5">
          <img
            style={{ width: 40, height: 40 }}
            className="rounded-circle"
            alt="profile pic"
            src={"http://127.0.0.1:8000/storage/" + props.client.image}
          />
          <NavLink
            style={{ display: "inline-block" }}
            to="profile"
            className="nav-link"
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link h5" to="my-appointments">
            Appointments
          </NavLink>
        </li>
        <li className="nav-item h5">
          <NavLink to="login" onClick={logout} className="nav-link">
            Logout
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <React.Fragment>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img src={logo} alt="fitness-coaching" />
            </NavLink>
            <NavLink className="navbar-brand" to="/">
              <img
                src={logo2}
                alt="fitness-coaching"
                style={{ width: "100px", height: "auto" }}
              />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample05"
              aria-controls="navbarsExample05"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample05">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item h5">
                  <NavLink className="nav-link mt-2" to="/">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item h5">
                  <NavLink className="nav-link mt-2" to="search">
                    Coaches
                  </NavLink>
                </li>
                <li className="nav-item h5">
                  <NavLink className="nav-link mt-2" to="contact-us">
                    Contact us
                  </NavLink>
                </li>
              </ul>
              {links}
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}

export default Navbar;
