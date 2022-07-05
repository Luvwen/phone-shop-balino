import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ItemDetail } from './ItemDetail';
import { collectionProducts } from '../firebase/firebase';
import { getDocs } from 'firebase/firestore';

export const ItemDetailsContainer = () => {
  const [product, setProduct] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const selectedDevice = useParams();
  const selectedIdDevice = selectedDevice.id;

  useEffect(() => {
    setIsLoading(true);

    getDocs(collectionProducts)
      .then((res) => {
        const getProducts = res.docs.map((product) => {
          const aux = product.data();
          aux.id = product.id;
          return aux;
        });

        let filteredDevices = getProducts.filter(
          (device) => selectedIdDevice === device.id
        );

        setProduct(filteredDevices);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
