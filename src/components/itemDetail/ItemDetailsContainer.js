import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { ItemDetail } from './ItemDetail';
import { collectionProducts } from '../../firebase/firebase';

export const ItemDetailsContainer = () => {
  const [product, setProduct] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const docRef = doc(collectionProducts, id);

    getDoc(docRef)
      .then((ref) => {
        if (ref.data() === undefined) {
          setIsLoading(false);
          setError(true);
        } else {
          setProduct({ id: ref.id, ...ref.data() });
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (error) return <h1>Producto invalido</h1>;

  return <>{isLoading ? <h1>Loading...</h1> : <ItemDetail item={product} />}</>;
};
