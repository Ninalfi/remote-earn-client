import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router';
import useAxiosSecure from '../Sharedpages/useAxiosSecure';

const Social = () => {
   const axiosSecure = useAxiosSecure()
  const { gsignup, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlegsignup = () => {
  gsignup()
    .then(async (res) => {
      const guser = res.user;
      const email = guser.email;

      try {
        // Step 1: Check if user already exists
        const response = await axiosSecure.get(`/users?email=${email}`);
        const existingUser = response.data;

        if (existingUser) {
          // Step 2: User exists → Set user & redirect based on role
          setUser(existingUser);

          const redirectPath =
            existingUser.role === 'Worker'
              ? '/dashboard/workerhome'
              : existingUser.role === 'Buyer'
              ? '/dashboard/buyerhome'
              : '/dashboard/adminhome';

          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: `Welcome back, ${existingUser.name || 'User'} 👋`,
            confirmButtonColor: '#0ea5e9',
          }).then(() => navigate(redirectPath));
        } else {
          // Step 3: User doesn't exist → Register as Worker by default
          const userInfo = {
            name: guser.displayName,
            email: guser.email,
            role: 'Worker',
            coin: 10,
            photo: guser.photoURL,
          };

          await axiosSecure.post('/users', userInfo);
          setUser(userInfo);

          Swal.fire({
            icon: 'success',
            title: 'Account Created!',
            text: `Welcome, ${userInfo.name || 'User'} 🎉`,
            confirmButtonColor: '#0ea5e9',
          }).then(() => navigate('/dashboard/workerhome'));
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: err.message,
          confirmButtonColor: '#ef4444',
        });
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: err.message,
        confirmButtonColor: '#ef4444',
      });
    });
};

  return (
    <button className="btn bg-white text-black border-[#e5e5e5] w-full" onClick={handlegsignup}>
      <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <g><path d="m0 0H512V512H0" fill="#fff" /><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" /><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" /><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" /><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" /></g>
      </svg>
      <span className="ml-2">Login with Google</span>
    </button>
  );
};

export default Social;
