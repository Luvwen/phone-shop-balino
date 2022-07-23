import { Route, Routes } from 'react-router-dom';

import { ItemDetailsContainer } from './components/itemDetail/ItemDetailsContainer';
import { ItemListContainer } from './components/itemList/ItemListContainer';
import { NavBar } from './components/navbar/NavBar';
import { CartContext } from './context/CartContext';
import { Cart } from './components/cart/Cart';
import { OrdersContainer } from './components/orders/OrdersContainer';
import { WishlistContainer } from './components/wishlist/WishlistContainer';

function App() {
  return (
    <>
      <CartContext>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/category/:id' element={<ItemListContainer />} />
          <Route path='/category/:categoryid' element={<ItemListContainer />} />
          <Route path='/item/:id' element={<ItemDetailsContainer />} />
          <Route path='/wishlist' element={<WishlistContainer />} />
          <Route path='/orders' element={<OrdersContainer />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </CartContext>
    </>
  );
}

export default App;
