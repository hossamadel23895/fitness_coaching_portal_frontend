import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAlert } from "react-alert";
import { Select } from "semantic-ui-react";
import SearchTable from "./SearchTable";
import SearchBar from "./SearchBar";

import "./SearchMain.css";

function MainHome() {
  const [coaches, setCoaches] = useState([]);
  const updateCoaches = (coaches) => setCoaches(coaches);
  return (
    <React.Fragment>
      <title>Home</title>
      <div className="search-bar">
        <SearchBar updateCoaches={updateCoaches} />
      </div>
      {coaches && coaches.length && <SearchTable coaches={coaches} />}
    </React.Fragment>
  );
}

export default MainHome;
