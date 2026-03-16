import React, { use } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { FaCoins, FaDollarSign } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Sharedpages/useAxiosSecure';

const Withdraw = () => {
   const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, setValue } = useForm();

    const {user}=use(AuthContext)
    const amount=(user?.coin/20).toFixed(2);
    const onSubmit = (data) => {
  const withdrawalData = {
    worker_email: user?.email,
    worker_name: user?.name,
    withdrawal_coin: parseInt(data.withdrawal_coin),
    withdrawal_amount: parseFloat(data.withdrawal_amount),
    payment_system: data.payment_system,
    account_number: data.account_number,
    withdraw_date: new Date().toISOString(),
    status: "pending"
  };

  axiosSecure.post('/withdraw', withdrawalData)
    .then(res => {
      toast.success("Withdrawal request submitted!");
    
    })
    .catch(err => toast.error("Failed to submit withdrawal."));
};

    return (
        <div className='w-full bg-secondary'>
        <div className='w-5/6 mx-auto py-20'> 
             <div className='grid md:grid-cols-2 gap-5   '>
                        <div className='flex p-5 items-center shadow-lg rounded-lg  justify-between gap-5'>
                            <div className='p-5 bg-amber-400 text-white rounded-lg '><FaCoins size={30} /></div>
                            <div className='flex-col flex flex-end'>
                            <p className='text-lg font-semibold '>Total coins:</p>
                           <p className='text-2xl font-bold flex justify-end '>{user?.coin}</p>
                           </div>
                        </div>
                        <div className='flex p-5 items-center shadow-lg rounded-lg  justify-between gap-5'>
                            <div className='p-5 bg-green-500 text-white rounded-lg '><FaDollarSign size={30} /></div>
                            <div className='flex-col flex flex-end'>
                            <p className='text-lg font-semibold '>Withdrawable Amount:</p>
                           <p className='text-2xl font-bold flex justify-end '>{amount}$</p>
                           </div>
                        </div>
                        </div>
                        <h1 className='text-3xl font-semibold text-center pt-20'>Withdraw Amount</h1>
                        <p className='  text-center py-5 font-semibold opacity-70 pb-20' > Request to withdraw your earnings securely and easily.</p>
     <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-4 grid lg:grid-cols-2 border-2 border-accent gap-6  bg-white p-10 rounded-lg"
>
  {/* Coin to Withdraw */}
  <div className="lg:col-span-2">
    <label className="block mb-1 font-medium">
      Coin to Withdraw <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      {...register('withdrawal_coin', {
        required: true,
        min: 1,
        max: user?.coin, 
        onChange: (e) => {
          const coins = parseInt(e.target.value || 0);
          setValue('withdrawal_amount', (coins / 20).toFixed(2)); // update $ field
        }
      })}
      placeholder="e.g. 200"
      className="input input-bordered w-full h-12 bg-secondary text-base"
    />
  </div>

  {/* Withdraw Amount (Auto-calculated) */}
  <div className="lg:col-span-2">
    <label className="block mb-1 font-medium">Withdraw Amount ($)</label>
    <input
      type="text"
      readOnly
      {...register('withdrawal_amount')}
      className="input input-bordered w-full h-12 bg-gray-200 text-base"
    />
  </div>

  {/* Payment System Dropdown */}
  <div className="lg:col-span-2">
    <label className="block mb-1 font-medium">
      Select Payment System <span className="text-red-500">*</span>
    </label>
    <select
      {...register('payment_system', { required: true })}
      className="select select-bordered w-full h-12 bg-secondary text-base"
    >
      <option value="">-- Choose Payment Method --</option>
      <option value="Bkash">Bkash</option>
      <option value="Rocket">Rocket</option>
      <option value="Nagad">Nagad</option>
      <option value="Bank">Bank</option>
      <option value="Others">Others</option>
    </select>
  </div>

  {/* Account Number */}
  <div className="lg:col-span-2">
    <label className="block mb-1 font-medium">
      Account Number <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      {...register('account_number', { required: true })}
      placeholder="e.g. 017xxxxxxxx"
      className="input input-bordered w-full h-12 bg-secondary text-base"
    />
  </div>

  {/* Submit Button OR Insufficient Text */}
  {user?.coin >= 200 ? (
    <button
      type="submit"
      className="btn btn-primary w-full lg:col-span-2 h-12 bg-accent text-white text-lg"
    >
      Withdraw
    </button>
  ) : (
    <p className="text-red-500 text-center lg:col-span-2 font-medium">
      Insufficient coin to withdraw.
    </p>
  )}
</form>
</div>
        </div>
    );
};

export default Withdraw;