import React, { useEffect, useState } from 'react';

import ManageTaskTable from './ManageTaskTable';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
import Spinner from '../../Router/Spinner';
const MangaeTask = () => {
   const axiosSecure = useAxiosSecure()
     const [data,setData]=useState([])
     const [loading, setLoading] = useState(true); 
    useEffect(()=>{
        axiosSecure.get('/tasks')
        .then(res=>{ 
            setData(res.data) 
             setLoading(false);    

        }).then(err=>{
            console.log(err)
             setLoading(false);
        })
    },[])
     if(loading) return <Spinner/>
    return (
        <div className='w-full bg-secondary pb-20'>
        <div className='w-5/6 mx-auto'>
         <h1 className='text-3xl font-semibold text-center  py-20'>Manage Tasks</h1>
            <div className="overflow-x-auto">
  <table className="table   bg-white p-10 rounded-lg border-2 border-accent">
    {/* head */}
    <thead >
      <tr className='text-xl '>
        <th className='text-accent'>
        Sl. no.
        </th>
        <th className='text-accent'>Task</th>
        <th className='text-accent'>Buyer</th>
        <th className='text-accent'>Workers & Payment</th>
        <th className='text-accent'>Deadline</th>
        <th className='text-accent'>Action</th>
      </tr>
    </thead>
    <tbody>
     
     {
        data.map((da,index)=><ManageTaskTable da={da} key={index} index={index} data={data} setData={setData}></ManageTaskTable>)
     }
    </tbody>
    
   
  </table>
</div>
        </div>
        </div>
    );
};

export default MangaeTask;