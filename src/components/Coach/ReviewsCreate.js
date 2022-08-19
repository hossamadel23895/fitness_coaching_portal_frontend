import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useAlert } from "react-alert";

function ReviewsCreate(props) {
  const [rate, setRate] = useState("");
  const [comment, setComment] = useState("");

  const alert = useAlert();

  const cookies = new Cookies();
  const isAuthenticated = cookies.get("jwt");

  //Send Rate and Comment of Client on Coach
  const submit = (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      let formData = {};
      formData.rate = rate;
      formData.comment = comment;
      formData.client_id = 1;
      formData.coach_id = props.id;

      fetch(`http://127.0.0.1:8001/api/feedbacks`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          props.updateCoachComponent();
        })
        .catch((error) => {
          console.log("error", error);
        });
    }else{
      alert.error("You have to login first to be able to Submit a review");
    }
  };

  return (
    <React.Fragment>
      <section class="rate-and-comment">
        <div class="container">
          <div class="card mb-5">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="fa fa-star-half-alt"></i> Add Review and Comment
              </h5>
            </div>
            <div class="card-body">
              <form name="review" onSubmit={submit} method="POST">
                <div class="modal-body modal-rating">
                  <div class="rating">
                    <input
                      type="radio"
                      name="rating"
                      value="5"
                      id="5"
                      onChange={(e) => setRate(e.target.value)}
                    />
                    <label for="5">☆</label>
                    <input
                      type="radio"
                      name="rating"
                      value="4"
                      id="4"
                      onChange={(e) => setRate(e.target.value)}
                    />
                    <label for="4">☆</label>
                    <input
                      type="radio"
                      name="rating"
                      value="3"
                      id="3"
                      onChange={(e) => setRate(e.target.value)}
                    />
                    <label for="3">☆</label>
                    <input
                      type="radio"
                      name="rating"
                      value="2"
                      id="2"
                      onChange={(e) => setRate(e.target.value)}
                    />
                    <label for="2">☆</label>
                    <input
                      type="radio"
                      name="rating"
                      value="1"
                      id="1"
                      onChange={(e) => setRate(e.target.value)}
                    />
                    <label for="1">☆</label>
                  </div>
                  <h5>Review</h5>
                  <textarea
                    name="comment"
                    class="form-control"
                    id="comment"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-dark">
                    Send Feedback
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={props.close}
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default ReviewsCreate;
