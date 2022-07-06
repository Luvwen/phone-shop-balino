import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { ItemDetail } from './ItemDetail';
import { collectionProducts } from '../../firebase/firebase';

export const ItemDetailsContainer = () => {
  const [product, setProduct] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const docRef = doc(collectionProducts, id);

    getDoc(docRef)
      .then((ref) => {
        setProduct({ id: ref.id, ...ref.data() });
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, [id]);

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
