import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { devices } from '../data/data';
import { ItemDetail } from './ItemDetail';

export const ItemDetailsContainer = () => {
  const [product, setProduct] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const selectedDevice = useParams();
  const selectedIdDevice = selectedDevice.id;

  useEffect(() => {
    const MockAsync = new Promise((res) => {
      setTimeout(() => {
        let filteredDevices = devices.filter(
          (device) => parseInt(selectedIdDevice) === device.id
        );
        res(filteredDevices);
      }, 200);
    });

    MockAsync.then((product) => {
      setProduct(product);
      setIsLoading(false);
    });
    MockAsync.catch((err) => console.log(err));
  }, [selectedIdDevice]);

  return (
    <div className='container-example center'>
      {!isLoading ? (
        <ItemDetail item={product} isLoading={isLoading} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
