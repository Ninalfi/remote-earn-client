import React, { useState,Fragment, } from 'react';
import coinimg from '/assets/starcoins.jpg';
import coini from '/assets/coin.png';
import money from '/assets/money.png';
import star from "/assets/star.png";
import { Dialog, Transition } from '@headlessui/react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
const CoinCard = ({coin}) => {
    const {coins,maxquan,price,quote}=coin
      let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

    return (
        <div className='p-5 bg-white rounded-lg flex flex-col justify-center shadow-2xl'>
            <img src={coinimg} className='h-[200px]  rounded-lg'></img>
            <div >
            <div className='flex gap-2 items-center'>
                <img src={coini} ></img>
                <p className='text-xl font-semibold'>{coins} coins</p>

            </div>
             <div className='flex gap-2 items-center'>
                <img src={money} className='h-13'></img>
                <p className='text-xl font-semibold'>${price}</p>

            </div>
          <div className='flex gap-2 items-center'>
                <img src={star} className='h-13'></img>
                <p className='text-xl font-semibold'>{quote}</p>

            </div>
            <>
                 <button className='btn btn-accent text-white mt-2 w-full shadow-2xs'
                 onClick={openModal}>Purchase Now</button>
                  <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   You are about to purchase:
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <div className='flex gap-2 items-center'>
                <img src={coini} ></img>
                <p className='text-xl font-semibold'>{coins} coins</p>

            </div>
             <div className='flex gap-2 items-center'>
                <img src={money} className='h-13'></img>
                <p className='text-xl font-semibold'>Total Cost: ${price}</p>

            </div>
            Once the payment is complete, the coins will be added to your account instantly.
             <Elements stripe={stripePromise}>
      <CheckoutForm closeModal={closeModal} price={price}  coins={coins}/>
    </Elements>
                    </p>
                  </div>

                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
            </>
           
            </div>
        </div>
    );
};

export default CoinCard;