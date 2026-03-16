import React, { useEffect, useState } from 'react';

import ManageUsersTable from './ManageUsersTable';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
import Spinner from '../../Router/Spinner';
const ManageUsers = () => {
  const [loading, setLoading] = useState(true); 
  const [data, setData] = useState([]);
 const axiosSecure = useAxiosSecure()
  const refetch = () => {
    axiosSecure.get('/users3')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    refetch();
  }, []);
if(loading) return <Spinner/>
  return (
    <div className="w-full bg-secondary pb-20">
    <div className='w-5/6 mx-auto'>
      <h1 className="text-3xl font-semibold text-center py-20">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table  bg-white p-10 rounded-lg border-2 border-accent">
          {/* head */}
          <thead>
            <tr className='text-xl '>
              <th className="text-accent ">Sl. no.</th>
              <th className="text-accent w-1/5">User Info</th>
              <th className="text-accent ">Role</th>
              <th className="text-accent ">Coin</th>
              <th className="text-accent ">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((da, index) => (
                <ManageUsersTable
                  key={da._id}
                  da={da}
                  index={index}
                  refetch={refetch}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ManageUsers;
