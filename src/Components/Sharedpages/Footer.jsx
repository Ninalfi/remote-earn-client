import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import { VscSendToRemoteAgent } from "react-icons/vsc";

const Footer = () => {
     const listworker=<div className='space-y-2'>
        <NavLink to='/dashboard/workerhome'><p className=' mb-2 font-medium'>Home</p></NavLink>
         <NavLink to='/dashboard/tasklist'><p className='mb-2  font-medium'>Task List</p></NavLink>
          <NavLink to='/dashboard/mysubmissions'><p className=' mb-2 font-medium'>My Submissions</p></NavLink>
           <NavLink to='/dashboard/withdraw'><p className=' mb-2 font-medium'>Withdrawals</p></NavLink>
    </div>
    const listbuyer=<div className='space-y-2'>
        <NavLink to='/dashboard/buyerhome'><p className='mb-2  font-medium'>Home</p></NavLink>
         <NavLink to='/dashboard/addtask'><p className='mb-2  font-medium'>Add New Task</p></NavLink>
          <NavLink to='/dashboard/mytasks'><p className=' mb-2 font-medium'>My Tasks</p></NavLink>
           <NavLink to='/dashboard/purchasecoin'><p className='mb-2  font-medium'>Purchase Coin</p></NavLink>
           <NavLink to='/dashboard/paymenthistory'><p className=' mb-2 font-medium'>Payment History</p></NavLink>
    </div>
    return (
        <div className='bg-[#555555] text-white py-20 rounded-t-4xl '>
        <div className='flex flex-wrap flex-col md:flex-row justify-between items-start w-5/6 mx-auto pb-4'>
        <div className='flex flex-col'>
         <Link to='/'>  <div className="flex items-center gap-2 text-4xl font-semibold">
          <VscSendToRemoteAgent />
  <span >RemoteEarn</span> 
</div></Link>   
<p className='text-xl font-semibold mt-2'>Call Us</p>
<p className='text-xl font-semibold mb-2'>+8801613787093</p>
<p className=' font-medium mb-2' >Dhaka,Bangladesh</p>
<p className=' font-medium'>alfininad192@gmail.com</p>
</div>
<div className='space-y-2'>
    <p className='text-xl font-medium'>For Workers</p>
    {listworker}
</div>
<div className='space-y-2'>
    <p className='text-xl font-medium'>For Buyers</p>
    {listbuyer}
</div>
<div className='space-y-2'>
<p className='text-xl font-medium'>About Us</p>
 <NavLink to='/about'><p className='mt-2 font-medium'>About Us</p></NavLink>
<NavLink to='/contact'><p className='mt-2 font-medium'>Contact Us</p></NavLink>
<NavLink to='/terms'><p className='mt-2 font-medium'>Terms</p></NavLink>
<NavLink to='/faq'><p className='mt-2 font-medium'>FAQ</p></NavLink>
</div>
        </div>
        <footer className="footer w-5/6 mx-auto sm:footer-horizontal bg-[#555555] pt-4 border-t  border-t-white items-center ">
  <aside className="grid-flow-col items-center">
    RemoteEarn
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a href='https://github.com/Ninalfi' target='_blank'>
     <FaGithub size={30}/>
    </a>
    <a href='https://www.linkedin.com/in/alfi-ninad/' target='_blank'>
      <FaLinkedin  size={30}/>
    </a>
    <a href='https://www.facebook.com/alfi-ninad' target='_blank'>
      <FaFacebook size={30}/>
    </a>
  </nav>
</footer>
</div>
    );
};

export default Footer;