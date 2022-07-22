import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

import { Item } from './Item';
import { context } from '../../context/CartContext';

export const ItemList = ({ items }) => {
  const { addItemToFavList, addedToFav } = useContext(context);
  const handleAddFav = (item, index) => {
    addItemToFavList(item, index);
  };

  return items?.map((item) => (
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
          handleAddFav(item, item.index);
        }}
        icon={
          addedToFav.find((itemHeart) => itemHeart.i === item.index)
            ? faHeartbeat
            : faHeart
        }
        className='wishlist-heart'
      />
    </div>
  ));
};
