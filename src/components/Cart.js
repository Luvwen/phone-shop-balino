import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { context } from './CartContext';

export const Cart = () => {
  const { shopCartItems, clearItems, removeItem, cartLength } =
    useContext(context);

  let numberFormat = new Intl.NumberFormat('es-AR');

  let sumOfShopItems = numberFormat.format(
    shopCartItems.reduce(
      (accum, item) =>
        accum + item.selectedItem[0].price * item.selectedQuantity,
      0
    )
  );

  const handleClearItems = () => {
    clearItems();
  };

  const handleRemoveItem = (e) => {
    const idStringToNumber = parseInt(e.target.value);
    removeItem(idStringToNumber);
  };

  return (
    <>
      <h1 className='cart__title'>
        El total de su compra es de: ${sumOfShopItems}
      </h1>
      {cartLength > 0 && (
        <button className='cart__button info-button' onClick={handleClearItems}>
          Reset items
        </button>
      )}
      <div className='container-example cart__cards-container'>
        {shopCartItems.length > 0 ? (
          shopCartItems?.map((item, i) => (
            <div className='card-container' key={i}>
              <h1 className='card-container__title'>
                {item?.selectedItem[0]?.brand}
              </h1>
              <h2 className='card-container__title'>
                {item.selectedItem[0]?.title}
              </h2>
              <img
                className='card-container__picture'
                src={item.selectedItem[0]?.pictureUrl}
                alt={item.selectedItem[0]?.title}
              />
              <p className='card-container__price'>
                ${item.selectedItem[0]?.price} x {item.selectedQuantity} = $
                {(item.selectedItem[0]?.price * item.selectedQuantity).toFixed(
                  3
                )}
              </p>
              <button
                className='info-button'
                onClick={handleRemoveItem}
                value={item.selectedItem[0].id}
              >
                Remove Item
              </button>
            </div>
          ))
        ) : (
          <div className='cart__empty'>
            <h1 className='cart__empty-title'>El carrito esta vacio</h1>
            <h2 className='cart__empty-button'>
              <Link to='/' className='cart__empty-link'>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className='cart__empty-arrow'
                />
                <span className='cart__empty-back'>Volver</span>
              </Link>
            </h2>
          </div>
        )}
      </div>
    </>
  );
};
