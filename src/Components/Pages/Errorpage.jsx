import React from 'react';
import { Link } from 'react-router';

const Errorpage = () => {
    return (
        <div>
        <div className='h-screen w-full mx-auto flex justify-center overflow-y-hidden relative' >
       <Link to='/'>
        <div className='btn btn-xl flex justify-start absolute top-10 left-10 bg-accent text-white'>
               Back To Home
            </div>
       </Link> 
            <img src='/assets/error.jpg' className='h-screen border-2  object-cover object-center w-full'></img>
            
        </div>
        </div>
    );
};

export default Errorpage;