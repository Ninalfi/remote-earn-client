import React from 'react';
import { BsDot } from "react-icons/bs";
import { Link } from 'react-router';
import { FaArrowRightLong } from "react-icons/fa6";
const FeatureCard = ({da,index}) => {
    const {task_image_url,task_title,
completion_date,
payable_amount,
task_detail,
_id


}=da
    return (
        <div>
  <div className='overflow-hidden rounded-lg'>
    <img
      src={task_image_url}
      className='h-[300px] w-full object-center object-cover rounded-lg transition-transform duration-300 hover:scale-110'
      alt='Task'
    />
  </div>
  <div className='mt-2 flex justify-between items-end'>
  <div>
    <p className='opacity-70 flex items-center'>
      {completion_date} <BsDot size={30} /> {payable_amount} coins
    </p>
    <p className='text-2xl font-semibold'>{task_title}</p>
     <p className='text-sm'>{task_detail}</p>
     </div>
  <Link to={`/dashboard/tasklist/${_id}`}> <p className='text-accent'><FaArrowRightLong  size={30}/></p></Link>
  </div>
</div>

    );
};

export default FeatureCard;