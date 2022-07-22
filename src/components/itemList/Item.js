import React from 'react';

export const Item = ({ title, description, price, pictureUrl }) => {
  return (
    <div className='card-container'>
      <h3 className='card-container__title'>{title}</h3>

      <img className='card-container__picture' src={pictureUrl} alt={title} />
      <p className='card-container__description'>{description}</p>
      <p className='card-container__price'>${price}</p>
    </div>
  );
};
