import React, { useState } from 'react';
import styles from './loginForm.module.css';

import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

//icons
import { IoMdClose } from 'react-icons/io';
import { BiUser, BiLockAlt } from 'react-icons/bi';

//redux
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/userSlice';

const DrivingLogin = (props) => {
  const history = useHistory();
  const location = useLocation();

  const goBack = () => {
    history.goBack();
  };

  const handleEmailChange = (event) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (emailRegex.test(event.target.value)) {
      props.setEmail(event.target.value);
      props.setErrorMsg(null);
    } else {
      props.setErrorMsg('Email không hợp lệ');
    }
  };

  const handlePasswordChange = (event) => {
    const passwordRegex = /^.*(?=.{8,30})(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (passwordRegex.test(event.target.value)) {
      props.setPassword(event.target.value);
      props.setErrorMsg(null);
    } else {
      props.setErrorMsg(
        'Mật khẩu phải bao gồm chữ cái và số, độ dài: 8-30 ký tự'
      );
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <p>{location.state ? location.state.message : 'Xin chào!'}</p>
        <IoMdClose
          size={25}
          color='white'
          onClick={goBack}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <form className={styles.formContainer}>
        <div>
          <label className={styles.label} for='formBasicEmail'>
            Email của bạn
          </label>
          <div className={styles.inputContainer}>
            <BiUser style={{ padding: '0.3rem' }} size={30} />
            <input
              id='formBasicEmail'
              type='email'
              placeholder='Nhập địa chỉ email'
              className={styles.input}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div>
          <label className={styles.label} for='formBasicPassword'>
            Mật khẩu
          </label>
          <div className={styles.inputContainer}>
            <BiLockAlt style={{ padding: '0.3rem' }} size={30} />
            <input
              id='formBasicPassword'
              type='password'
              placeholder='Nhập mật khẩu'
              className={styles.input}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <p className={styles.error}>{props.errorMsg}</p>
        {!props.isLogging ? (
          <button
            className={styles.loginBtn}
            type='button'
            onClick={props.onLogin}
          >
            Đăng nhập
          </button>
        ) : (
          <button className={styles.loginBtn} type='button'>
            Đang đăng nhập...
          </button>
        )}
      </form>
    </div>
  );
};

export default DrivingLogin;
