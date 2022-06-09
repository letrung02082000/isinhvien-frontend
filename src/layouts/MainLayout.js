import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import styles from './mainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        margin: '0',
        marginBottom: '10rem',
      }}
    >
      <div className={styles.hotlineButton}>
        <a target='_blank' href='tel:+84877876877' rel='noopener noreferrer'>
          <img
            src='/hotlineicon.gif'
            alt='icon'
            style={{
              width: '5rem',
              borderRadius: '50px',
            }}
          />
        </a>
        {/* <button className={styles.closeButton}>x</button> */}
      </div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
