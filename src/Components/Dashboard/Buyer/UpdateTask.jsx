import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../../Context/AuthContext';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';
import Spinner from '../../Router/Spinner';
const UpdateTask = () => {
  const [loading, setLoading] = useState(true); 
   const axiosSecure = useAxiosSecure()
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const { user,setUser } = useContext(AuthContext);

  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

 useEffect(() => {
  axiosSecure.get(`/tasks1?id=${id}`)
    .then(res => {
      const fetchedData = res.data;
      setData(fetchedData);
       setLoading(false);
      reset(fetchedData);
     
      if (!imageUrl && fetchedData.task_image_url) {
        setImageUrl(fetchedData.task_image_url);
      }
    })
    .catch(err => {
      console.log("Data not fetched", err);
       setLoading(false);
    });
}, [id, reset]);


  const handleImageUpload = async (e) => {
  const image = e.target.files[0];
  if (!image) return;

  const formData = new FormData();
  formData.append('image', image);

  setUploading(true);
  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      setImageUrl(result.data.display_url);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Failed to upload image. Please try again.',
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Upload Error',
      text: 'Something went wrong while uploading the image.',
    });
  } finally {
    setUploading(false);
  }
};


  const onSubmit = async (formData) => {
  if (!user?.email || !data) return;

  const required_workers = parseInt(formData.required_workers);
  const payable_amount = parseInt(formData.payable_amount);

  if (isNaN(required_workers) || isNaN(payable_amount)) {
    return Swal.fire({
      icon: 'error',
      title: 'Invalid Input',
      text: 'Please enter valid numbers for Required Workers and Payable Amount.',
    });
  }

  const updatedTotal = required_workers * payable_amount;
  const previousTotal = data.required_workers * data.payable_amount;
  const coinDifference = updatedTotal - previousTotal;

  // If updatedTotal exceeds user's coin balance
  if (coinDifference > user.coin) {
    return Swal.fire({
      icon: 'warning',
      title: 'Insufficient Coins',
      text: `You need ${coinDifference - user.coin} more coins to update this task.`,
      confirmButtonText: 'Buy Coins',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/dashboard/purchasecoin');
      }
    });
  }

  const { _id, ...rest } = formData;

  const taskData = {
    ...rest,
    required_workers,
    payable_amount,
    task_image_url: imageUrl,
    user_email: user?.email,
  };
 
  const updateTask = () => {
    axiosSecure.put(`/tasks?id=${id}`, taskData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Task Updated!',
          text: 'The task was successfully updated.',
          timer: 2000,
          showConfirmButton: false
        });
        navigate('/dashboard/mytasks');
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Could not update the task. Please try again later.'
        });
        console.log(err);
      });
  };

  // Handle coin difference adjustment
  if (coinDifference > 0) {
    await axiosSecure.patch('/users1', {
      email: user.email,
      addcoin: -coinDifference
    });
     setUser(prev=>({
          ...prev,
          coin:prev.coin-coinDifference
         }))
    updateTask();
  } else if (coinDifference < 0) {
    await axiosSecure.patch('/users1', {
      email: user.email,
      addcoin: Math.abs(coinDifference)
    });
    setUser(prev=>({
          ...prev,
          coin:prev.coin-coinDifference
         }))
    updateTask();
  } else {
    updateTask();
  }
};
if(loading) return <Spinner/>
  return (
    <div className='bg-secondary w-full h-full pb-20'>
  <h1 className='text-3xl font-semibold text-center py-20'>Update Task</h1>
 <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-4 grid lg:grid-cols-2 gap-6 w-5/6 mx-auto bg-white p-10 rounded-lg"
>
  <div className="lg:col-span-2">
    <label className="block mb-1 font-medium">
      Task Title <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      {...register('task_title', { required: 'Task title is required' })}
      placeholder="e.g. Watch my YouTube video and comment"
      className="input input-bordered w-full h-12 bg-secondary text-base"
    />
    {errors.task_title && (
      <p className="text-red-500 text-sm mt-1">{errors.task_title.message}</p>
    )}
  </div>

  <div className="lg:col-span-2">
    <label className="block mb-1 font-medium">
      Task Details <span className="text-gray-500 text-sm">(optional)</span>
    </label>
    <textarea
      {...register('task_detail')}
      placeholder="Detailed description of the task"
      className="textarea textarea-bordered w-full h-24 bg-secondary text-base"
    ></textarea>
  </div>

  <div>
    <label className="block mb-1 font-medium">
      Required Workers <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      {...register('required_workers', {
        required: 'Required workers is required',
        min: { value: 1, message: 'Must be at least 1 worker' },
      })}
      placeholder="e.g. 100"
      className="input input-bordered w-full h-12 bg-secondary text-base"
    />
    {errors.required_workers && (
      <p className="text-red-500 text-sm mt-1">{errors.required_workers.message}</p>
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">
      Payable Amount per Worker <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      {...register('payable_amount', {
        required: 'Payable amount is required',
        min: { value: 1, message: 'Amount must be greater than 0' },
      })}
      placeholder="e.g. 10"
      className="input input-bordered w-full h-12 bg-secondary text-base"
    />
    {errors.payable_amount && (
      <p className="text-red-500 text-sm mt-1">{errors.payable_amount.message}</p>
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">
      Completion Date <span className="text-red-500">*</span>
    </label>
    <input
      type="date"
      {...register('completion_date', { required: 'Completion date is required' })}
      className="input input-bordered w-full h-12 bg-secondary text-base"
    />
    {errors.completion_date && (
      <p className="text-red-500 text-sm mt-1">{errors.completion_date.message}</p>
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">
      Submission Info <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      {...register('submission_info', { required: 'Submission info is required' })}
      placeholder="e.g. Screenshot or proof"
      className="input input-bordered w-full h-12 bg-secondary text-base"
    />
    {errors.submission_info && (
      <p className="text-red-500 text-sm mt-1">{errors.submission_info.message}</p>
    )}
  </div>

  <div>
    <label className="block mb-1 font-medium">
      Category <span className="text-red-500">*</span>
    </label>
    <select
      {...register('category', { required: 'Category is required' })}
      className="select select-bordered w-full h-12 bg-secondary text-base"
    >
      <option value="">-- Select Category --</option>
      <option value="Video Engagement">Video Engagement</option>
      <option value="Content Writing">Content Writing</option>
      <option value="Translation">Translation</option>
      <option value="Image Handling">Image Handling</option>
      <option value="App & Website Testing">App & Website Testing</option>
      <option value="Creative Design">Creative Design</option>
      <option value="Data Entry">Data Entry</option>
      <option value="SEO & Marketing">SEO & Marketing</option>
      <option value="Survey & Feedback">Survey & Feedback</option>
    </select>
    {errors.category && (
      <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
    )}
  </div>

  <div className="lg:col-span-2">
    <label className="block mb-1 font-medium">
      Upload Task Image <span className="text-gray-500 text-sm">(optional)</span>
    </label>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="file-input file-input-bordered w-full h-12 bg-secondary text-base"
    />
    {uploading && <p className="text-blue-500 mt-2">Uploading image...</p>}
    {imageUrl && (
      <img
        src={imageUrl}
        alt="Uploaded Preview"
        className="w-40 h-40 object-cover mt-3 rounded-lg border"
      />
    )}
  </div>

  <button
    type="submit"
    className="btn btn-primary w-full lg:col-span-2 h-12 bg-accent text-white text-lg"
  >
    Update Task
  </button>
</form>

</div>

  );
};

export default UpdateTask;
