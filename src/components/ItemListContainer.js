import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ItemList } from './ItemList';
import { collectionProducts } from '../firebase/firebase';

export const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const urlParams = useParams();
  const urlIdParams = urlParams.id;

  useEffect(() => {
    setLoading(true);

    getDocs(collectionProducts)
      .then((res) => {
        const getProducts = res.docs.map((product) => {
          const aux = product.data();
          aux.id = product.id;
          return aux;
        });
        if (urlIdParams !== undefined) {
          let samsungDevices = getProducts.filter(
            (device) => device.brand.toLowerCase() === urlIdParams
          );
          setItems(samsungDevices);
        } else {
          setItems(getProducts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
