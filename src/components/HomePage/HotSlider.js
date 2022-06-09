import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsCalendar2Check } from 'react-icons/bs';
import { BiQrScan } from 'react-icons/bi';

//styles
import './hotSlider.css';
import styles from './hotSlider.module.css';

//utils
import useMediaQuery from '../../hooks/useMediaQuery';
import classNames from 'classnames';

//redux
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';

function HotSlider(props) {
  const history = useHistory();
  const user = useSelector(selectUser);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleGuestHouseItemClick = () => {
    history.push('/guest-house');

    // if (!user.isLoggedIn) {
    //   // navigateTo('/login', { message: 'Vui lòng đăng nhập để tiếp tục!' });
    //   history.push('/maintain');
    // } else {
    // }
  };

  const handleQrCodeItemClick = () => {
    if (!user.isLoggedIn) {
      navigateTo('/login', { message: 'Vui lòng đăng nhập để tiếp tục!' });
    } else {
      history.push('/qrscan');
    }
  };

  const navigateTo = (url, state) => {
    history.push(url, state);
  };

  return (
    <div className={styles.hotSliderContainer}>
      <div style={{ padding: '0 0.3rem 0 0' }} className={styles.itemContainer}>
        <div onClick={handleGuestHouseItemClick} style={{ cursor: 'pointer' }}>
          <GuestHouseItem />
        </div>
      </div>
      <div style={{ padding: '0 0 0 0.3rem' }} className={styles.itemContainer}>
        <div onClick={handleQrCodeItemClick} style={{ cursor: 'pointer' }}>
          <SwimmingPoolItem />
        </div>
      </div>
    </div>
  );
}

export default HotSlider;

const GuestHouseItem = () => (
  <div className={classNames(styles.guestHouse, styles.hotItem)}>
    <div className={styles.blurHotItem}>
      <div
        className={styles.hotItemIcon}
        style={{ backgroundColor: 'rgb(27, 183, 173)' }}
      >
        <BsCalendar2Check size={32} />
      </div>
      <div className={styles.hotItemTextContainer}>
        <p className={styles.hotItemText}>Đặt phòng</p>
        <p className={styles.hotItemSubText}>Nhà khách</p>
      </div>
    </div>
  </div>
);

const SwimmingPoolItem = () => (
  <div className={classNames(styles.swimmingPool, styles.hotItem)}>
    <div className={styles.blurHotItem}>
      <div className={styles.hotItemIcon}>
        <BiQrScan size={32} />
      </div>
      <div className={styles.hotItemTextContainer}>
        <p className={styles.hotItemText}>Quét mã</p>
        <p className={styles.hotItemSubText}>Check in/Thanh toán</p>
      </div>
    </div>
  </div>
);
