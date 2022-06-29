import { useState } from 'react';
import { createContext } from 'react';

import Swal from 'sweetalert2';

export const context = createContext();

const Provider = context.Provider;

export const CartContext = ({ children }) => {
  const [shopCartItems, setShopCartItems] = useState([]);

  const cartLength = shopCartItems.reduce(
    (accum, item) => accum + item.selectedQuantity,
    0
  );

  const addItem = (item, quantity, checked) => {
    setShopCartItems([
      ...shopCartItems,
      {
        selectedItem: item,
        selectedQuantity: quantity,
      },
    ]);
    if (checked === false) {
      Swal.fire(
        'Objeto agregado',
        'El objeto fue añadido al carrito exitosamente',
        'success'
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const removeItem = (itemId) => {
    const arrayWithoutItemSelected = shopCartItems.filter(
      (item) => item.selectedItem[0].id !== itemId
    );
    setShopCartItems(arrayWithoutItemSelected);
    Swal.fire(
      'Item borrado',
      'El objeto ha sido removido del carrito',
      'success'
    );
  };

  const clearItems = () => {
    setShopCartItems([]);
    Swal.fire(
      'Items borrados',
      'El carrito ahora se encuentra vacio',
      'success'
    );
  };

  const isInCart = (id) => {
    const isItemInCart = shopCartItems.find(
      (item) => id === item.selectedItem[0].id
    );

    if (isItemInCart !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const contextValue = {
    addItem: addItem,
    removeItem: removeItem,
    clearItems: clearItems,
    isInCart: isInCart,
    shopCartItems: shopCartItems,
    cartLength: cartLength,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};
