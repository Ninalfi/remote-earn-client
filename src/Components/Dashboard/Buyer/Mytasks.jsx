import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { AuthContext } from '../../../Context/AuthContext';
import MyTaskTable from './MyTaskTable';
import { LineChart } from 'lucide-react';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
import Spinner from '../../Router/Spinner';

const Mytasks = () => {
   const axiosSecure = useAxiosSecure()
    const {user}=use(AuthContext)
    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true); 
    useEffect(()=>{
           axiosSecure.get(`/tasks1?email=${user?.email}`)
           .then(res=>{
            {setData(res.data)
               setLoading(false);
            }
           }).catch(err=>{
            {console.log(err)
               setLoading(false);
            }
           })
    },[user?.email])
  if(loading) return <Spinner/>
    return (
        <div className='w-full bg-secondary h-full '>
         <h1 className='text-3xl font-semibold text-center  pt-20'>My Tasks</h1>
           <p className='  text-center py-5 font-semibold opacity-70 pb-20' >  View and manage all the tasks you’ve posted</p>
           {data.length>0?
            <div className="overflow-x-auto pb-20 ">
  <table className="table w-5/6 mx-auto  bg-white p-10 rounded-lg border-accent border-2 ">
    {/* head */}
    <thead className=' '>
      <tr className='text-xl'>
        <th className='text-accent'>
        Sl. no.
        </th>
        <th className='text-accent'>Task</th>
        <th className='text-accent'>Workers & Payment</th>
        <th className='text-accent'>Deadline</th>
        <th className='text-accent'>Action</th>
      </tr>
    </thead>
    <tbody>
     
     {
        data.map((da,index)=><MyTaskTable da={da} key={index} index={index} data={data} setData={setData}></MyTaskTable>)
     }
    </tbody>
    
   
  </table>
</div>
:
<div className='flex flex-col justify-center items-center'>
        <p className='w-5/6 mx-auto text-3xl text-center text-accent font-semibold pb-10'>No Tasks To Review</p>
       <Link to='/dashboard/addtask'> <button className='btn btn-accent'>Add task</button></Link>
      </div>
} 
          
        </div>
    );
};

export default Mytasks;