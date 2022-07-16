import React from 'react';

export const OrderDetail = ({ order }) => {
  const date = order.date;
  const dateConverted = JSON.stringify(new Date(date.seconds * 1000));
  return (
    <div className='order__card'>
      <h3 className='order__card-date'>Fecha de compra: {dateConverted}</h3>
      <div className='products'>
        {order.shopOrderToUser.map((item, id) => {
          return (
            <div className='products__card' key={id}>
              <p className='products__card-item'>{item.item}</p>
              <p className='products__card-item'>Cantidad: {item.cantidad}</p>
              <p className='products__card-item'>Color: {item.color.color}</p>
            </div>
          );
        })}
      </div>
      <h2 className='order__card-total'>Total: ${order.total}</h2>
    </div>
  );
};
