import React from 'react';

export const ItemDetail = ({ item, isLoading }) => {
  return (
    <>
      {!isLoading ? (
        <div key={item.id} className='card-container'>
          <h3 className='card-container__title'>{item.title}</h3>
          <img
            className='card-container__picture'
            src={item.pictureUrl}
            alt={item.title}
          />
          <p className='card-container__description'>{item.description}</p>
          <p className='card-container__price'>{item.price}</p>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
