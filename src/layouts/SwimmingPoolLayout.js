import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../pages/swimmingPoolTicketPage.module.css';
import TitleBar from '../components/TitleBar';
import { BiSearchAlt } from 'react-icons/bi';

function SwimmingPoolTutorPage({ children, route }) {
  const history = useHistory();

  const onNavigate = (route) => {
    history.push(route);
  };

  return (
    <div className={styles.container}>
      <TitleBar title='Mua vé hồ bơi' />
      <div className={styles.ticketContainer}>
        <div className={styles.headerContainer}>
          <img src='/poolbanner.jpg' alt='banner' />
          <div className={styles.seeMoreButtonContainer}>
            <button
              className={styles.seeMoreButton}
              onClick={() => {
                history.push('/pool-info');
              }}
            >
              Thông tin hồ bơi
            </button>
            <a
              className={styles.seeMoreButton}
              target='_blank'
              rel='noopener noreferer'
              href='https://zalo.me/g/fpjnye186'
            >
              Tham gia nhóm
            </a>
          </div>
        </div>
        {/* 
        <div className={styles.searchContainer}>
          <input
            className={styles.searchTel}
            type='text'
            placeholder='Tra cứu bằng số điện thoại'
          />
          <button className={styles.searchButton}>
            <BiSearchAlt size='25' />
          </button>
        </div> */}

        <div className={styles.ticketFormContainer}>
          <div className={styles.navigationContainer}>
            <button
              className={`${styles.navigationButton} ${
                route == '/ticket' ? styles.ticketButton : null
              }`}
              onClick={() => onNavigate('/pool-ticket', 0)}
            >
              Mua vé tháng
            </button>
            <button
              className={`${styles.navigationButton} ${
                route == '/tutor' ? styles.tutorButton : null
              }`}
              onClick={() => onNavigate('/pool-tutor', 1)}
            >
              Đăng ký học bơi
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default SwimmingPoolTutorPage;
