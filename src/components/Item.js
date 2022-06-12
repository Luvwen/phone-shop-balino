import React from 'react';
import { ItemCount } from './ItemCount';

export const Item = ({ id, title, description, price, pictureUrl }) => {
  return (
    <div key={id} className='card-container'>
      <h3 className='card-container__title'>{title}</h3>
      <img className='card-container__picture' src={pictureUrl} alt={title} />
      <p className='card-container__description'>{description}</p>
      <p className='card-container__price'>{price}</p>
      <ItemCount title={title} initial={1} stock={10} onAdd={() => {}} />
    </div>
  );
};
