import React, { useRef, useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
const ReviewSlider = () => {
  const reviews = [
    {
      image: '/assets/user1.jpeg',
      title: 'Easy to Use & Rewarding',
      description: 'I never thought remote-tasking could be this smooth. RemoteEarn made it simple, and I got paid within days!',
      name: 'Sara Ahmed',
      job: 'Freelance Designer',
    },
    {
      image: '/assets/user5.jpg',
      title: 'Perfect Side Hustle',
      description: 'As a student, I needed something flexible. This platform helped me earn in my free time without stress.',
      name: 'Ayan Chowdhury',
      job: 'Computer Science Student',
    },
    {
      image: '/assets/user3.png',
      title: 'Reliable Workers Every Time',
      description: 'I posted a survey task and within hours got real results. Best part? Every submission was reviewed and legit.',
      name: 'Jessica Lin',
      job: 'Marketing Manager',
    },
    {
      image: '/assets/user5.jpg',
      title: 'Intuitive Dashboard',
      description: 'The admin panel is easy to use and helps me track users, payments, and reports without a headache.',
      name: 'Imran Hossain',
      job: 'Platform Admin',
    },
    {
      image: '/assets/user5.jpg',
      title: 'Earned $50 in My First Week',
      description: 'Seriously. Just by doing small tasks while commuting. Best remote-job platform I’ve used so far.',
      name: 'Jonathan Smith',
      job: 'Part-time Worker',
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [navReady, setNavReady] = useState(false);

  // 🟢 Delay Swiper render until refs are mounted
  useEffect(() => {
    setNavReady(true);
  }, []);

  return (
    <div className="flex flex-col items-center p-5 w-full">
      {navReady && (
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          onInit={(swiper) => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* ✅ Navigation buttons: functional + scoped */}
      <div className="flex self-start  gap-4 mt-24">
        <button
          ref={prevRef}
          className="px-4 py-3 bg-[#b6e3d450] text-[#34A853] text-3xl rounded hover:bg-gray-300"
        >
        <IoIosArrowBack />
        </button>
        <button
          ref={nextRef}
          className="px-4 py-3 bg-[#b6e3d450] rounded text-[#34A853] text-3xl hover:bg-gray-300"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ReviewSlider;
