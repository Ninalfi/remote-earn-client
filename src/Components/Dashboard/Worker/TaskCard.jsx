import React from 'react';
import { FaUser } from 'react-icons/fa';
import { CiCalendarDate } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import { LuUsers } from 'react-icons/lu';
import { Link } from 'react-router';
const TaskCard = ({da}) => {
   // console.log(da)
    const {name,payable_amount,completion_date,task_title,required_workers,_id}=da
    return (
        <div className='p-4 bg-white h-[300px] rounded-lg shadow-xl'>
        <div className='h-[80%]'>
            <h1 className='text-3xl mb-4 h-[33%] font-semibold text-accent '>{task_title}</h1>
            <div className=''>
            <p className='flex gap-2 items-center'><FaUser />Buyer : {name}</p>
             <p className='flex gap-2 items-center'><CiCalendarDate />Due : {completion_date}</p>
              <p className='flex gap-2 items-center'><FiDollarSign />Payment : ${payable_amount}</p>
               <p className='flex gap-2 items-center mb-4'><LuUsers />Workers Needed : {required_workers}</p>
               </div>
               </div>
             <Link to={`/dashboard/tasklist/${_id}`}><button className='btn w-full btn-accent text-white '>View Details</button></Link>   
        </div>
    );
};

export default TaskCard;