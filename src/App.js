import { Route, Routes } from 'react-router-dom';

import { ItemDetailsContainer } from './components/ItemDetailsContainer';
import { ItemListContainer } from './components/ItemListContainer';
import { NavBar } from './components/NavBar';
import { CartContext } from './components/CartContext';
import { Cart } from './components/Cart';

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
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </CartContext>
    </>
  );
}

export default App;
