import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';

const HomeTable = ({ da, index, refetch }) => {
   const axiosSecure = useAxiosSecure()
  const {
    _id,
    submission_details,
    submission_image_url,
    task_title,
    payable_amount,
    worker_name,
    task_id,
    worker_email
  } = da;

  const [showModal, setShowModal] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      setShowModal(false);
    }
  };

  const handleApprove = async () => {
    try {
      const result = await Swal.fire({
        title: 'Approve this submission?',
        text: `Pay ${payable_amount} coins to ${worker_name}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Approve',
      });

      if (!result.isConfirmed) return;

      const res = await axiosSecure.patch(`/submission1?id=${_id}&status=approve`, {
        email: worker_email,
        coin: payable_amount,
      });

      if (res.status === 200) {
        toast('Successfully approved', {
          type: 'success',
          theme: 'colored'
        });
        refetch(); // Reload table data
        setShowModal(false);
      } else {
        toast('Approve unsuccessful', {
          type: 'error',
          theme: 'colored'
        });
      }
    } catch (error) {
      console.error('Approve error:', error.response || error);
      toast('Approve unsuccessful', { type: 'error' });
    }
  };

  const handleReject = async () => {
    try {
      const result = await Swal.fire({
        title: 'Reject this submission?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reject',
      });

      if (!result.isConfirmed) return;

      const res = await axiosSecure.patch(`/submission1?id=${_id}&status=rejected`, {
        task_id: task_id,
      });

      if (res.status === 200) {
       
       refetch(); 
        setShowModal(false);
         toast('Successfully rejected',{
          type:'success'
         });

        // Step 2: Increase required_workers by 1
        

       
      } else {
        toast('Rejection unsuccessful',{
          type:'error'
        });
      }
    } catch (error) {
      console.error('Reject error:', error.response || error);
      toast.error('Rejection unsuccessful');
    }
  };

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{worker_name}</td>
        <td>{task_title}</td>
        <td>{payable_amount}</td>
        <td className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-info btn-sm"
          >
            View Submission
          </button>
          <button
            onClick={handleApprove}
            className="btn btn-success btn-sm"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="btn btn-error btn-sm"
          >
            Reject
          </button>
        </td>
      </tr>

      {showModal && (
        <div
          id="modal-backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Submission Details</h3>

            {submission_image_url ? (
              <img
                src={submission_image_url}
                alt="submission"
                className="w-full h-auto rounded"
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-wrap break-words">
                {submission_details || 'No details provided.'}
              </p>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeTable;
