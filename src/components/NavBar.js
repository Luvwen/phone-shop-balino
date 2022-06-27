import React from 'react';
import { Link } from 'react-router-dom';
import { CartWidget } from './CartWidget';

export const NavBar = () => {
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
            <Link to='/category/samsung' className='navbar__list-item'>
              Samsung
            </Link>
            <Link to='/category/motorola' className='navbar__list-item'>
              Motorola
            </Link>
            <Link to='/category/lg' className='navbar__list-item'>
              Lg
            </Link>
            <Link to='/carrito' className='navbar__list-item'>
              <CartWidget />
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
};
