import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemCount } from './ItemCount';

export const ItemDetail = ({ item, isLoading }) => {
  const [hideShopCart, setHideShopCart] = useState(false);

  const onAdd = (count) => {
    if (count > 0) {
      setHideShopCart(true);
    } else {
      setHideShopCart(false);
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
              <ItemCount initial={1} stock={10} onAdd={onAdd} />
            ) : (
              <Link to='/cart'>
                <button className='confirm-button'>Terminar compra</button>
              </Link>
            )}
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
