import React, { useContext, useState } from 'react';

import { context } from '../../context/CartContext';
import { CartForm } from './CartForm';
import { CartList } from './CartList';
import { EmptyCart } from './EmptyCart';

export const Cart = () => {
  const [orderInfo, setOrderInfo] = useState('');

  const { shopCartItems } = useContext(context);

  let numberFormat = new Intl.NumberFormat('es-AR');

  let sumOfShopItems = numberFormat.format(
    shopCartItems.reduce(
      (accum, item) => accum + item.selectedItem.price * item.selectedQuantity,
      0
    )
  );

  return (
    <>
      {shopCartItems.length === 0 ? (
        <EmptyCart orderInfo={orderInfo} />
      ) : (
        <>
          <h1 className='cart__title'>
            El total de su compra es de: ${sumOfShopItems}
          </h1>
          <CartList />
          <CartForm
            setOrderInfo={setOrderInfo}
            sumOfShopItems={sumOfShopItems}
          />
        </>
      )}
    </>
  );
};
