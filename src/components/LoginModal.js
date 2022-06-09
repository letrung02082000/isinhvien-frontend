import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './loginModal.module.css';
import { MdOutlineClose } from 'react-icons/md';

const LoginModal = (props) => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/login');
  };

  const handleSignUpClick = () => {
    history.push('/signup');
  };

  return (
    <div className={styles.loginBackdrop}>
      <div className={styles.loginModal}>
        <div className={styles.closeModalButton}>
          <button
            style={{ backgroundColor: 'white', borderWidth: '0' }}
            onClick={props.onClose}
          >
            <MdOutlineClose size={25} />
          </button>
        </div>
        <p style={{ textAlign: 'center' }}>Bạn chưa đăng nhập</p>
        <div className={styles.loginButtonContainer}>
          <button onClick={handleLoginClick} className={'btn btn-primary'}>
            Đăng nhập
          </button>
          <button
            onClick={handleSignUpClick}
            className={'btn btn-primary'}
            style={{ marginTop: '1rem' }}
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
