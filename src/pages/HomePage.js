import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../store/userSlice';
import { updateShow } from '../store/navSlice';

import styles from './homePage.module.css';
import { BiSearchAlt } from 'react-icons/bi';

//utils
import useMediaQuery from '../hooks/useMediaQuery';

//components
import HomeSlider from '../components/HomePage/HomeSlider';
// import HomeLeftNavBar from '../components/HomePage/HomeLeftNavBar';
import CategorySlider from '../components/HomePage/CategorySlider';
import HotSlider from '../components/HomePage/HotSlider';
import MainServices from '../components/HomePage/MainServices';
import Logo from '../components/Logo';

//bootstrap
import { Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';

const HomePage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  dispatch(updateShow(true));

  const isTablet = useMediaQuery('(max-width: 991px)');
  // const isMobile = useMediaQuery('(max-width: 767px)');
  // const isDesktop = useMediaQuery('(min-width: 768px)');

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  return (
    <MainLayout className={styles.homeContainer}>
      {/* {isDesktop ? (
        <p style={{ textAlign: 'center', padding: '1rem 0 0 0' }}>
          Ứng dụng hiện chưa có giao diện desktop. Vui lòng sử dụng điện thoại
          để có trải nghiệm tốt nhât
        </p>
      ) : null} */}
      {isTablet ? (
        <div className={styles.logoContainer}>
          <Logo />
          <div
            className={styles.searchIcon}
            onClick={() =>
              alert(
                'Xin lỗi, tính năng này đang được phát triển. Vui lòng quay lại sau!'
              )
            }
          >
            <BiSearchAlt size={25} />
          </div>
        </div>
      ) : null}
      <div className={styles.homeSliderContainer}>
        <HomeSlider />
      </div>

      <div className={styles.categorySliderContainer}>
        <p
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          Loại hình
        </p>
        <CategorySlider />
      </div>
      <div className={styles.hotSliderContainer}>
        <HotSlider />
      </div>
      <div className={styles.categorySliderContainer}>
        {/* <p
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          Dịch vụ nổi bật
        </p> */}
        <MainServices />
      </div>
      <Footer />
    </MainLayout>
  );
};

export default HomePage;
