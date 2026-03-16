import React from 'react';
import CoinCard from './CoinCard';

const PurchaseCoin = () => {
    const coinarr=[
        {   
            coins:10,
            price:1.00,
            maxquan:10000000,
            quote:"Best for small jobs"
        },
        {
            coins:150,
            price:10.00,
            maxquan:666666,
             quote:"Great for beginners"
        },
        {
            coins:500,
            price:20.00,
              maxquan:200000,
               quote:"Save 20%"
        },
        {
            coins:1000,
            price:35.00,
              maxquan:100000,
               quote:"Best Value!"

        },
    ]
    return (
        <div className='bg-secondary w-full h-full pb-20'>
         <h1 className='text-3xl font-semibold text-center pt-20'>Purchase Coin</h1>
         <p className='  text-center py-5 opacity-70 font-semibold'> Select a coin package and complete payment</p>
         <div className=' grid md:grid-cols-2 2xl:grid-cols-4 px-10 py-5 gap-5'>
            {
                coinarr.map((coin,index)=><CoinCard coin={coin} key={index}></CoinCard>)
            }
            </div>
        </div>
    );
};

export default PurchaseCoin;