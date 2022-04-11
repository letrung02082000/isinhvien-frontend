import React from 'react';
import styles from './logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <span style={{ color: '#18579D', fontWeight: 'bold' }}>i</span>
      <img className={styles.logo} src='/logo.png' alt='logo' />
      <span style={{ color: '#EE6A26', fontWeight: 'bold' }}>inhvien</span>
    </div>
  );
};

export default Logo;
