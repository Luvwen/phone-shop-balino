import { ItemDetailsContainer } from './components/ItemDetailsContainer';
import { ItemListContainer } from './components/ItemListContainer';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting='Buenos dias, soy un ItemListContainer' />
      <ItemDetailsContainer />
    </>
  );
}

export default App;
