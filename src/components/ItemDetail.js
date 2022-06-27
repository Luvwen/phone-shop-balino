import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { context } from './CartContext';
import { ItemCount } from './ItemCount';

export const ItemDetail = ({ item, isLoading }) => {
  const [hideShopCart, setHideShopCart] = useState(false);

  const { addItem, removeItem, clearItems, isInCart } = useContext(context);

  const onAdd = (count) => {
    if (count > 0) {
      const checkCart = isInCart(item[0].id);

      if (!checkCart) {
        addItem(item, count, false);
        setHideShopCart(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Objeto agregado previamente',
          text: 'Primero elimine el objeto, despues agreguelo otra vez.',
        });
      }
    } else {
      setHideShopCart(false);
    }
  };

  const handleRemoveItem = () => {
    removeItem(item[0].id);
  };

  const handleClearItems = () => {
    clearItems();
  };

  const handleFindItem = () => {
    const response = isInCart(item[0].id);

    if (response) {
      Swal.fire(
        'Objeto encontrado',
        'El objeto se encuentra añadido al carrito',
        'success'
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'No encontrado',
      });
    }
  };

  return (
    <>
      {!isLoading ? (
        item.map((item) => (
          <div key={item.id} className='card-container'>
            <h3 className='card-container__title'>{item.title}</h3>
            <img
              className='card-container__picture'
              src={item.pictureUrl}
              alt={item.title}
            />
            <p className='card-container__description'>{item.description}</p>
            <p className='card-container__price'>{item.price}</p>
            {!hideShopCart ? (
              <>
                <ItemCount initial={1} stock={10} onAdd={onAdd} />
                <button className='info-button' onClick={handleFindItem}>
                  Find item
                </button>
                <button className='info-button' onClick={handleRemoveItem}>
                  Remove item
                </button>
              </>
            ) : (
              <>
                <Link to='/cart'>
                  <button className='confirm-button'>Terminar compra</button>
                </Link>
                <button className='info-button' onClick={handleRemoveItem}>
                  Remove item
                </button>
                <button className='info-button' onClick={handleClearItems}>
                  Reset items
                </button>
                <button className='info-button' onClick={handleFindItem}>
                  Find item
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
