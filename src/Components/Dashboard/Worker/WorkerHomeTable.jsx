import React from 'react';

const WorkerHomeTable = ({da,index}) => {
    const {
    _id,
    submission_details,
    submission_image_url,
    task_title,
    payable_amount,
    worker_name,
    task_id,
    worker_email,
    Buyer_name,
    status
  } = da;

    return (
         <>
      <tr>
        <th>{index + 1}</th>
        <td>{task_title}</td>
        <td>{payable_amount}</td>
        <td>{Buyer_name}</td>
        <td className='badge badge-success mt-2 text-white'>approved</td>
        
        
      </tr>

     
    </>
    );
};

export default WorkerHomeTable;