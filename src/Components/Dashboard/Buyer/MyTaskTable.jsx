import React, { use } from 'react';
import del from '/assets/delete.png'
import edi from '/assets/edit.png'
import { Link, NavLink } from 'react-router';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
const MyTaskTable = ({index,da,data,setData}) => {
   const axiosSecure = useAxiosSecure()
  const {user,setUser}=use(AuthContext)
   const{
    
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
    axiosSecure.delete(`/tasks1?id=${id}`).
   then(res=>{
    const tamount=required_workers*payable_amount;
    axiosSecure.patch(`/users1`,{email:user?.email,addcoin:tamount})
    .then(res1=>{
 const newdata=data.filter(dat=>dat._id!==id)
      setData(newdata)
      setUser(prev => ({
  ...prev,
  coin: prev.coin + tamount,
}));

    })
     
      



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
         {required_workers} workers
          <br />
          <span className="badge badge-ghost badge-sm">{payable_amount} per worker</span>
        </td>
        <td>{completion_date}</td>
        <th>
       <Link to={`/dashboard/updatetask/${_id}`}><button className="btn btn-ghost btn-circle"><img src={edi} className='w-9'></img> </button></Link>   
           <button className="btn btn-ghost btn-circle" onClick={()=>handleDelete(_id)}><img src={del} className='w-10'></img></button>
        </th>
      </tr>
    );
};

export default MyTaskTable;