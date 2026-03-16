import React from 'react';

import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';

const ManageUsersTable = ({ da, index, refetch }) => {
  const { _id, name, email, role, coin, photo } = da;
 const axiosSecure = useAxiosSecure()
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to remove ${name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users?id=${_id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Removed!', 'User has been deleted.', 'success');
            refetch(); // refresh the table
          }
        } catch (err) {
          Swal.fire('Error', 'Failed to delete user.', 'error');
          console.log(err);
        }
      }
    });
  };

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    try {
      const res = await axiosSecure.patch(`/users?id=${_id}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        toast.success('Role updated successfully!');
        refetch();
      }
    } catch (err) {
      toast.error('Failed to update role.');
      console.log(err);
    }
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={photo} alt="User Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{email}</div>
          </div>
        </div>
      </td>
      <td>
        <select
          className="select select-sm select-bordered"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="Admin">Admin</option>
          <option value="Buyer">Buyer</option>
          <option value="Worker">Worker</option>
        </select>
      </td>
      <td>{coin} coins</td>
      <td>
        <button
          onClick={handleDelete}
          className="btn btn-error btn-sm"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default ManageUsersTable;
