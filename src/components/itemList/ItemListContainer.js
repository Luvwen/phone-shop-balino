import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ItemList } from './ItemList';
import { collectionProducts, getItemsFromDb } from '../../firebase/firebase';
import { query, where } from 'firebase/firestore';

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
  }, [urlParams.id, urlIdParams]);

  if (loading) return <h1 className='loading'>Loading...</h1>;

  return (
    <section className='home'>
      <div className='home__container'>
        <div className='home__description'>
          <h1 className='home__description-title'>
            La mejor tecnología en un{' '}
            <span className='line-breaker'>solo lugar.</span>
          </h1>
          <p className='home__description-text'>
            Explorar{' '}
            <span className='home__description-text-emphasis'>
              #DoWhatYouCant
            </span>
          </p>
        </div>
        <div>
          <img
            className='home__container-image'
            src='/assets/examplePicture.png'
            alt='Samsung s20 128gb'
          ></img>
        </div>
      </div>
      <div className='container-example'>
        <ItemList items={items} />
      </div>
    </section>
  );
};
