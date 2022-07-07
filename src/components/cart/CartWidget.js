import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { context } from '../../context/CartContext';

export const CartWidget = () => {
  const { cartLength } = useContext(context);

  return (
    <>
      <FontAwesomeIcon icon={faShoppingCart} />
      <span className='navbar__shopping-cart'>
        {cartLength > 0 && cartLength}
      </span>
    </>
  );
};
