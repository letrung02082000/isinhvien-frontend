import React, { useState } from 'react';
import styles from './drivingLogin.module.css';

import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

//icons
import { IoMdClose } from 'react-icons/io';
import { BiUser, BiLockAlt } from 'react-icons/bi';

//redux
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/userSlice';

const DrivingLogin = (props) => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const goBack = () => {
    history.goBack();
  };

  const handleEmailChange = (event) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (emailRegex.test(event.target.value)) {
      setEmail(event.target.value);
      setErrorMsg(null);
    } else {
      setErrorMsg('Email không hợp lệ');
    }
  };

  const handlePasswordChange = (event) => {
    const passwordRegex = /^.*(?=.{8,30})(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (passwordRegex.test(event.target.value)) {
      setPassword(event.target.value);
      setErrorMsg(null);
    } else {
      setErrorMsg('Mật khẩu chỉ chứa chữ cái và số, độ dài: 8-30 ký tự');
    }
  };

  const handleLoginClick = async (event) => {
    setIsLogging(true);

    const user = {
      email: document.getElementById('formBasicEmail').value,
      password: document.getElementById('formBasicPassword').value,
    };

    try {
      const response = await axios.post('/api/admin/driving-login', user);

      if (response.status === 200) {
        console.log(response.data);

        setIsLoggedIn(true);
        setIsLogging(false);

        const result = response.data;
        const userInfo = {
          id: result.data.id,
          email: result.data.email,
          avatarUrl: result.data.avatarUrl || 'avatar-default.png',
          name: result.data.name,
          role: result.data.role,
        };

        localStorage.setItem('user-info', JSON.stringify(userInfo));
        localStorage.setItem('user-jwt-tk', result.data.accessToken);
        localStorage.setItem('user-jwt-rftk', result.data.refreshToken);
        dispatch(
          updateUser({
            isLoggedIn: true,
            data: userInfo,
          })
        );

        history.push('/driving-admin');
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 404 ||
          error.response.status === 403)
      ) {
        setErrorMsg('Email hoặc mật khẩu không đúng');
      } else {
        setErrorMsg('Không thể kết nối đến máy chủ. Vui lòng thử lại sau!');
      }

      setIsLoggedIn(false);
      setIsLogging(false);
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
        <p className={styles.error}>{errorMsg}</p>
        {!isLogging ? (
          <button
            className={styles.loginBtn}
            type='button'
            onClick={handleLoginClick}
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
