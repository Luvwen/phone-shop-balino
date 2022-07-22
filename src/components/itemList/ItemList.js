import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

import { Item } from './Item';

export const ItemList = ({ items }) => {
  const wishListArray = JSON.parse(localStorage.getItem('wishlist'));
  const wishListHeart = JSON.parse(localStorage.getItem('wishlistHeart'));
  const [addedToFav, setAddedToFav] = useState(wishListHeart || []);
  const [favProducts, setFavProducts] = useState(wishListArray || []);

  const handleAddFav = (item, i) => {
    const isItemInCart = favProducts.find((prod) => item.id === prod.id);
    if (isItemInCart === undefined) {
      setFavProducts([...favProducts, item]);
      setAddedToFav([...addedToFav, { i: i }]);
    } else {
      const arrayWithoutItemSelected = favProducts.filter(
        (prod) => item.id !== prod.id
      );
      const arrayWithoutHeart = addedToFav.filter((heart) => i !== heart.i);
      setFavProducts(arrayWithoutItemSelected);
      setAddedToFav(arrayWithoutHeart);
    }
  };

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(favProducts));
  }, [favProducts]);

  useEffect(() => {
    localStorage.setItem('wishlistHeart', JSON.stringify(addedToFav));
  }, [addedToFav]);

  return items?.map((item, i) => (
    <div key={item.id}>
      <Link to={`/item/${item.id}`} className='item-links'>
        <Item
          id={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          pictureUrl={item.pictureUrl}
        />
      </Link>
      <FontAwesomeIcon
        onClick={() => {
          handleAddFav(item, i);
        }}
        icon={addedToFav.find((item) => item.i === i) ? faHeartbeat : faHeart}
        className='wishlist-heart'
      />
    </div>
  ));
};
