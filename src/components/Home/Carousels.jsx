import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bg1 from "../../static/img/slider-2.jpg";
import bg2 from "../../static/img/slider-1.jpg";
// import 'react-multi-carousel/lib/styles.css';

function Carousels() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <React.Fragment>
      <section className="home-slider owl-carousel">
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2500}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          dotListClass="custom-dot-list-style"
        >
          <div
            className="slider-item"
            style={{ backgroundImage: `url(${bg1})` }}
          >
            <div className="container">
              <div className="slider-text">
                <div
                  className="d-flex justify-content-center align-items-end w-100"
                  style={{
                    fontSize: "70px",
                    marginBottom: "40px",
                    height: "330px ",
                    textShadow: "1px 1px 0px gray",
                  }}
                >
                  Forge Your New Lifestyle
                </div>
                <p
                  className="d-flex justify-content-center align-items-end w-100"
                  style={{ fontSize: "30px" }}
                >
                  Your perfect coach is just a few clicks away
                </p>
              </div>
            </div>
          </div>

          <div
            className="slider-item"
            style={{ backgroundImage: `url(${bg2})` }}
          >
            <div className="container">
              <div className="slider-text ">
                <div
                  className="d-flex justify-content-center align-items-end w-100"
                  style={{
                    fontSize: "70px",
                    marginBottom: "40px",
                    height: "330px ",
                    textShadow: "1px 1px 0px gray",
                  }}
                >
                  Forge Your New Lifestyle
                </div>
                <p
                  className="d-flex justify-content-center align-items-end w-100"
                  style={{ fontSize: "30px" }}
                >
                  Your perfect coach is just a few clicks away
                </p>
              </div>
            </div>
          </div>
        </Carousel>
      </section>
    </React.Fragment>
  );
}

export default Carousels;
