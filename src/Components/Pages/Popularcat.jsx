import React, { use, useEffect, useState } from 'react';

import CatCard from './CatCard';
import useAxiosSecure from '../Sharedpages/useAxiosSecure';



const Popularcat = () => {
     const axiosSecure = useAxiosSecure()
    const [data,setData]=useState([])
   
    useEffect(()=>{
        axiosSecure.get('/categories')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
    return (
        <div data-aos="fade-up" data-aos-duration="1500" className='w-full bg-secondary py-20 my-20'>
        <h1 className='text-3xl font-semibold text-center'>Popular Job Categories</h1>
      <p className='text-center opacity-70 font-medium mt-5 mb-20'>Explore the most in-demand job categories to discover opportunities tailored to your skills and interests.</p>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 w-5/6 mx-auto gap-5'>
            {
                data.map((da,index)=><CatCard da={da} index={index}></CatCard>)
            }
        </div>
        </div>
    );
};

export default Popularcat;