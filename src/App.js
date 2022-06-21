import { Route, Routes } from 'react-router-dom';
import { ItemDetailsContainer } from './components/ItemDetailsContainer';
import { ItemListContainer } from './components/ItemListContainer';
import NavBar from './components/NavBar';
import { ShopCartExample } from './components/ShopCartExample';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/category/:id' element={<ItemListContainer />} />
        <Route path='/category/:categoryid' element={<ItemListContainer />} />
        <Route path='/item/:id' element={<ItemDetailsContainer />} />
        <Route path='/cart' element={<ShopCartExample />} />
      </Routes>
    </>
  );
}

export default App;
