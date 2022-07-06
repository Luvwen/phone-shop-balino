import React from 'react';
import { Link } from 'react-router-dom';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EmptyCart = ({ orderInfo }) => {
  return (
    <div>
      <div className='cart__empty'>
        <h1 className='cart__empty-id'>
          Su compra fue registrada con el id: {orderInfo}
        </h1>
        <h2 className='cart__empty-title'>El carrito esta vacio</h2>
        <h2 className='cart__empty-button'>
          <Link to='/' className='cart__empty-link'>
            <FontAwesomeIcon icon={faArrowLeft} className='cart__empty-arrow' />
            <span className='cart__empty-back'>Volver</span>
          </Link>
        </h2>
      </div>
    </div>
  );
};
