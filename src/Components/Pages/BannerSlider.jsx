// BannerSlider.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Slide1 from "../Slides/Slide1";
import Slide2 from "../Slides/Slide2";
import Slide3 from "../Slides/Slide3";

const BannerSlider = () => {
  const slides = [Slide1, Slide2, Slide3];

  return (
    <section className="w-full max-h-[600px] overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showArrows
        showThumbs={false}
        showStatus={false}
        stopOnHover
        swipeable
        emulateTouch
      >
        {slides.map((SlideComponent, index) => (
          <div key={index}>
            <SlideComponent />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default BannerSlider;