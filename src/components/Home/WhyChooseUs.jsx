import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import img1 from "../../static/img/img_1.jpg";

function WhyChooseUs() {
  return (
    <React.Fragment>
      <section className="section stretch-section" data-aos="fade-up">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center mb-5">
              <h2 className="text-uppercase heading border-bottom mb-4">
                Why Captainy?
              </h2>
              <p className="mb-0 lead text-secondary">
                We know that people get so busy in life that they forget to take
                care of their bodies, and finding a good professional coach for
                your specific fitness needs is a hassle, Captainy is here to
                help you find your perfect coach in just few clicks
              </p>
            </div>
          </div>
          <div className="row align-items-center">
            <div
              className="col-md-6 stretch-left-1 "
              data-animate-effect="fadeInLeft"
            >
              <Link to="#" className="video">
                <img src={img1} alt="" className="img-fluid" />
              </Link>
            </div>
            <div
              className="col-md-6 stretch-left-1-offset pl-md-5 pl-0 "
              data-animate-effect="fadeInLeft"
            >
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="media d-block media-feature text-center">
                    <span className="icon fa fa-dumbbell my-4"></span>
                    <div className="media-body">
                      <h3 className="mt-0 text-black">Improve Strength</h3>
                      <p className="text-secondary">
                        Increase your strength with detailed weights plans
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="media d-block media-feature text-center">
                    <span className="icon fa fa-person-running my-4"></span>
                    <div className="media-body">
                      <h3 className="mt-0 text-black">Lose Weight</h3>
                      <p className="text-secondary">
                        Reach your desired weight safely in a short time with a
                        specialist coach
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="media d-block media-feature text-center">
                    <span className="icon fa fa-baseball my-4"></span>
                    <div className="media-body">
                      <h3 className="mt-0 text-black">Learn New Sport</h3>
                      <p className="text-secondary">
                        Always wanting to learn that sport you like? find your
                        motivator coach.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="media d-block media-feature text-center">
                    <span className="icon fa fa-user-ninja my-4"></span>
                    <div className="media-body">
                      <h3 className="mt-0 text-black">Learn Self-defense</h3>
                      <p className="text-secondary">
                        Get trained with the best self-defense coaches{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default WhyChooseUs;
