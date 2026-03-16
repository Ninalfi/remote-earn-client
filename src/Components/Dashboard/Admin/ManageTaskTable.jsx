import React from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import del from '/assets/delete.png'
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
const ManageTaskTable = ({index,da,data,setData}) => {
   const axiosSecure = useAxiosSecure()
       const{
    name,
    user_email,
task_title
,
task_detail
,
required_workers
,
payable_amount
,
completion_date
,
_id
,
task_image_url,
category
}=da
const handleDelete=(id)=>{
 

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    axiosSecure.delete(`/tasks?id=${id}`).
   then(res=>{
      const newdata=data.filter(dat=>dat._id!==id)
      setData(newdata)
     }).catch(err=>{
      toast(err,{
        theme:'colored',
        type:'error'
      })
     })
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
 
}
    return (
          <tr >
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={task_image_url}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{task_title}</div>
              <div className="text-sm opacity-50">{category}</div>
            </div>
            
          </div>
        </td>
        <td>
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-sm opacity-50">{user_email}</div>
            </div>
        </td>
        <td>
         {required_workers} workers
          <br />
          <span className="badge badge-ghost badge-sm">{payable_amount} per worker</span>
        </td>
        <td>{completion_date}</td>
        <th>
         
           <button className="btn btn-error " onClick={()=>handleDelete(_id)}>Delete</button>
        </th>
      </tr>
    );
};

export default ManageTaskTable;