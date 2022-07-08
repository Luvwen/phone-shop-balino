import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ItemCount } from './ItemCount';
import { context } from '../../context/CartContext';

export const ItemDetailCard = ({ item }) => {
  const { addItem, removeItem, isInCart } = useContext(context);
  const [hideShopCart, setHideShopCart] = useState(false);

  const onAdd = (count) => {
    if (count > 0) {
      const checkCart = isInCart(item.id);

      if (!checkCart) {
        addItem(item, count, selectedColor, false);
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
    removeItem(item.id);
    setHideShopCart(false);
  };

  const handleFindItem = () => {
    const response = isInCart(item.id);

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

  const [selectedColor, setSelectedColor] = useState({ color: 'blanco' });

  const handleChangeColor = (e) => {
    setSelectedColor({ color: e.target.value });
  };

  const deviceColors = ['blanco', 'negro', 'gris', 'azul', 'rosa'];

  return (
    <div className='card-container'>
      <h3 className='card-container__title'>{item.title}</h3>
      <img
        className='card-container__picture'
        src={item.pictureUrl}
        alt={item.title}
      />
      <p className='card-container__description'>{item.description}</p>
      <p className='card-container__price'>${item.price}</p>
      {!hideShopCart ? (
        <ItemCount initial={1} stock={10} onAdd={onAdd} />
      ) : (
        <Link to='/cart'>
          <button className='confirm-button'>Terminar compra</button>
        </Link>
      )}
      <button className='info-button' onClick={handleFindItem}>
        Find item
      </button>
      <button className='info-button' onClick={handleRemoveItem}>
        Remove item
      </button>
      <select onChange={handleChangeColor} defaultValue='blanco'>
        {deviceColors.map((color, i) => {
          return (
            <option key={i} value={color}>
              {color}
            </option>
          );
        })}
      </select>
    </div>
  );
};
