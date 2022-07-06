import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { context } from './CartContext';
import { db } from '../firebase/firebase';

export const Cart = () => {
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [orderInfo, setOrderInfo] = useState('');

  const { shopCartItems, clearItems, removeItem, cartLength, purchaseOrder } =
    useContext(context);

  let numberFormat = new Intl.NumberFormat('es-AR');

  let sumOfShopItems = numberFormat.format(
    shopCartItems.reduce(
      (accum, item) => accum + item.selectedItem.price * item.selectedQuantity,
      0
    )
  );

  const handleClearItems = () => {
    clearItems();
  };

  const handleRemoveItem = (e) => {
    const idStringToNumber = e.target.value;
    removeItem(idStringToNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    const shopOrderToUser = shopCartItems.map((prod) => {
      return {
        item: prod.selectedItem.title,
        cantidad: prod.selectedQuantity,
        id: prod.selectedItem.id,
      };
    });
    e.preventDefault();

    const newOrder = {
      buyer: {
        name: values.name,
        phone: values.phone,
        email: values.email,
      },
      shopOrderToUser,
      total: sumOfShopItems,
      date: serverTimestamp(),
    };

    const collectionOrder = collection(db, 'orders');
    addDoc(collectionOrder, newOrder).then((resp) => {
      const orderId = resp.id;
      setOrderInfo(orderId);
      purchaseOrder(orderId);
    });
  };
  return (
    <>
      {cartLength > 0 && (
        <>
          <h1 className='cart__title'>
            El total de su compra es de: ${sumOfShopItems}
          </h1>
          <button
            className='cart__button info-button'
            onClick={handleClearItems}
          >
            Reset items
          </button>
        </>
      )}
      <div className='container-example cart__cards-container'>
        {shopCartItems.length > 0 &&
          shopCartItems?.map((item, i) => (
            <div className='card-container' key={i}>
              <h1 className='card-container__title'>
                {item?.selectedItem?.brand}
              </h1>
              <h2 className='card-container__title'>
                {item.selectedItem?.title}
              </h2>
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
          ))}
      </div>
      {shopCartItems.length === 0 && (
        <div>
          <div className='cart__empty'>
            <h1 className='cart__empty-id'>
              Su compra fue registrada con el id: {orderInfo}
            </h1>
            <h2 className='cart__empty-title'>El carrito esta vacio</h2>
            <h2 className='cart__empty-button'>
              <Link to='/' className='cart__empty-link'>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className='cart__empty-arrow'
                />
                <span className='cart__empty-back'>Volver</span>
              </Link>
            </h2>
          </div>
        </div>
      )}
      {shopCartItems.length > 0 && (
        <div className='card-form'>
          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor='name'>Name: </label>
              <input
                id='name'
                name='name'
                value={values.name}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor='phone'>Phone: </label>
              <input
                id='phone'
                name='phone'
                value={values.phone}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor='email'>Email: </label>
              <input
                id='email'
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
              />
            </p>
            <button type='submit' onSubmit={handleSubmit}>
              Submit order
            </button>
          </form>
        </div>
      )}
    </>
  );
};
