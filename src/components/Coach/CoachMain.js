import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewsCreate from "./ReviewsCreate";
import ReviewsList from "./ReviewsList";
import TimeTable from "./TimeTable";
import CoachInfo from "./CoachInfo";

function CoachCard(props) {
  const [feedback, setFeedback] = useState(false);

  const updateCoachComponent = () => {
    setFeedback(!feedback);
  };

  const [show, setShow] = useState(false);
  const { id } = useParams();

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };
  return (
    <React.Fragment>
      <title>Coaches</title>
      <CoachInfo id={id} />
      <TimeTable id={id} updateMainComponent={props.updateMainComponent} client={props.client} />
      <ReviewsList id={id} feedback={feedback} />
      <ReviewsCreate show={show} id={id} updateCoachComponent={updateCoachComponent} />
    </React.Fragment>
  );
}

export default CoachCard;
