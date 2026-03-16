import React, { use } from 'react';
import { set, useForm } from 'react-hook-form';
import loginimg from '/assets/loginimg.jpg'
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import Social from './Social';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../Sharedpages/useAxiosSecure';
import axios from 'axios';
const Login = () => {
  const axiosSecure=useAxiosSecure()
   const navigate=useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
const {signin,user,setUser,setLoad}=use(AuthContext)
  const onSubmit = (data) => {
  const { email, password } = data;

  signin(email, password)
  .then(async (res) => {
    const idToken = await res.user.getIdToken();
    const res1 = await axios.get(`http://localhost:5000/users?email=${res.user?.email}`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });

    const userInfo = res1.data; 

    setUser(userInfo); // still set it for global use
    setLoad(false);

    Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: `Welcome back, ${res.user.displayName || 'User'} 👋`,
      confirmButtonColor: '#0ea5e9',
    });

    if (userInfo.role === 'Admin') {
      navigate('/dashboard/adminhome');
    } else if (userInfo.role === 'Buyer') {
      navigate('/dashboard/buyerhome');
    } else {
      navigate('/dashboard/workerhome');
    }
  })
  .catch((err) => {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed!',
      text: err.message || 'Something went wrong',
      confirmButtonColor: '#ef4444',
    });
  });

};


  return (
    <div style={{ backgroundColor: '#ccf5ef' }} >
    <section className="w-[95%] lg:w-5/6 mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 ">
      
      <div className="hidden lg:flex max-w-[400px] lg:w-1/2 mb-10 lg:mb-0">
        <img
          src={loginimg} // Replace with a better remote-tasking-related image if needed
          alt="Task Image"
          className="w-full  max-h-[500px] object-center object-cover"
        />
      </div>

      {/* Right side login form */}
      <div className="w-full lg:w-1/2  bg-white p-8 rounded-lg shadow-xl max-w-md h-[500px] ">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="form-control mt-4">
            <button type="submit" className="btn bg-accent text-white w-full">
              Login
            </button>
           
         
          </div>
           
        </form>
          <div className="divider">OR</div>
          <Social></Social>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <a className="text-blue-600 hover:underline" href="/register">Register</a>
        </p>
      </div>
    </section>
    </div>
  );
};

export default Login;
