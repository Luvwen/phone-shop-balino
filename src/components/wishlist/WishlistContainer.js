import {
  faArrowLeft,
  faHeart,
  faHeartbeat,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { context } from '../../context/CartContext';
import { ItemCount } from '../itemDetail/ItemCount';

export const WishlistContainer = () => {
  const [color, setColor] = useState({ color: 'Blanco' });
  const { favProducts, addItem, isInCart, addItemToFavList, addedToFav } =
    useContext(context);

  const addFavItemToCart = (count, prod) => {
    if (count > 0) {
      const checkCart = isInCart(prod.id);
      if (!checkCart) {
        addItem(prod, count, color, false);
        addItemToFavList(prod, prod.index);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Objeto agregado previamente',
          text: 'Primero elimine el objeto, despues agreguelo otra vez.',
        });
      }
    }
  };

  const deviceColors = ['Blanco', 'Negro', 'Gris', 'Azul', 'Rosa'];

  const handleChangeColor = (e) => {
    setColor({ color: e.target.value });
  };

  const handleAddToFav = (item, index) => {
    addItemToFavList(item, index);
  };

  return (
    <div className='favourites'>
      {favProducts.length === 0 && (
        <div className='cart__empty-container center'>
          <h2 className='cart__empty-subtitle'>
            Tu lista de favoritos está vacía
          </h2>
          <h2 className='cart__empty-subtitle'>
            ¿No sabés que comprar? ¡Miles de productos te esperan!
          </h2>
          <h2 className='cart__empty-button'>
            <Link to='/' className='cart__empty-link'>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className='cart__empty-arrow'
              />
              <span className='cart__empty-back'>Elegir productos</span>
            </Link>
          </h2>
        </div>
      )}
      {favProducts.map((prod, i) => {
        return (
          <div className='favourites-container' key={i}>
            <div>
              <h1 className='favourites-container__title'>{prod.title}</h1>
              <FontAwesomeIcon
                onClick={() => {
                  handleAddToFav(prod, prod.index);
                }}
                icon={
                  addedToFav.find((item) => item.i === prod.index)
                    ? faHeartbeat
                    : faHeart
                }
                className='wishlist-heart-detail heart-fav'
              />
            </div>
            <img
              className='favourites-container__img'
              src={prod.pictureUrl}
              alt={prod.brand}
            />
            <p className='favourites-container__price'>${prod.price}</p>
            {
              <ItemCount
                initial={1}
                stock={10}
                onAdd={addFavItemToCart}
                prod={prod}
              />
            }
            <select
              onChange={handleChangeColor}
              defaultValue='blanco'
              className='card-info__color'
            >
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
      })}
    </div>
  );
};
