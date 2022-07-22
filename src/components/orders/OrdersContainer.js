import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { orders } from '../../firebase/firebase';
import { OrderDetail } from './OrderDetail';

export const OrdersContainer = () => {
  const [formValues, setFormValues] = useState({
    order: '',
  });

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isObjectEmpty = Object.keys(order);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formValues.order === '') {
      setLoading(false);
      Swal.fire({
        title: 'Error!',
        text: 'Ingrese un número de orden por favor.',
        icon: 'error',
        confirmButtonText: 'Try again',
      });
    }

    const docRef = doc(orders, formValues.order);
    getDoc(docRef).then((ref) => {
      if (ref.data() !== undefined) {
        const getOrder = ref.data();
        setOrder(getOrder);
        setLoading(false);
      } else {
        setOrder({});
        Swal.fire({
          title: 'Error!',
          text: 'Número de orden inválido, intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Try again',
        });
        setLoading(false);
      }
    });

    setLoading(false);
    e.target.reset();
  };

  return (
    <div className='orders-container'>
      <form onSubmit={handleFormSubmit} className='orders-form'>
        <input
          placeholder='Ingresar número de orden'
          className='order-form__input'
          id='order'
          name='order'
          value={formValues.change}
          onChange={handleInputChange}
        ></input>
        <div></div>
        <button className='order-form__search'>
          <FontAwesomeIcon
            icon={faSearch}
            className='order-form__search-icon'
          />
        </button>
      </form>
      {loading && <h1>Loading...</h1>}
      {isObjectEmpty.length > 0 && <OrderDetail order={order} />}
    </div>
  );
};
