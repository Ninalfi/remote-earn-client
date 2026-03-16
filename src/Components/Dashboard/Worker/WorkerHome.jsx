import React, { use, useEffect, useState } from 'react';
import Spinner from '../../Router/Spinner';
import { AuthContext } from '../../../Context/AuthContext';
import { FaClock, FaDollarSign } from 'react-icons/fa';
import { CiBoxList } from 'react-icons/ci';
import WorkerHomeTable from './WorkerHomeTable';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const WorkerHome = () => {
   const axiosSecure = useAxiosSecure()
    const {user}=use(AuthContext)
   const [tsubmission,setTsubmission]=useState(0);
  const [psubmission,setPsubmission]=useState(0);
  const [tpayment,setTpayment]=useState(0);
  const [data,setData]=useState([])
   const [loading, setLoading] = useState(true); 
    useEffect(()=>{
        axiosSecure(`/submission2?email=${user?.email}`)
        .then(res=>setTsubmission(res.data.length))
        .catch(err=>console.log(err))
         axiosSecure(`/submission2?workermail=${user?.email}&status=pending`)
        .then(res=>setPsubmission(res.data.length))
        .catch(err=>console.log(err))
         axiosSecure(`/total-payed?email=${user?.email}`)
        .then(res=>setTpayment(res.data.totalPayed))
        .catch(err=>console.log(err))
        axiosSecure(`/submission2?workermail=${user?.email}&status=approve`)
        .then(res=>{setData(res.data)
          setLoading(false);  
        })
        .catch(err=>{console.log(err)
          setLoading(false);  
        })
    },[user?.email])
    if(loading) return <Spinner/>
    return (
      <div className='w-full bg-secondary h-full'>
        <div className='w-5/6 mx-auto py-20'>
        <div className='grid 2xl:grid-cols-3 gap-5  '>
            <div className='flex p-5 items-center shadow-lg rounded-lg  justify-between gap-5'>
                <div className='p-5 bg-orange-500 text-white rounded-lg '><CiBoxList size={30} /></div>
                <div className='flex-col flex flex-end'>
                <p className='text-lg font-semibold '>Total  Submissions:</p>
               <p className='text-2xl font-bold flex justify-end '>{tsubmission}</p>
               </div>
            </div>
             <div className='flex p-5 items-center shadow-lg rounded-lg  justify-between gap-5'>
                <div className='p-5 bg-pink-700 text-white rounded-lg '><FaClock size={30}/></div>
                <div className='flex-col flex flex-end'>
                <p className='text-lg font-semibold '>Total Pending Submissions:</p>
               <p className='text-2xl font-bold flex justify-end '>{psubmission}</p>
               </div>
            </div>
              <div className='flex p-5 items-center shadow-lg rounded-lg  justify-between gap-5'>
                <div className='p-5 bg-cyan-400 text-white rounded-lg '><FaDollarSign size={30} /></div>
                <div className='flex-col flex flex-end'>
                <p className='text-lg font-semibold '>Total Earnings:</p>
               <p className='text-2xl font-bold flex justify-end '>{tpayment}</p>
               </div>
            </div>
            </div>
            <div className='grid md:grid-cols-2 gap-5 w-5/6 mx-auto mt-20'>

  {/* Pie Chart: Submission Status */}
  <div className="shadow-lg p-5 rounded-lg bg-white">
    <h2 className='text-xl font-semibold mb-5 text-center'>Submission Status</h2>
    <PieChart width={400} height={300} className='mx-auto'>
      <Pie
        data={[
          { name: 'Approved', value: data.length },
          { name: 'Pending', value: psubmission },
          { name: 'Total', value: tsubmission }
        ]}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        <Cell fill="#82ca9d" />
        <Cell fill="#ffc658" />
        <Cell fill="#8884d8" />
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>

  {/* Bar Chart: Earnings Overview */}
  <div className="shadow-lg p-5 rounded-lg bg-white">
    <h2 className='text-xl font-semibold mb-5 text-center'>Earnings Overview</h2>
    <BarChart className='mx-auto'
      width={400}
      height={300}
      data={[
        { name: 'Earnings', Amount: tpayment },
        { name: 'Submissions', Amount: tsubmission },
        { name: 'Pending', Amount: psubmission }
      ]}
      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Amount" fill="#82ca9d" />
    </BarChart>
  </div>

</div>
             {data.length>0?
             <div>
            <h1 className='text-3xl font-semibold text-center  pt-20'>Approved Tasks</h1>
           <p className='  text-center py-3 font-semibold opacity-70' >View your approved tasks and track your progress here.</p>
    
     <div className="overflow-x-auto mt-3 ">
        <table className="table  bg-white p-10 rounded-lg  border-accent border-2 ">
          {/* head */}
          <thead>
            <tr className='text-xl'>
              <th className="text-accent ">Sl. no.</th>
              <th className="text-accent w-1/5">Task title</th>
              <th className="text-accent ">Payable amount</th>
              <th className="text-accent ">Buyer Name</th>
              <th className="text-accent ">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((da, index) => (
               <WorkerHomeTable da={da} index={index}></WorkerHomeTable>
              ))
            }
          </tbody>
        </table>
      </div>
      </div>:
      <div >
        <p className='w-5/6 mx-auto text-3xl text-center text-accent font-semibold py-20'>No Approved Tasks Yet.</p>
      </div>
     }       
     
        </div>
        </div>
    );
};

export default WorkerHome;