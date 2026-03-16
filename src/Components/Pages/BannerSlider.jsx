// BannerSlider.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel CSS
import Slide1 from "../Slides/Slide1";
import Slide2 from "../Slides/Slide2";
import Slide3 from "../Slides/Slide3";

const BannerSlider = () => {
  return (
    <div className=" max-h-[600px]">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={2000}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
      >
        <div>
        <Slide1></Slide1>
          
        </div>
        <div>
          <Slide2></Slide2>
        </div>
        <div>
           <Slide3></Slide3>
        </div>
      </Carousel>
    </div>
  );
};

export default BannerSlider;
