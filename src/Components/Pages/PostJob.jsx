import React, { useEffect, useState } from 'react';
import side1 from '/assets/side1.jpg'
import { IoCheckmarkSharp } from "react-icons/io5";

import { Link } from 'react-router';
import useAxiosSecure from '../Sharedpages/useAxiosSecure';
import Spinner from '../Router/Spinner';
const PostJob = () => {
  const [loading, setLoading] = useState(true); 
   const axiosSecure = useAxiosSecure()
  const [data,setData]=useState([])
  useEffect(()=>{
      axiosSecure.get(`users?role=Worker`)
        .then(res=>{setData(res.data)
           setLoading(false); 
        })
        .catch(err=>{console.log(err)
           setLoading(false); 
        })
  },[])
  if(loading) return <Spinner/>
    return (
        <div className='flex flex-col  lg:flex-row  lg:justify-between  items-center gap-10 py-20 w-5/6 mx-auto'>
        <div data-aos="fade-right" data-aos-duration="1500" className='relative w-full lg:w-[40%]'>
            <div className='h-[500px] lg:max-w-[600px]'>
                <img src={side1} className='h-full w-full object-cover object-center rounded-lg'></img>
            </div>
            <div className='lg:flex flex-col w-[250px] lg:w-[220px] xl:w-[250px] justify-center border bg-white border-gray-300 rounded-lg absolute -bottom-20 hidden lg:left-[26vw]'>
  {/* Fixed Header */}
  <h1 className='bg-accent p-3 text-center text-white rounded-t-lg'>Applicants list</h1>

  {/* Scrollable list */}
  <div className='flex flex-col gap-3 h-[200px] overflow-y-auto'>
    {
      data.map(da => (
        <div className='px-2 bg-white'>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={da.photo}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{da.name}</div>
              <div className="text-sm opacity-50">Asia</div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
</div>

            </div>
            <div data-aos="fade-left" data-aos-duration="1500" className='max-w-xl w-full lg:w-[40%]'>
                <h1 className='text-4xl font-semibold mb-6'>Get applications from the world best talents.</h1>
                <p className='max-w-xl opacity-70 mb-6'>Search all the open positions on the web. Get your own
                personalized salary estimate. Read reviews on 
                companies worldwide.</p>
                <ul className='space-y-2'> 
                    <li className='flex items-center gap-2'><IoCheckmarkSharp  size={24}/>Bring to the table win-win survival</li>
                    <li className='flex items-center gap-2'><IoCheckmarkSharp  size={24}/>Capitalize on low hanging fruit to identify</li>
                     <li className='flex items-center gap-2'><IoCheckmarkSharp  size={24}/>But I must explain to you how all this</li>
                </ul>
             <Link to='/dashboard/addtask'><button className='bg-accent btn text-white py-6 px-12 rounded-lg mt-6 hover:border-accent hover:bg-white hover:text-accent'>Post a job</button></Link> 
            </div>
        </div>
    );
};

export default PostJob;