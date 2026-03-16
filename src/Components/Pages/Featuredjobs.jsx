import React, { useEffect, useState } from 'react';

import FeatureCard from './FeatureCard';
import useAxiosSecure from '../Sharedpages/useAxiosSecure';

const Featuredjobs = () => {
     const axiosSecure = useAxiosSecure()
    const [data,setData]=useState([])
    useEffect(()=>{
        axiosSecure.get('/tasks3')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
    return (
        <div data-aos="fade-up" data-aos-duration="1500" className='w-full bg-secondary py-20 my-20'>
        <h1 className='text-3xl font-semibold text-center'>Featured Jobs</h1>
      <p className='text-center opacity-70 font-medium mt-5 mb-20'>Top-rated tasks with the highest rewards, chosen just for you.</p>
        <div className='grid lg:grid-cols-3 w-5/6 mx-auto gap-5'>
            {
                data.map((da,index)=><FeatureCard da={da} index={index}></FeatureCard>)
            }
        </div>
        </div>
    );
};

export default Featuredjobs;