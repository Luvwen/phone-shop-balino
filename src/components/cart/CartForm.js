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
        <p>
          <label htmlFor='email'>Confirm email: </label>
          <input
            id='confirmEmail'
            type='confirmEmail'
            name='confirmEmail'
            value={values.confirmEmail}
            onChange={handleChange}
          />
        </p>
        <button type='submit' onSubmit={handleSubmit}>
          Submit order
        </button>
      </form>
    </div>
  );
};
