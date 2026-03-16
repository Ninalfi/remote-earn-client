import React from 'react';

const PayCard = ({da,index}) => {
    const {coinamount,price,payment_id,time}=da
    return (
         <tr className="hover:bg-base-300">
        <th>{index+1}</th>
        <td>{payment_id}</td>
        <td>{coinamount}</td>
        <td>{price}</td>
        <td> {new Date(time).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  })}</td>
      </tr>
    );
};

export default PayCard;