import React, { useState } from 'react';

import Swal from 'sweetalert2';

export const ItemCount = ({
  initial: initialValue,
  stock,
  onAdd,
  title,
  prod,
}) => {
  const [count, setCount] = useState(initialValue);

  const handleAdd = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleSubstract = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleConfirm = () => {
    if (count > 0) {
      onAdd(count, prod);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese una cantidad superior a 0',
      });
    }
  };

  return (
    <div className='count-container'>
      <p className='count-container__title'>{title}</p>
      <div className='controls'>
        <button className='controls__button' onClick={handleSubstract}>
          -
        </button>
        <p className='controls__text'>{count}</p>
        <button className='controls__button' onClick={handleAdd}>
          +
        </button>
      </div>
      <button className='confirm-button' onClick={handleConfirm}>
        Confirmar
      </button>
    </div>
  );
};
