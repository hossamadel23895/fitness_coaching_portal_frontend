import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../static/img/logo.png"; // with import
import { TransitionGroup } from "react-transition-group";

function Footer() {
  return (
    <footer
      className="site-footer pb-5 pt-2 bg-dark"
      role="contentinfo"
      style={{ maxWidth: "100%", overflowX: "hidden" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="d-flex justify-content-center mt-4">
              <img
                src={logo}
                alt="Coach_Booking_Logo"
                className="w-50"
                style={{ height: "auto" }}
              />
            </div>
            <p className="my-2 text-center">
            © Captainy Fitness Coaching Portal
            </p>
          </div>
          <div className="col-md-4 mb-3 mt-5">
            <h3>Links</h3>
            <ul className="footer-link list-unstyled">
              <li>
                <a href="http://localhost:8000/coach/">Coaches System</a>
              </li>
              <li>
                <Link to="">Policies</Link>
              </li>
            </ul>
          </div>
          <div className=" mt-5">
            <h3>Contacts </h3>

            <h4 className="text-uppercase mb-2 h6 text-white">Email</h4>
            <p className="mb-2">
              <Link to="mailto:info@yourdomain.com">info@yourdomain.com</Link>
            </p>
            <h4 className="text-uppercase mb-2 h6 text-white">Phone</h4>
            <p>+1 24 435 3533</p>
          </div>
        </div>

        <div className="row pt-md-3 ">
          <div className="col-md-12">
            <hr className="border-t" />
          </div>
          <div className="col-md-6 col-sm-12 copyright">
            <p>
              &copy; 2022 Captainy Fitness Coaching Portal &amp; All Rights Reserved
            </p>
          </div>
          <div className="col-md-6 col-sm-12 text-md-right text-sm-left">
            <Link to="#" className="p-2">
              <span className="fab fa-facebook"></span>
            </Link>
            <Link to="#" className="p-2">
              <span className="fab fa-github"></span>
            </Link>
            <Link to="#" className="p-2">
              <span className="fab fa-linkedin-in"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
