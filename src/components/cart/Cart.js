import React, { useContext, useState } from 'react';

import { context } from '../../context/CartContext';
import { CartForm } from './CartForm';
import { CartList } from './CartList';
import { EmptyCart } from './EmptyCart';

export const Cart = () => {
  const [orderInfo, setOrderInfo] = useState('');

  const { shopCartItems, sumOfShopItems } = useContext(context);

  return (
    <>
      {shopCartItems.length === 0 ? (
        <EmptyCart orderInfo={orderInfo} />
      ) : (
        <div className='cart'>
          <CartList />
          <CartForm
            setOrderInfo={setOrderInfo}
            sumOfShopItems={sumOfShopItems}
          />
        </div>
      )}
    </>
  );
};
