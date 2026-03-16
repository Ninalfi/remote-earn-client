import React from 'react';
import bannerbg from '/assets/bg-slider.webp';
import bannerbg1 from '/assets/slider14.png';
const Slide3 = () => {
    return (
        <div
              style={{ backgroundImage: `url(${bannerbg})` }}
              className="flex items-center text-neutral justify-center gap-5 text-center bg-cover bg-center  lg:h-[600px] w-full pt-5"
            >
              <div className="w-[95%] lg:w-[50%]">
                <h1 className="text-5xl mb-6  ">
                 Get Your Tasks Done by Real People, Fast
                </h1>
                <p className="max-w-2xl mx-auto ">
                Post simple tasks and watch them get completed by a global pool of reliable workers. Whether it’s promotion, feedback, or surveys — pay only for results, and stay in full control.
                </p>
              </div>
              <div className="hidden lg:flex items-center justify-center gap-5 lg:w-[30%] lg:h-[500px]">
               <img src={bannerbg1} className='h-full object-center object-cover'></img>
              </div>
            </div>
    );
};

export default Slide3;