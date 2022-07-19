import React, { useState } from "react";

function HowToUse() {
  return (
    <React.Fragment>
      <section className="section steps" data-aos="fade-up">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center mb-5">
              <h2 className="text-uppercase heading border-bottom mb-4">
                How It Works
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="media d-block media-feature text-center">
                <span className="icon fa fa-search my-4"></span>
                <div className="media-body">
                  <h3 className="mt-0">
                    <span className="number mx-2">1</span>
                    Search
                  </h3>
                  <p className="text-secondary">
                    Search For Expert Coach and Filter The Result in Different
                    Way
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="media d-block media-feature text-center">
                <span className="icon fa fa-user-check my-4"></span>
                <div className="media-body">
                  <h3 className="mt-0">
                    <span className="number mx-2">2</span>
                    Choose
                  </h3>
                  <p className="text-secondary">
                    Choose the best suitable coach, Read other people reviews
                    about him.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="media d-block media-feature text-center">
                <span className="icon fa fa-calendar-alt my-4"></span>
                <div className="media-body">
                  <h3 className="mt-0">
                    <span className="number mx-2">3</span>
                    Book an online session
                  </h3>
                  <p className="text-secondary">
                    Book An Appointment with your favorite coach, And get a full
                    private session with the coach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default HowToUse;
