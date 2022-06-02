import React from 'react';
import { ItemCount } from './ItemCount';

export const ItemListContainer = ({ greeting }) => {
  return (
    <div className='container-example'>
      <h1>{greeting}</h1>
      <ItemCount initial={1} stock={10} onAdd={() => {}} />
    </div>
  );
};
