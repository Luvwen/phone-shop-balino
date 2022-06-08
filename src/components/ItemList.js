import React from 'react';
import { Item } from './Item';

export const ItemList = ({ items }) => {
  return items?.map((item) => (
    <Item
      key={item.id}
      id={item.id}
      title={item.title}
      description={item.description}
      price={item.price}
      pictureUrl={item.pictureUrl}
    />
  ));
};
