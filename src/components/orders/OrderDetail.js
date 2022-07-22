import React from 'react';

export const OrderDetail = ({ order }) => {
  const dayjs = require('dayjs');
  const date = order.date.seconds;

  const dateConverted = dayjs.unix(date).format('DD/MM/YYYY');
  const hourConverted = dayjs.unix(date).format('hh:mm:ss');
  return (
    <div className='order__card'>
      <h3 className='order__card-date'>
        Fecha de compra: {dateConverted} {hourConverted}
      </h3>
      <div className='order-categories'>
        <h3 className='order-categories__item'>Producto</h3>
        <h3 className=''>Cantidad</h3>
        <h3 className=''>Color</h3>
      </div>
      <div>
        {order.shopOrderToUser.map((item, id) => {
          return (
            <div className='order-products' key={id}>
              <img
                className='order-products__image'
                src={item.photo}
                alt={item.item}
              ></img>
              <p className='order-products__card-item'>{item.item}</p>
              <p className='order-products__card-item'>
                Cantidad: {item.cantidad}
              </p>
              <p className='order-products__card-item'>
                Color: {item.color.color}
              </p>
            </div>
          );
        })}
      </div>
      <h2 className='order__card-total'>Monto total: ${order.total}</h2>
    </div>
  );
};
