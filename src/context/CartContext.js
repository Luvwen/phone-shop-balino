import { useEffect, useState } from 'react';
import { createContext } from 'react';

import Swal from 'sweetalert2';

export const context = createContext();

const Provider = context.Provider;

export const CartContext = ({ children }) => {
  const items = JSON.parse(localStorage.getItem('products'));
  const wishListArray = JSON.parse(localStorage.getItem('wishlist'));
  const wishListHeart = JSON.parse(localStorage.getItem('wishlistHeart'));

  const [shopCartItems, setShopCartItems] = useState(items || []);
  const [favProducts, setFavProducts] = useState(wishListArray || []);
  const [addedToFav, setAddedToFav] = useState(wishListHeart || []);

  const cartLength = shopCartItems.reduce(
    (accum, item) => accum + item.selectedQuantity,
    0
  );

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(shopCartItems));
  }, [shopCartItems]);

  const addItem = (item, quantity, color, checked) => {
    setShopCartItems([
      ...shopCartItems,
      {
        selectedItem: item,
        selectedQuantity: quantity,
        selectedColor: color,
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
      (item) => item.selectedItem.id !== itemId
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
      (item) => id === item.selectedItem.id
    );

    if (isItemInCart !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const purchaseOrder = (id) => {
    setShopCartItems([]);
    Swal.fire('Orden aceptada', `Su id de compra es: ${id}`, 'success');
  };

  const numberFormat = new Intl.NumberFormat('es-AR');

  const sumOfShopItems = numberFormat.format(
    shopCartItems.reduce(
      (accum, item) => accum + item.selectedItem.price * item.selectedQuantity,
      0
    )
  );

  const addItemToFavList = (item, i) => {
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

  const contextValue = {
    addItem: addItem,
    removeItem: removeItem,
    clearItems: clearItems,
    isInCart: isInCart,
    shopCartItems: shopCartItems,
    cartLength: cartLength,
    purchaseOrder: purchaseOrder,
    sumOfShopItems: sumOfShopItems,
    addItemToFavList: addItemToFavList,
    addedToFav: addedToFav,
    favProducts: favProducts,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};
