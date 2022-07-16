import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { orders } from '../../firebase/firebase';
import { OrderDetail } from './OrderDetail';

export const OrdersContainer = () => {
  const [formValues, setFormValues] = useState({
    order: '',
  });

  const [order, setOrder] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isObjectEmpty = Object.keys(order);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const docRef = doc(orders, formValues.order);

    getDoc(docRef).then((ref) => {
      if (ref.data() !== undefined) {
        const getOrder = ref.data();
        setError(false);
        setOrder(getOrder);
        setLoading(false);
      } else {
        setOrder({});
        setError(true);
        setLoading(false);
      }
    });
    setLoading(false);

    e.target.reset();
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='order'></label>
        <input
          id='order'
          name='order'
          value={formValues.change}
          onChange={handleInputChange}
        ></input>
        <button>Search order</button>
      </form>
      {loading && <h1>Loading...</h1>}
      {isObjectEmpty.length > 0 && <OrderDetail order={order} />}
      {error && <h1>Orden inválida</h1>}
    </div>
  );
};
