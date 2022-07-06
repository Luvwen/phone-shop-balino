import React from 'react';

import { ItemDetailCard } from './ItemDetailCard';

export const ItemDetail = ({ item, isLoading }) => {
  return (
    <>{isLoading ? <h1>Loading...</h1> : <ItemDetailCard item={item} />}</>
  );
};
