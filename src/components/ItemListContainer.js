import React, { useEffect, useState } from 'react';
import { ItemList } from './ItemList';
import { devices } from '../data/data';
import { useParams } from 'react-router-dom';

export const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const urlParams = useParams();
  const urlIdParams = urlParams.id;

  useEffect(() => {
    setLoading(true);
    const MockAsync = new Promise((res) => {
      setTimeout(() => {
        if (urlIdParams !== undefined) {
          let samsungDevices = devices.filter(
            (device) => device.brand.toLowerCase() === urlIdParams
          );
          res(samsungDevices);
        } else {
          res(devices);
        }
      }, 2000);
    });
    MockAsync.then((devices) => {
      setItems(devices);
      setLoading(false);
    });
    MockAsync.catch((err) => console.log(err));
  }, [urlIdParams]);

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
