import React, { useEffect, useRef, useState, useContext } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import { HiMenu } from 'react-icons/hi';
import coin from '/assets/coin.png';
import user1 from '/assets/user2.jpg';
import { Link } from 'react-router';

import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../Sharedpages/useAxiosSecure';


const DashNav = ({ toggleSidebar }) => {

  const { user, setNavHeight } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);
  const navRef = useRef(null);
 const axiosSecure = useAxiosSecure()
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        let merged = [];

        if (user?.role === 'Worker') {
          const submissionRes = await axiosSecure.get(`/submission?email=${user.email}`);
          const filteredSubmissions = submissionRes.data.filter(notif => notif.status !== 'pending');

          const withdrawRes = await axiosSecure.get(`/withdraw?email=${user.email}`);
          const filteredWithdrawals = withdrawRes.data.filter(notif => notif.status === 'approved');

          merged = [...filteredSubmissions, ...filteredWithdrawals];
        } else if (user?.role === 'Buyer') {
          const buyerRes = await axiosSecure.get(`/submission?Buyer_mail=${user.email}`);
          merged = buyerRes.data.filter(notif => notif.status === 'pending');
        }

        setNotifications(merged);
      } catch (err) {
        console.log('Notification error:', err);
      }
    };

    if (user?.email && user?.role) {
      fetchNotifications();
    }
  }, [user?.email, user?.role]);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={navRef} className="navbar bg-base-100 shadow-sm relative px-4">
      {/* Left: Logo & Hamburger */}
      <div className="flex-1 flex items-center gap-4">
        {/* Hamburger (only visible on small devices) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-3xl focus:outline-none"
        >
          <HiMenu />
        </button>

        {/* Logo */}
        
      </div>

      {/* Right side */}
      <div className="flex gap-5 items-center">
        {/* Coin and role */}
        <div className="flex flex-col items-center justify-center">
          <div className="avatar flex items-center gap-1">
            <div className="mask mask-circle h-10 w-10">
              <img src={coin} alt="Coin" className="h-full w-full object-cover" />
            </div>
            <p className="font-medium text-2xl">{user?.coin}</p>
          </div>
          <div className="font-medium">{user?.role || 'Worker'}</div>
        </div>

        {/* User avatar */}
        <div className="flex flex-col items-center justify-center">
          <div className="avatar">
            <div className="mask mask-circle h-10 w-10">
              <img src={user?.photo || user1} alt="User" />
            </div>
          </div>
          <div className="font-medium">{user?.name}</div>
        </div>

        {/* Notification */}
        <div className="relative" ref={notificationRef}>
          <button onClick={() => setIsOpen(prev => !prev)}>
            <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
        <span className="badge badge-xs badge-error indicator-item"></span>
      </div>
    </button>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-lg border z-50 border-l-8 border-l-accent">
              <div className="p-3 border-b font-semibold text-accent text-center">
                Notifications
              </div>

              {notifications.length === 0 ? (
                <div className="p-4 text-gray-500">No notifications found.</div>
              ) : (
                <ul className="divide-y">
                  {notifications.map((notif, index) => (
                    <li key={index}>
                      {user?.role === 'Buyer' && notif.status === 'pending' && (
                        <p className="text-gray-700 p-3 text-sm hover:bg-gray-100 transition">
                          <span className="text-accent font-semibold">{notif.worker_name}</span>{' '}
                          has submitted task{' '}
                          <span className="font-semibold">{notif.task_title}</span>
                        </p>
                      )}

                      {user?.role === 'Worker' && notif.status === 'rejected' && (
                        <p className="text-gray-700 p-3 text-sm hover:bg-gray-100 transition">
                          Your submission for{' '}
                          <span className="text-accent font-semibold">{notif.task_title}</span> was
                          rejected by <span className="font-semibold">{notif.Buyer_name}</span>
                        </p>
                      )}

                      {user?.role === 'Worker' && notif.status === 'approve' && (
                        <p className="text-gray-700 p-3 text-sm hover:bg-gray-100 transition">
                          You have earned{' '}
                          <span className="font-semibold">{notif.payable_amount}</span> from{' '}
                          <span className="font-semibold text-accent">{notif.Buyer_name}</span> for
                          completing <span className="font-semibold">{notif.task_title}</span>
                        </p>
                      )}

                      {user?.role === 'Worker' && notif.withdrawal_amount && notif.status === 'approved' && (
                        <p className="text-gray-700 p-3 text-sm hover:bg-gray-100 transition">
                          Your withdrawal of ${' '}
                          <span className="font-semibold">{notif.withdrawal_amount}</span> has been
                          approved by admin
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashNav;
