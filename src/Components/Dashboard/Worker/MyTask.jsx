import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../Context/AuthContext';
import MyTasksTable from './MyTasksTable';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
import Spinner from '../../Router/Spinner';
const MyTask = () => {
     const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
 const [loading, setLoading] = useState(true); 
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/submission2?email=${user.email}`)
                .then(res => {setData(res.data)
                    setLoading(false);
                })
                .catch(err => {console.log(err)
                    setLoading(false);
                });

            axiosSecure.get(`/user-preference?email=${user.email}`)
                .then(res => {
                    if (res.data?.itemsPerPage) {
                        setItemsPerPage(res.data.itemsPerPage);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [user?.email]);

    const handleItemsPerPageChange = (e) => {
        const selected = parseInt(e.target.value);
        setItemsPerPage(selected);
        setCurrentPage(1);

        axiosSecure.post('/user-preference', {
            email: user.email,
            itemsPerPage: selected
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
if(loading) return <Spinner/>
    return (
        <div className='w-full bg-secondary h-full'>
       {data.length>0?<div className='w-5/6 mx-auto py-20'>
            <h1 className='text-3xl font-semibold text-center '>My Tasks</h1>
           <p className='  text-center py-5 font-semibold opacity-70' > Your tasks at a glance.</p>
            <div className='flex justify-end  mb-4 '>
                <label className='mr-2 text-accent font-medium'>Items per page:</label>
                <select onChange={handleItemsPerPageChange} value={itemsPerPage} className='border px-2 py-1 rounded'>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table  bg-white p-10 rounded-lg border-2 border-accent">
                    <thead>
                        <tr className='text-xl'>
                            <th className='text-accent'>Sl. no.</th>
                            <th className='text-accent'>Task</th>
                            <th className='text-accent'>Buyer</th>
                            <th className='text-accent'>Payment</th>
                            <th className='text-accent'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((da, index) => (
                                <MyTasksTable
                                    da={da}
                                    key={index}
                                    index={indexOfFirstItem + index}
                                    data={data}
                                    setData={setData}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-between items-center w-5/6 mx-auto mt-6'>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className='px-4 py-2 bg-accent text-white rounded disabled:opacity-50'
                >
                    Prev
                </button>

                <div className='text-lg font-medium'>
                    Page {currentPage} of {totalPages}
                </div>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className='px-4 py-2 bg-accent text-white rounded disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </div>:
        <div >
        <p className='w-5/6 mx-auto text-3xl text-center text-accent font-semibold py-20 flex items-center justify-center'>No Submitted Tasks Yet.</p>
      </div>} 
        </div>
    );
};

export default MyTask;
