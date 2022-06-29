import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { context } from './CartContext';

export const CartWidget = () => {
  const { cartLength } = useContext(context);

  return (
    <>
      {cartLength > 0 && (
        <>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className='navbar__shopping-cart'>{cartLength}</span>
        </>
      )}
    </>
  );
};
