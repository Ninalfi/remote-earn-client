import React from 'react';
import bannerbg from '/assets/bg-slide12.png';
import bannerbg1 from '/assets/bg-slider.webp';
const Slide2 = () => {
    return (
        <div  style={{ backgroundImage: `url(${bannerbg1})` }}
              className="flex  flex-col items-center text-neutral justify-center gap-5 text-center bg-cover bg-center lg:h-[600px] w-full pt-5">
             
        <div>
         <h1 className="text-5xl mb-6 text-black z-10  ">
          Endless Opportunities, One Platform
        </h1>
        <p className="max-w-2xl mx-auto mb-5 ">
          There are thousands of remote-tasks waiting for you. Complete simple jobs, earn coins, and build your future — all from your fingertips.
        </p>
          <div className='hidden lg:flex'><img src={bannerbg} className=' w-full object-cover '/></div>  
        </div>
        </div>
    );
};

export default Slide2;