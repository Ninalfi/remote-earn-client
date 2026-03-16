import React from 'react';
import bannerbg from '/assets/bg-slider.webp';

const Slide1 = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bannerbg})` }}
      className="flex flex-col lg:flex-row items-center text-neutral justify-center gap-5 text-center bg-cover bg-center lg:h-[600px] w-full pt-5"
    >
      <div className="w-[95%] lg:w-[55%]">
        <h1 className="text-5xl mb-6  ">
         We find the best jobs for you
        </h1>
        <p className="max-w-2xl mx-auto ">
         Discover thousands of handpicked remote-tasks tailored to your skills. Whether you're a student, freelancer, or side hustler — we connect you with real opportunities to earn, grow, and succeed.
        </p>
      </div>
      <div className="lg:flex hidden  md:flex-row items-center justify-center gap-5 lg:w-[45%]">
        <div className="h-[400px] w-[300px] rounded-2xl overflow-hidden">
          <img
            src="/assets/slide11.webp"
            className="h-full w-full object-center object-cover rounded-xl"
            alt="Slide 1"
          />
        </div>
        <div className="w-[300px]">
          <img
            src="/assets/slide13.webp"
            className="h-[250px] w-full object-center mb-5 object-cover rounded-xl"
            alt="Slide 2"
          />
          <img
            src="/assets/slide12.webp"
            className="h-[250px] w-full object-center object-cover rounded-xl"
            alt="Slide 3"
          />
        </div>
      </div>
    </div>
  );
};

export default Slide1;
