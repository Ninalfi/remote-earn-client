import React from 'react';
import customer from '/assets/customer.jpg';
import ReviewSlider from './ReviewSlider';

const Review = () => {
    

    return (
      <div data-aos="fade-up" data-aos-duration="1500" className='py-20 w-5/6 mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>What Our Users Say</h1>
      <p className='text-center opacity-70 font-medium mt-5 mb-20'>Hear from the people who’ve experienced RemoteEarn — real stories, real success, and how remote-tasking changed their lives.</p>
        <div className='flex flex-col lg:flex-row justify-between items-center  '> 
          <div className='w-full lg:w-[50%]'>
            <img src={customer} className='w-[500px] h-[500px] object-cover object-center rounded-lg'></img>
          </div>
         <div className='w-full lg:w-[50%]'>
          <ReviewSlider ></ReviewSlider> 
          </div>
  
          
        </div>
        </div>
    );
};

export default Review;