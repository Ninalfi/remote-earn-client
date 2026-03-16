import React from 'react';
import side1 from '/assets/worker.jpg'
import { IoCheckmarkSharp } from "react-icons/io5";
import { Link } from 'react-router';
const ForApplicants = () => {
    return (
         <div className='flex flex-col-reverse lg:flex-row  lg:justify-between items-center gap-10 py-20 w-5/6 mx-auto relative'>
                
                    <div  data-aos="fade-right" data-aos-duration="1500" className='max-w-xl w-full lg:w-[40%]'>
                        <h1 className='text-4xl font-semibold mb-6'>Explore endless job opportunities. Discover what fits you best.</h1>
                        <p className='max-w-xl opacity-70 mb-6'>Browse open positions from across the web. Get a salary estimate tailored to you. Explore company reviews worldwide.</p>
                        <ul className='space-y-2'> 
                            <li className='flex items-center gap-2'><IoCheckmarkSharp  size={24}/>Discover roles tailored to your passion</li>
                            <li className='flex items-center gap-2'><IoCheckmarkSharp  size={24}/>Get insights that guide your next move</li>
                             <li className='flex items-center gap-2'><IoCheckmarkSharp  size={24}/>Explore trusted companies with real reviews</li>
                        </ul>
                     <Link to='/dashboard/tasklist'><button className='bg-accent btn text-white py-6 px-12 rounded-lg mt-6 hover:border-accent hover:bg-white hover:text-accent'>Get Started</button></Link>   
                    </div>
                    <div  data-aos="fade-left" data-aos-duration="1500" className='relative w-full lg:w-[40%] '>
                    <div className='h-[500px] lg:w-[600px] '>
                        <img src={side1} className='h-full w-full object-cover object-center rounded-lg'></img>
                    </div>
                    <div className='absolute -bottom-35 -left-50 hidden lg:flex'>
                       <img src='/assets/employers.png' ></img>
                       </div>
                    </div>
                </div>
    );
};

export default ForApplicants;