import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Sharedpages/useAxiosSecure';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import Spinner from '../Router/Spinner';

const Workers = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
const [loading, setLoading] = useState(true); 
  useEffect(() => {
    axiosSecure
      .get(`/workers`)
      .then((res) => {
        {setData(res.data);
          setLoading(false); 
        }
      })
      .catch((err) => {
        {console.log(err);
          setLoading(false); 
        }
      });
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const getVisibleData = () => {
    let visibleData = [];
    for (let i = 0; i < visibleCount; i++) {
      visibleData.push(data[(startIndex + i) % data.length]);
    }
    return visibleData;
  };

  const visibleData = getVisibleData();
 if(loading) return <Spinner/>
  return (
    <div data-aos="fade-up" data-aos-duration="1500" className="w-full py-20 my-20">
      <h1 className="text-3xl font-semibold text-center">Our Most In-Demand Workers</h1>
      <p className="text-center opacity-70 font-medium mt-5 mb-10">
        These professionals are client favorites—highly skilled, responsive, and always ready to take on your tasks!
      </p>

      {/* 🔘 Slider Buttons */}
      <div className="flex justify-end items-center gap-3 w-5/6 mx-auto mb-5">
        <button
          onClick={handlePrev}
          className="px-2 py-2 text-[40px] hover:scale-140 transition-transform duration-300"
        >
          <HiArrowLeft size={34}/>
        </button>
        <button
          onClick={handleNext}
          className="px-2 py-2 text-[40px] hover:scale-140 transition-transform duration-300"
        >
         <HiArrowRight   />
        </button>
      </div>

      {/* 👨‍💻 Worker Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 w-5/6 mx-auto gap-5">
        {visibleData.map((worker, index) => (
          <div
            key={index}
            className="  p-5   "
          > <div className='overflow-hidden rounded-lg'>
            <img src={worker?.photo} className='h-[400px] w-[400px] object-center object-cover hover:scale-110 transition-transform duration-300'></img>
            </div>
            <div className='flex justify-between items-center'>
            <p className="text-lg  font-medium mt-2 capitalize">{worker?.name}</p>
            <p className="text-lg  font-medium mt-2 capitalize text-accent">{worker?.coin} coins</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workers;
