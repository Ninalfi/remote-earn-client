import React from 'react';
import { CiClock1 } from 'react-icons/ci';
import { FaClock } from 'react-icons/fa';

const MyTasksTable = ({index,da}) => {
  
    const {Buyer_name,Buyer_email,status,task_title,payable_amount}=da
    return (
         <tr >
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            
            <div>
              <div className="font-bold">{task_title}</div>
              
            </div>
          </div>
        </td>
        <td>
         {Buyer_name}
          <br />
          <span className="badge badge-ghost badge-sm">{Buyer_email}</span>
        </td>
        <td>${payable_amount}</td>
        <td >
     {status=='pending'&&<p className='badge badge-ghost font-semibold flex items-center '>Pending</p> }
     {status=='rejected'&&<p className='badge badge-error font-semibold  '> Rejected</p> }
     {status=='approve'&&<p className='badge badge-success font-semibold flex items-center '> Approved</p> }
        </td>
      </tr>
    );
};

export default MyTasksTable;