import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';

//bootstrap
import { Navbar, Container, Nav } from 'react-bootstrap';

import styles from './desktopNavBar.module.css';
import Tool from '../AccountPage/Tool';
import Logo from '../Logo';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser } from '../../store/userSlice';

function DesktopNavBar(props) {
  const user = useSelector(selectUser);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [activeKey, setActiveKey] = useState('/');

  const handleSelectedKeyChange = (selectedKey) => {
    setActiveKey(selectedKey);
    console.log(selectedKey);
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    setActiveKey('/');
    history.push('/');
  };

  const handleAppsClick = () => {
    setActiveKey('/apps');
    history.push('/apps');
  };

  const handleSignUpClick = () => {
    setActiveKey(null);
    history.push('/login');
  };

  const handleLoginClick = () => {
    setActiveKey(null);
    history.push('/login');
  };

  const handleProfileClick = () => {
    setActiveKey(null);
    history.push('/account');
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };
  const NavBarComponent = () => {
    return (
      <div>
        <Navbar bg='light'>
          <Container fluid>
            <Navbar.Brand>
              <Nav.Link onClick={handleHomeClick}>
                <Logo />
              </Nav.Link>
            </Navbar.Brand>
            <Nav
              className='w-100 justify-content-start'
              activeKey={activeKey}
              onSelect={handleSelectedKeyChange}
            >
              <Nav.Link
                eventKey='/'
                className={`${styles.navItem} ${
                  activeKey == '/' ? styles.selectedNav : null
                }`}
                onClick={handleHomeClick}
              >
                Trang ch???
              </Nav.Link>
              {/* <Nav.Link
              eventKey='/apps'
              className={`${styles.navItem} ${
                activeKey == '/apps' ? styles.selectedNav : null
              }`}
              onClick={handleAppsClick}
            >
              ???ng d???ng
            </Nav.Link> */}
            </Nav>
            {/* <Form className={`d-none d-lg-flex ${styles.searchContainer}`}>
            <FormControl
              type='search'
              placeholder='T??m ki???m'
              className='mx-5'
              aria-label='Search'
            />
          </Form> */}
            <div className={`d-flex flex-row ${styles.dropDownMenu}`}>
              {user.isLoggedIn ? (
                <>
                  <button
                    onClick={handleProfileClick}
                    style={{ backgroundColor: 'transparent', borderWidth: '0' }}
                  >
                    <img
                      src={user.data.avatarUrl}
                      alt='avt'
                      style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50px',
                      }}
                    />
                    <span>{user.data.email}</span>
                  </button>
                  <div className={styles.dropDown}>
                    <Tool title='????ng xu???t' handle={handleLogoutClick} />
                  </div>
                </>
              ) : (
                <>
                  <button
                    className={styles.buttonContainer}
                    onClick={handleLoginClick}
                  >
                    ????ng nh???p
                  </button>
                  <button
                    className={styles.buttonContainer}
                    onClick={handleSignUpClick}
                  >
                    ????ng k??
                  </button>
                </>
              )}
            </div>
          </Container>
        </Navbar>
        {isDesktop ? (
          <p style={{ textAlign: 'center', padding: '1rem 0 0 0' }}>
            ???ng d???ng hi???n ch??a c?? giao di???n desktop. Vui l??ng s??? d???ng ??i???n tho???i
            ????? c?? tr???i nghi???m t???t nh???t
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <React.Fragment>
      <NavBarComponent />
    </React.Fragment>
  );
}

export default DesktopNavBar;
