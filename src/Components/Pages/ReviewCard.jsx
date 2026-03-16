import React from 'react';


const ReviewCard = ({review}) => {
    const {image,title,description,name,job}=review
    return (
        <div className="">
            <p className='text-lg text-accent font-semibold mb-5'>{title}</p>
             <p className='opacity-70 max-w-2xl font-semibold'>{description}</p>
             <div className='flex gap-2 items-center self-start justify-start mt-10'>
                <div className="avatar">
  <div className="w-[49px] h-[49px] rounded-full">
    <img src={image} className='w-full h-full' />
  </div>
</div>
                <div>
                    <p className='text-lg  font-semibold'>{name}</p>
                    <p className='opacity-70 font-medium text-sm'>{job}</p>
                </div>
             </div>
        </div>
    );
};

export default ReviewCard;