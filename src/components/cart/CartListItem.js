import React, { useContext } from 'react';

import { context } from '../../context/CartContext';

export const CartListItem = ({ item }) => {
  const { removeItem } = useContext(context);

  const handleRemoveItem = (e) => {
    const idStringToNumber = e.target.value;
    removeItem(idStringToNumber);
  };
  return (
    <div className='card-container'>
      <h1 className='card-container__title'>{item?.selectedItem?.brand}</h1>
      <h2 className='card-container__title'>{item.selectedItem?.title}</h2>
      <img
        className='card-container__picture'
        src={item.selectedItem?.pictureUrl}
        alt={item.selectedItem?.title}
      />
      <p className='card-container__price'>
        ${item.selectedItem?.price} x {item.selectedQuantity} = $
        {(item.selectedItem?.price * item.selectedQuantity).toFixed(3)}
      </p>
      <button
        className='info-button'
        onClick={handleRemoveItem}
        value={item.selectedItem.id}
      >
        Remove Item
      </button>
    </div>
  );
};
