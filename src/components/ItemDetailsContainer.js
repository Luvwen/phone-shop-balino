import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ItemDetail } from './ItemDetail';
import { collectionProducts } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const ItemDetailsContainer = () => {
  const [product, setProduct] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const selectedDevice = useParams();
  const selectedIdDevice = selectedDevice.id;

  useEffect(() => {
    setIsLoading(true);

    const docRef = doc(collectionProducts, selectedIdDevice);

    getDoc(docRef)
      .then((ref) => {
        setProduct({ id: ref.id, ...ref.data() });
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
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
