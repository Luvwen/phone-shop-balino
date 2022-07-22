import React, { useContext, useState } from 'react';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { db } from '../../firebase/firebase';
import { context } from '../../context/CartContext';
import { isFormValid } from '../../helpers/helpersFunctions';

export const CartForm = ({ setOrderInfo, sumOfShopItems }) => {
  const { shopCartItems, purchaseOrder } = useContext(context);

  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    confirmEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const shopOrderToUser = shopCartItems.map((prod) => {
      return {
        item: prod.selectedItem.title,
        description: prod.selectedItem.description,
        cantidad: prod.selectedQuantity,
        id: prod.selectedItem.id,
        color: prod.selectedColor,
        photo: prod.selectedItem.pictureUrl,
        estado: 'generada',
      };
    });

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
    if (
      isFormValid(values.name, values.phone, values.email, values.confirmEmail)
    ) {
      addDoc(collectionOrder, newOrder).then((resp) => {
        const orderId = resp.id;
        setOrderInfo(orderId);
        purchaseOrder(orderId);
      });
    }
  };
  return (
    <div className='cart-form'>
      <h2 className='cart-form__title'>Identificación</h2>
      <hr className='cart-form__separator' />
      <p className='cart-form__text'>
        Información esencial para la finalización de su compra
      </p>
      <form onSubmit={handleSubmit} className='cart-form-card'>
        <label htmlFor='name'>Name: </label>
        <input
          id='name'
          name='name'
          value={values.name}
          onChange={handleChange}
        />
        <label htmlFor='phone'>Phone: </label>
        <input
          id='phone'
          name='phone'
          value={values.phone}
          onChange={handleChange}
        />
        <label htmlFor='email'>Email: </label>
        <input
          id='email'
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor='email'>Confirm email: </label>
        <input
          id='confirmEmail'
          type='confirmEmail'
          name='confirmEmail'
          value={values.confirmEmail}
          onChange={handleChange}
        />
        <button
          className='cart-form-card__submit'
          type='submit'
          onSubmit={handleSubmit}
        >
          Enviar orden
        </button>
      </form>
    </div>
  );
};
