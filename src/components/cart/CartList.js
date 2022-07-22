import React, { useContext } from 'react';
import { context } from '../../context/CartContext';

import { CartListItem } from './CartListItem';

export const CartList = () => {
  const { shopCartItems, clearItems, sumOfShopItems } = useContext(context);

  const handleClearItems = () => {
    clearItems();
  };

  return (
    <div className='cart-list'>
      <h2 className='cart-list__title'>Finalizar la compra</h2>
      <div className='cart-card'>
        <h3>FOTO</h3>
        <h3>PRODUCTO</h3>
        <h3>CANTIDAD</h3>
        <h3>PRECIO</h3>
        <h3>COLOR</h3>
      </div>
      {shopCartItems?.map((item, index) => (
        <CartListItem item={item} key={index} />
      ))}
      <div className='cart-cards-container'>
        <button
          className='cart-card-container__reset'
          onClick={handleClearItems}
        >
          Reset items
        </button>
        <h1 className='cart-card-container__total'>
          El total de su compra es de: ${sumOfShopItems}
        </h1>
      </div>
    </div>
  );
};
