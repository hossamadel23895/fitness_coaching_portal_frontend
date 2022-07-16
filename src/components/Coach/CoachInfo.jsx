import React, { useEffect, useState } from "react";

function CoachInfo(props) {
  const [coachInfo, setCoachInfo] = useState([{}]);
  useEffect(() => {
    getCoachInfo(props.id);
  }, []);

  //Get Coach Info
  function getCoachInfo(coachId) {
    fetch(`http://localhost:8000/api/coaches/${coachId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((res) => {
        setCoachInfo(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <section className="booking-coach-info py-5">
        <div className="container">
          <div className="coach-info">
            <div className="row m-0">
              {coachInfo ? (
                <React.Fragment>
                  <div className="col-lg-2 col-md-3 col-sm-4 py-4 px-4">
                    <img
                      className="img-thumbnail photo"
                      src={
                        "http://127.0.0.1:8000/storage/" + coachInfo[0].image
                      }
                    />

                    <div className="rating mt-4 text-center">
                      <i className="fas fa-star fa-3x">
                        <span>{coachInfo[0].total_rate | 0}</span>
                      </i>
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-9 col-sm-8 py-4 px-0 data">
                    <h3>{coachInfo[0].name_en}</h3>
                    <h6>
                      <i className="fa fa-book-bookmark"></i>
                      {coachInfo[0].specialist
                        ? coachInfo[0].specialist.name_en
                        : " "}
                    </h6>
                  </div>
                  <div className="col-lg-5 col-sm-12 py-4 px-4">
                    <div className="location"></div>
                  </div>
                </React.Fragment>
              ) : (
                <p>No Coach Info Available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export default CoachInfo;
