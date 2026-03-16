import React, { use } from 'react';
import { Link, NavLink } from 'react-router'; // Make sure you’re using react-router-dom
import { BiPurchaseTag } from 'react-icons/bi';
import { FaHistory, FaPen, FaUsers } from 'react-icons/fa';
import { IoBriefcaseOutline, IoHomeOutline } from 'react-icons/io5';
import { LuClipboardList, LuListRestart } from 'react-icons/lu';
import { MdOutlinePlaylistAddCheck } from 'react-icons/md';
import { PiHandWithdraw } from 'react-icons/pi';
import { IoMdClose } from 'react-icons/io';
import { AuthContext } from '../../Context/AuthContext';
import { LuCircleUserRound } from "react-icons/lu";
const Sidebar = ({ isOpen, closeSidebar }) => {
    const {user}=use(AuthContext)
    const listworker = <>
        <NavLink to='/dashboard/workerhome'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><IoHomeOutline size={24} />Home</p></NavLink>
        <NavLink to='/dashboard/tasklist'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><LuClipboardList size={24} />Task List</p></NavLink>
        <NavLink to='/dashboard/mysubmissions'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><LuListRestart size={24} />My Submissions</p></NavLink>
        <NavLink to='/dashboard/withdraw'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><PiHandWithdraw size={24} />Withdrawals</p></NavLink>
         <NavLink to='/dashboard/profile'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><LuCircleUserRound  size={24} />Profile</p></NavLink>
         
    </>;

    const listbuyer = <>
        <NavLink to='/dashboard/buyerhome'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><IoHomeOutline size={24} />Home</p></NavLink>
        <NavLink to='/dashboard/addtask'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><FaPen size={24} />Add New Task</p></NavLink>
        <NavLink to='/dashboard/mytasks'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><IoBriefcaseOutline size={24} />My Tasks</p></NavLink>
        <NavLink to='/dashboard/purchasecoin'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><BiPurchaseTag size={24} />Purchase Coin</p></NavLink>
        <NavLink to='/dashboard/paymenthistory'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><MdOutlinePlaylistAddCheck size={24} />Payment History</p></NavLink>
        <NavLink to='/dashboard/profile'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><LuCircleUserRound  size={24} />Profile</p></NavLink>
    </>;

    const listadmin = <>
        <NavLink to='/dashboard/adminhome'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><IoHomeOutline size={24} />Home</p></NavLink>
        <NavLink to='/dashboard/manageusers'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><FaUsers size={24} />Manage Users</p></NavLink>
        <NavLink to='/dashboard/managetasks'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><IoBriefcaseOutline size={24} />Manage Tasks</p></NavLink>
         <NavLink to='/dashboard/profile'><p className='flex items-end gap-2 hover:bg-accent p-4 rounded-lg opacity-70'><LuCircleUserRound  size={24} />Profile</p></NavLink>
    </>;

    return (
        <div className='relative'>
            {/* Desktop Sidebar */}
           
            <div className="hidden lg:block w-[350px] bg-white  shadow-md h-screen   overflow-y-hidden">
             
                <div className="p-4">
                <Link to="/">
          <div className="flex items-center gap-2 text-2xl font-bold pb-5">
            <img src="/logo.png" alt="RemoteEarn Logo" className="w-10 h-10" />
            <span>RemoteEarn</span>
          </div>
        </Link>
                {user?.role=='Worker'&&listworker}
                {user?.role=='Buyer'&&listbuyer}
                {user?.role=='Admin'&&listadmin}</div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div className="fixed  bg-black/10 bg-opacity-30 z-50 flex h-screen">
                    <div className="w-64 bg-white h-full shadow-lg p-4">
                        <div className="flex justify-end mb-2">
                            <button onClick={closeSidebar}><IoMdClose size={24} /></button>
                        </div>
                         <div className="p-4">
                <Link to="/">
          <div className="flex items-center gap-2 text-2xl font-bold pb-5">
            <img src="/logo.png" alt="RemoteEarn Logo" className="w-10 h-10" />
            <span>RemoteEarn</span>
          </div>
        </Link>
                {user?.role=='Worker'&&listworker}
                {user?.role=='Buyer'&&listbuyer}
                {user?.role=='Admin'&&listadmin}</div>
                    </div>
                    <div className="flex-1" onClick={closeSidebar}></div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
