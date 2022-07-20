import React from 'react';
import { Link } from 'react-router-dom';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EmptyCart = ({ orderInfo }) => {
  return (
    <div className='cart-container'>
      <div className='cart__empty'>
        {orderInfo.length === 20 ? (
          <div className='cart__empty-order'>
            <h1 className='cart__empty-order__title'>Compra Exitosa</h1>
            <h2 className='cart__empty-order__id'>
              Su transacción fue registrada con el id: {orderInfo}
            </h2>
          </div>
        ) : (
          ''
        )}
        <div className='cart__empty-container'>
          <h2 className='cart__empty-subtitle'>Tu carrito está vacío</h2>
          <h2 className='cart__empty-subtitle'>
            ¿No sabés que comprar? ¡Miles de productos te esperan!
          </h2>
          <h2 className='cart__empty-button'>
            <Link to='/' className='cart__empty-link'>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className='cart__empty-arrow'
              />
              <span className='cart__empty-back'>Elegir productos</span>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};
