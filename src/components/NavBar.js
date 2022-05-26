import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <header>
        <nav className='navbar'>
          <Link to='/' className='navbar__title'>
            LuvwenShop
          </Link>
          <ul className='navbar__list'>
            <Link to='/' className='navbar__list-item'>
              Home
            </Link>
            <Link to='/catalogo' className='navbar__list-item'>
              Catalogo
            </Link>
            <Link to='/carrito' className='navbar__list-item'>
              Carrito
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
