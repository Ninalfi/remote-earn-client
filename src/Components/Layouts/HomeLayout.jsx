import React, { useEffect, useState } from 'react';
import Nav from '../Sharedpages/Nav';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../Sharedpages/Footer';
import Spinner from '../Router/Spinner';

const HomeLayout = () => {
      const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 30);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }
    return (
        <div >
            <Nav></Nav>
            <div >
            <Outlet ></Outlet>
            </div>
           <ToastContainer></ToastContainer>
             <Footer></Footer>
        </div>
        
    );
};

export default HomeLayout;