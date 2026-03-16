import React, { use, useState } from 'react';
import DashNav from './DashNav';
import { Outlet, useNavigation } from 'react-router';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';
import Footer from '../Sharedpages/Footer';
import { AuthContext } from '../../Context/AuthContext';
import Spinner from '../Router/Spinner';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const {navHeight}=use(AuthContext)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
   const navigation=useNavigation()
   const isloading=navigation.state==="loading"
    return (
  <div className="h-screen overflow-hidden">
    <div className="flex h-full">
     
      <div className="h-full">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <DashNav toggleSidebar={toggleSidebar} />
        <div className="flex-1 ">
          {isloading?<Spinner/>:<Outlet />}
        </div>
        <Footer />
      </div>
    </div>

    <ToastContainer />
  </div>
);
};

export default Dashboard;
