import { getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ItemList } from './ItemList';
import { collectionProducts, getItemsFromDb } from '../firebase/firebase';

export const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const urlParams = useParams();
  const urlIdParams = urlParams.id;

  useEffect(() => {
    setLoading(true);

    if (urlIdParams !== undefined) {
      // Convertir la primer letra de la categoria de minúscula a mayúscula para que coincida con la category/brand de la base de datos
      const urlIdParams =
        urlParams.id[0].toUpperCase() + urlParams.id.substring(1);

      const filterByCategory = query(
        collectionProducts,
        where('brand', '==', urlIdParams)
      );
      getItemsFromDb(filterByCategory, setItems, setLoading);
    } else {
      getItemsFromDb(collectionProducts, setItems, setLoading);
    }
    setLoading(false);
  }, [urlParams.id, urlIdParams]);

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
