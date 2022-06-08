import React, { useEffect, useState } from 'react';
import { ItemList } from './ItemList';
import { devices } from '../data/data';

export const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MockAsync = new Promise((res) => {
      setTimeout(() => {
        res(devices);
      }, 2000);
    });
    MockAsync.then((devices) => {
      setItems(devices);
      setLoading(false);
    });
  }, []);
  return (
    <div className='cards-container'>
      {!loading ? (
        <div className='container-example'>
          <ItemList items={items} />
        </div>
      ) : (
        <h1 className='loading'>Loading...</h1>
      )}
    </div>
  );
};
