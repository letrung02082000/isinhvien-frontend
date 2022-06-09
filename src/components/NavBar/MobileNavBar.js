import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';
import { selectShow } from '../../store/navSlice';

import {
  Navbar,
  Container,
  Stack,
  Button,
  Nav,
  Offcanvas,
} from 'react-bootstrap';
import styles from './mobileNavBar.module.css';

//icons
import { HiHome, HiViewGrid } from 'react-icons/hi';
import { MdExplore, MdAccountCircle } from 'react-icons/md';
import { RiCustomerService2Line } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';

export default function MobileNavBar() {
  const history = useHistory();
  const showNavBar = useSelector(selectShow);
  const [showCanvas, setShowCanvas] = useState(false);
  const [activeKey, setActiveKey] = useState(history.location.pathname);

  const handleHomeClick = () => {
    // dispatch(updateShow(true));
    setActiveKey('/');
    history.push('/');
  };

  const handleAppsClick = () => {
    setActiveKey('/apps');
    history.push('/apps');
  };

  const handleExploreClick = () => {
    setActiveKey('/explore');
    history.push('/explore');
  };

  const handleContactClick = () => {
    setActiveKey('/contact');
    history.push('/contact');
  };

  const handleAccountClick = () => {
    setActiveKey('/account');
    history.push('/account');
  };

  const handleSignUpClick = () => {
    setShowCanvas(false);
    history.push('/signup');
  };

  const handleLoginClick = () => {
    setShowCanvas(false);
    history.push('/login');
  };

  const handleShowCanvas = () => {
    setShowCanvas(true);
  };

  const handleCloseCanvas = () => {
    setShowCanvas(false);
  };

  const BottomNavBar = () => {
    return (
      <Navbar bg='light' variant='light' fixed='bottom' className='pb-0'>
        <Container fluid className={`p-0 ${styles.bottomNavContainer}`}>
          <Nav
            className='mx-0 p-0 d-flex justify-content-around w-100'
            activeKey={activeKey}
          >
            <Nav.Link
              className='m-0 p-1'
              onClick={handleHomeClick}
              eventKey='/'
            >
              <HiHome className={`mx-auto ${styles.navIcon}`} />
              <p className={('m-0 p-0', styles.navText)}>Trang chủ</p>
            </Nav.Link>
            <Nav.Link
              className='m-0 p-1'
              onClick={handleExploreClick}
              eventKey='/explore'
            >
              <MdExplore className={`mx-auto ${styles.navIcon}`} />
              <p className={('m-0 p-0', styles.navText)}>Ưu đãi</p>
            </Nav.Link>
            <Nav.Link
              className='m-0 p-1'
              onClick={handleAccountClick}
              eventKey='/account'
            >
              <MdAccountCircle className={`mx-auto ${styles.navIcon}`} />
              <p className={('m-0 p-0', styles.navText)}>Cá nhân</p>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  };

  const TopNav = () => {
    return (
      <Navbar bg='light' expand={false} className='p-0'>
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link as={Link} to='/'>
              {/* <img
                    src='https://i.imgur.com/wG3nKXR.jpg?1'
                    alt='logo'
                    width='35rem'
                  /> */}
              iSinhVien
            </Nav.Link>
          </Navbar.Brand>
          <Nav className='me-3'>
            <Nav.Item>
              <button
                onClick={handleShowCanvas}
                className={`${styles.accountButton}`}
              >
                <span style={{ marginRight: '0.5rem' }}>Tài khoản</span>
                <MdAccountCircle size={20} />
              </button>
            </Nav.Item>
          </Nav>

          <Navbar.Offcanvas
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
            placement='end'
            show={showCanvas}
          >
            <Offcanvas.Header closeButton onHide={handleCloseCanvas}>
              <Offcanvas.Title id='offcanvasNavbarLabel'>
                Xin chào!
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Stack direction='vertical' gap={3}>
                <Button
                  variant='outline-primary'
                  className={styles.buttonContainer}
                  onClick={handleLoginClick}
                >
                  Đăng nhập
                </Button>
                <Button
                  variant='primary'
                  className={styles.buttonContainer}
                  onClick={handleSignUpClick}
                >
                  Đăng ký
                </Button>
              </Stack>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  };

  return (
    <React.Fragment>
      {showNavBar ? (
        <React.Fragment>
          <BottomNavBar />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}
