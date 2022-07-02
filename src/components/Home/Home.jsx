import React, { useState } from "react";
import SearchBar from "../Search/SearchBar";
import Carousels from "./Carousels";
import WhyChooseUs from "./WhyChooseUs";
import HowToUse from "./HowToUse";
import Aos from "aos";
import "aos/dist/aos.css";

function Home() {
  Aos.init();
  return (
    <React.Fragment>
      <title>Captainy</title>
      <Carousels />
      <div style={{ marginTop: "150px" }}></div>
      <SearchBar />
      <WhyChooseUs />
      <HowToUse />
    </React.Fragment>
  );
}

export default Home;
