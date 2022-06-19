import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from './Item';

export const ItemList = ({ items }) => {
  return items?.map((item) => (
    <Link to={`/item/${item.id}`} key={item.id} className='item-links'>
      <Item
        id={item.id}
        title={item.title}
        description={item.description}
        price={item.price}
        pictureUrl={item.pictureUrl}
      />
    </Link>
  ));
};
