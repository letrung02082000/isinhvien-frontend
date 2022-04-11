import React from 'react';
import DesktopNavBar from './NavBar/DesktopNavBar';
import MobileNavBar from './NavBar/MobileNavBar';

import './header.css';

function Header() {
  return (
    <>
      <div className='m-navbar'>
        <MobileNavBar />
      </div>
      <div className='d-navbar'>
        <DesktopNavBar />
      </div>
    </>
  );
}

export default Header;
