import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../../Router/Spinner';
import { AuthContext } from '../../../Context/AuthContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import HomeTable from './HomeTable';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const BuyerHome = () => {
  const [loading, setLoading] = useState(true); 
   const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext);
  const [workers, setWorkers] = useState(0);
  const [taskcount, setTaskcount] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [data,setData]=useState([])
const fetchSubmissions = () => {
    axiosSecure(`/submission1?email=${user?.email}&status=pending`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));

      axiosSecure(`/total-required-workers?email=${user?.email}`)
      .then(res => {
        setWorkers(res.data.totalRequiredWorkers);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    axiosSecure(`/total-required-workers?email=${user?.email}`)
      .then(res => {
        setWorkers(res.data.totalRequiredWorkers);
      })
      .catch(err => console.log(err));

    axiosSecure(`/tasks?email=${user?.email}`)
      .then(res => {
        setTaskcount(res.data.length);
      })
      .catch(err => console.log(err));

    axiosSecure(`/total-payment?email=${user?.email}`)
      .then(res => {
        setTotalPayment(res.data.totalPayment);
        
      })
      .catch(err => console.log(err));
      axiosSecure(`/submission1?email=${user?.email}&status=pending`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {console.log(err)
        setLoading(false);
      });
  }, [user?.email]);
 if(loading) return <Spinner/>
  const cards = [
    {
      label: 'Pending tasks',
      value: workers,
      color: '#4F46E5',
      tailwindColor: 'text-blue-500',
      max: 300
    },
    {
      label: 'Total Tasks',
      value: taskcount,
      color: '#059669',
      tailwindColor: 'text-green-600',
      max: 50
    },
    {
      label: 'Total Payment',
      value: totalPayment,
      color: '#D97706',
      tailwindColor: 'text-yellow-600',
      max: 200
    },
  ];

  return (
    <div className='w-full bg-secondary h-full'>
    <div className="p-6 grid lg:grid-cols-3 gap-6 w-5/6 mx-auto pt-20">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white shadow-md h-[150px] w-full rounded-xl px-6 py-4 flex items-center justify-between">
        <div>
          <p className={`text-2xl font-medium  ${card.tailwindColor}`}>{card.label}</p>
           <p className="text-4xl font-bold ">{card.label === 'Total Payment' ? `$${card.value}` : card.value}</p>
            </div>
          <div className="w-20 h-20 mx-auto">
            <CircularProgressbar className=''
              value={card.value}
              maxValue={card.max}
              text={`${card.label === 'Total Payment' ? '$' : ''}${card.value}`}
              styles={buildStyles({
                textColor: card.color,
                pathColor: card.color,
                trailColor: '#E5E7EB',
              })}
            />
          </div>

         
        </div>
      ))}
    </div>
    <div className="w-5/6 mx-auto mt-20 grid md:grid-cols-2 gap-6">
  {/* Pie Chart: Task Distribution */}
  <div className="bg-white shadow-md rounded-xl p-5">
    <h2 className="text-xl font-semibold text-center mb-4">Task Distribution</h2>
    <PieChart width={400} height={300} className='mx-auto'>
      <Pie 
        data={[
          { name: "Pending", value: workers },
          { name: "Total", value: taskcount },
        ]}
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
        dataKey="value"
      >
        <Cell fill="#4F46E5" />
        <Cell fill="#059669" />
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>

  {/* Bar Chart: Payment vs Tasks */}
  <div className="bg-white shadow-md rounded-xl p-5">
    <h2 className="text-xl font-semibold text-center mb-4">Payment Overview</h2>
    <BarChart className='mx-auto' width={400} height={300} data={[
      { name: "Total Tasks", value: taskcount },
      { name: "Pending Tasks", value: workers },
      { name: "Total Payment", value: totalPayment },
    ]}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#D97706" />
    </BarChart>
  </div>
</div>
    {data.length>0? 
    <div className="overflow-x-auto py-20 ">
        <table className="table w-5/6 mx-auto bg-white py-20 rounded-lg border-2  border-accent">
          {/* head */}
          <thead>
            <tr className='text-xl'>
              <th className="text-accent ">Sl. no.</th>
              <th className="text-accent w-1/5">Worker Name</th>
              <th className="text-accent ">Task title</th>
              <th className="text-accent ">Payable amount</th>
              <th className="text-accent ">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((da, index) => (
               <HomeTable da={da} index={index} refetch={fetchSubmissions}></HomeTable>
              ))
            }
          </tbody>
        </table>
      </div>:
       <div >
        <p className='w-5/6 mx-auto text-3xl text-center text-accent font-semibold py-20'>No Tasks To Review</p>
      </div>}
      
    
    </div>
  );
};

export default BuyerHome;
