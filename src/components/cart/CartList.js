import React, { useContext } from 'react';
import { context } from '../../context/CartContext';

import { CartListItem } from './CartListItem';

export const CartList = () => {
  const { shopCartItems, clearItems } = useContext(context);

  const handleClearItems = () => {
    clearItems();
  };

  return (
    <div className='container-example cart__cards-container'>
      {shopCartItems?.map((item, index) => (
        <CartListItem item={item} key={index} />
      ))}
      <button className='cart__button info-button' onClick={handleClearItems}>
        Reset items
      </button>
    </div>
  );
};
