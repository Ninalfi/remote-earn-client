import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import loginimg from '/assets/loginimg.jpg';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import Social from './Social';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router';
import useAxiosSecure from '../Sharedpages/useAxiosSecure';

const Register = () => {
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
  const { signup, setUser } = useContext(AuthContext);

  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

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
      const data = await res.json();
      setImageUrl(data.data.display_url);
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
  setEmailExists(false);
  const { email, password, name, role } = data;
  const coin = role === 'Buyer' ? 50 : 10;

  try {
    const res = await signup(email, password, name, imageUrl);

    const userInfo = {
      name,
      email,
      role,
      coin,
      photo: imageUrl,
    };

    await axiosSecure.post('/users', userInfo);
    setUser(userInfo);

    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      confirmButtonColor: '#0ea5e9',
    }).then(() => {
      if (role === 'Admin') {
        navigate('/dashboard/adminhome');
      } else if (role === 'Buyer') {
        navigate('/dashboard/buyerhome');
      } else {
        navigate('/dashboard/workerhome');
      }
    });

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: error.message,
      confirmButtonColor: '#ef4444',
    });
  }
};


  return (
    <div style={{ backgroundColor: '#ccf5ef' }}>
      <section className="w-[95%] lg:w-5/6 mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 ">
        <div className={`lg:max-w-[400px] hidden lg:flex lg:w-1/2 ${imageUrl?"h-[710px]":"h-[600px]"} `}>
          <img src={loginimg} alt="Login visual" className={`w-full  object-cover h-full` }/>
        </div>

        <div className={`w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-xl lg:max-w-md ${imageUrl?"h-[710px]":"h-[600px]"}`} >
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <input {...register('name', { required: 'Name is required' })} className="input input-bordered w-full" placeholder="Name" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            {/* Email */}
            <input {...register('email', { required: 'Email is required' })} className="input input-bordered w-full" placeholder="Email" type="email" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            {emailExists && <p className="text-red-500">Email already exists</p>}

            {/* Password */}
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
                pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/, message: '1 capital and 1 special character needed' },
              })}
              className="input input-bordered w-full"
              placeholder="Password"
              type="password"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            {/* Role */}
            <select {...register('role', { required: 'Select a role' })} className="select select-bordered w-full">
              <option value="">Select Role</option>
              <option value="Worker">Worker</option>
              <option value="Buyer">Buyer</option>
            </select>
            {errors.role && <p className="text-red-500">{errors.role.message}</p>}

            {/* Image Upload */}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input w-full" />
            {uploading && <p className="text-blue-500">Uploading...</p>}
            {imageUrl && <img src={imageUrl} alt="Preview" className="w-20 h-20 mt-2 rounded-full" />}

            <button type="submit" className="btn bg-accent text-white w-full">Register</button>
          </form>

          <div className="divider">OR</div>
          <Social />
          <p className="text-center text-sm mt-4">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
        </div>
      </section>
    </div>
  );
};

export default Register;
