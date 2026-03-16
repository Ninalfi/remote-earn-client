import React, { use, useEffect, useState } from 'react';

import { AuthContext } from '../../../Context/AuthContext';
import PayCard from './PayCard';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
import Spinner from '../../Router/Spinner';
const PaymentHistory = () => {
   const axiosSecure = useAxiosSecure()
    const {user}=use(AuthContext)
    const [data,setData]=useState([])
    const [loading, setLoading] = useState(true); 
    useEffect(()=>{
        axiosSecure.get(`/orders1?email=${user?.email}`)
        .then(res=>{
            setData(res.data)
            setLoading(false);
        }).catch(err=>{
            console.log(err)
            setLoading(false);
        })
    },[user?.email])
     if(loading) return <Spinner/>
    return (
        <div className='w-full bg-secondary h-full'>
        <h1 className='text-3xl font-semibold text-center  pt-20'>Payment History</h1>
         <p className='  text-center py-5 font-semibold opacity-70 pb-20' >  View and manage all the tasks you’ve posted</p>
     {data.length>0?
      <div className="overflow-x-auto pb-20">
  <table className="table w-5/6 mx-auto  bg-white p-10 rounded-lg border-2 border-accent ">
    {/* head */}
    <thead className='text-accent'>
      <tr>
        <th>Sl. no</th>
        <th>Payment ID</th>
        <th>Coins Bought</th>
        <th>Amount(USD)</th>
         <th>Time</th>
      </tr>
    </thead>
    <tbody>
     {
                data.map((da,index)=><PayCard key={da._id} da={da} index={index}></PayCard>)
            }
     
    
      
    </tbody>
  </table>
</div>:
<div >
        <p className='w-5/6 mx-auto text-3xl text-center text-accent font-semibold pb-20'>You haven’t made any payments yet.</p>
      </div>}  
     
            
        </div>
    );
};

export default PaymentHistory;