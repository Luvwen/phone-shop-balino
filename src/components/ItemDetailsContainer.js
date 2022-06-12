import React, { useEffect, useState } from 'react';
import { ItemDetail } from './ItemDetail';

export const ItemDetailsContainer = () => {
  const [product, setProduct] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const MockAsync = new Promise((res) => {
      setTimeout(() => {
        const productExample = {
          id: 1,
          title: 'Samsung',
          description: 'Descripción de ejemplo',
          price: '150.000',
          pictureUrl:
            'https://images.fravega.com/f500/a2793cd31a44e2f8f6746b207a2bc6dd.jpg',
        };

        res(productExample);
      }, 2000);
    });

    MockAsync.then((product) => {
      setProduct(product);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className='container-example center'>
      <ItemDetail item={product} isLoading={isLoading} />
    </div>
  );
};
