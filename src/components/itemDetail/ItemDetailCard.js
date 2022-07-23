import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ItemCount } from './ItemCount';
import { context } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export const ItemDetailCard = ({ item }) => {
  const [hideShopCart, setHideShopCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState({ color: 'Blanco' });

  const { addItem, removeItem, isInCart, addItemToFavList, addedToFav } =
    useContext(context);

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

  const handleChangeColor = (e) => {
    setSelectedColor({ color: e.target.value });
  };

  const deviceColors = ['Blanco', 'Negro', 'Gris', 'Azul', 'Rosa'];

  const index = item.index;

  const handleAddToFav = (item, index) => {
    addItemToFavList(item, index);
  };

  return (
    <div className='card-detail'>
      <div className='card-detail-list'>
        <div className='card-info'>
          <h3>FOTO</h3>
          <h3>PRODUCTO</h3>
          <h3>PRECIO</h3>
          <h3 className={hideShopCart ? 'card-info__detaild-hide' : ''}>
            CANTIDAD
          </h3>
          <h3>COLOR</h3>
        </div>
        <div className='card-info'>
          <img
            className='card-info__picture'
            src={item.pictureUrl}
            alt={item.title}
          />
          <div>
            <h3 className='card-info__title'>{item.title}</h3>
            <FontAwesomeIcon
              onClick={() => {
                handleAddToFav(item, index);
              }}
              icon={
                addedToFav.find((item) => item.i === index)
                  ? faHeartbeat
                  : faHeart
              }
              className='wishlist-heart-detail'
            />
          </div>
          <p className='card-info__price'>${item.price}</p>
          {!hideShopCart && <ItemCount initial={1} stock={10} onAdd={onAdd} />}
          <select
            onChange={handleChangeColor}
            defaultValue='blanco'
            className='card-info__color'
          >
            {hideShopCart ? (
              <option>{selectedColor.color}</option>
            ) : (
              deviceColors.map((color, i) => {
                return (
                  <option key={i} value={color}>
                    {color}
                  </option>
                );
              })
            )}
          </select>
          <button className='cart-card__button' onClick={handleRemoveItem}>
            Remove item
          </button>
        </div>
      </div>
      <div className='card-buttons'>
        {hideShopCart && (
          <Link to='/cart'>
            <button className='card-buttons-info one'>Terminar compra</button>
          </Link>
        )}
        <button className='card-buttons-info' onClick={handleFindItem}>
          Find item
        </button>
      </div>
    </div>
  );
};
