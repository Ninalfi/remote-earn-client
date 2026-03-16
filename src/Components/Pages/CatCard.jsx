import React from 'react';

const CatCard = ({da,index}) => {
   const {_id , total_workers}=da
   console.log(index)
    return (
        <div className='group flex p-5 bg-white border rounded-lg border-gray-200 items-center gap-5 hover:shadow-sm '>
        <div className='bg-primary-content rounded-full p-3 '>
          <img src={`/assets/${index + 1}.png`} alt={`Asset ${index + 1}`} className='w-12 object-center object-cover ' />
          </div>
          <div >
          <p className='text-xl font-semibold group-hover:text-accent'>{_id}</p>
          <p className='text-sm opacity-70 font-semibold'>({total_workers} open positions)</p>
          </div>
        </div>
    );
};

export default CatCard;