import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import GoogleLogin from 'react-google-login';

import { IoMdClose } from 'react-icons/io';
import { BiUser, BiLockAlt } from 'react-icons/bi';

import styles from './loginPage.module.css';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, selectUser } from '../store/userSlice';

const LoginPage = (props) => {
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const clientId =
    '1068638586953-fgkf520a6sj0r4kv6epvmnppunfk2t1k.apps.googleusercontent.com';

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogging, setIsLogging] = useState(user.isLoggedIn);

  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios
      .post('/api/user/google-login', { tokenId: response.tokenId })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setIsLogging(false);

          const result = response.data;
          const userInfo = {
            id: result.data.id,
            email: result.data.email,
            avatarUrl: result.data.avatarUrl || 'avatar-default.png',
            name: result.data.name,
          };

          console.log(result);

          localStorage.setItem('user-info', JSON.stringify(userInfo));
          localStorage.setItem('user-jwt-tk', result.data.accessToken);
          localStorage.setItem('user-jwt-rftk', result.data.refreshToken);

          dispatch(
            updateUser({
              isLoggedIn: true,
              data: userInfo,
            })
          );
          history.goBack();
        } else {
          // console.log(response.message);
          setErrorMsg('????ng nh???p kh??ng th??nh c??ng');
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg('????ng nh???p kh??ng th??nh c??ng');
      });
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  const goBack = () => {
    history.goBack();
  };

  const handleEmailChange = (event) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (emailRegex.test(event.target.value)) {
      setEmail(event.target.value);
      setErrorMsg(null);
    } else {
      setErrorMsg('Email kh??ng h???p l???');
    }
  };

  const handlePasswordChange = (event) => {
    const passwordRegex = /^.*(?=.{8,30})(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (passwordRegex.test(event.target.value)) {
      setPassword(event.target.value);
      setErrorMsg(null);
    } else {
      setErrorMsg('M???t kh???u ph???i bao g???m ch??? c??i v?? s???, ????? d??i: 8-30 k?? t???');
    }
  };

  const handleLoginClick = async (event) => {
    setIsLogging(true);

    const user = {
      email: document.getElementById('formBasicEmail').value,
      password: document.getElementById('formBasicPassword').value,
    };

    try {
      const response = await axios.post('/api/user/login', user);

      if (response.status === 200) {
        setIsLoggedIn(true);
        setIsLogging(false);

        const result = response.data;
        const userInfo = result.data;

        localStorage.setItem('user-jwt-tk', result.data.accessToken);
        localStorage.setItem('user-jwt-rftk', result.data.refreshToken);

        delete userInfo.accessToken;
        delete userInfo.refreshToken;
        localStorage.setItem('user-info', JSON.stringify(userInfo));

        dispatch(
          updateUser({
            isLoggedIn: true,
            data: userInfo,
          })
        );
        history.goBack();
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        (error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 404)
      ) {
        setErrorMsg('Email ho???c m???t kh???u kh??ng ????ng');
      } else {
        setErrorMsg('Kh??ng th??? k???t n???i ?????n m??y ch???. Vui l??ng th??? l???i sau!');
      }

      setIsLoggedIn(false);
      setIsLogging(false);
    }
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault();

    const user = {
      email: document.getElementById('formBasicEmail').value,
      password: document.getElementById('formBasicPassword').value,
    };

    try {
      const response = await axios.post('/api/user/signup', user);

      if (response.status === 201) {
        setErrorMsg('????ng k?? th??nh c??ng! ??ang ????ng nh???p l???i...');

        const loginResponse = await axios.post('/api/user/login', user);

        if (loginResponse.status === 200) {
          const result = loginResponse.data;
          const userInfo = result.data;

          localStorage.setItem('user-jwt-tk', result.data.accessToken);
          localStorage.setItem('user-jwt-rftk', result.data.refreshToken);

          delete userInfo.accessToken;
          delete userInfo.refreshToken;
          localStorage.setItem('user-info', JSON.stringify(userInfo));

          dispatch(
            updateUser({
              isLoggedIn: true,
              data: userInfo,
            })
          );

          setTimeout(() => {
            history.goBack();
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error.response);

      if (error.response.status == 400 && error.response.data.errorCode == 0) {
        setErrorMsg(
          '?????a ch??? email ???? t???n t???i. Vui l??ng li??n h??? admin ????? kh??i ph???c l???i m???t kh???u'
        );
      } else if (
        error.response.status == 400 &&
        error.response.data.errorCode == 1
      ) {
        setErrorMsg('M???t kh???u ph???i bao g???m ch??? c??i v?? s???, ????? d??i: 8-30 k?? t???');
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      {isLoggedIn ? (
        <h3>????ng nh???p th??nh c??ng</h3>
      ) : (
        <>
          <div className={styles.header}>
            <p>{location.state ? location.state.message : 'Xin ch??o!'}</p>
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
                Email c???a b???n
              </label>
              <div className={styles.inputContainer}>
                <BiUser style={{ padding: '0.3rem' }} size={30} />
                <input
                  id='formBasicEmail'
                  type='email'
                  placeholder='Nh???p ?????a ch??? email'
                  className={styles.input}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div>
              <label className={styles.label} for='formBasicPassword'>
                M???t kh???u
              </label>
              <div className={styles.inputContainer}>
                <BiLockAlt style={{ padding: '0.3rem' }} size={30} />
                <input
                  id='formBasicPassword'
                  type='password'
                  placeholder='Nh???p m???t kh???u'
                  className={styles.input}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <p className={styles.error}>{errorMsg}</p>
            {!isLogging ? (
              <>
                <button
                  className={styles.loginBtn}
                  type='button'
                  onClick={handleLoginClick}
                >
                  ????ng nh???p
                </button>
                <button
                  className={styles.signupBtn}
                  type='button'
                  onClick={handleSignUpClick}
                >
                  ????ng k?? t??i kho???n
                </button>
              </>
            ) : (
              <button className={styles.loginBtn} type='button'>
                ??ang ????ng nh???p...
              </button>
            )}
            <div className={styles.horizonContainer}>
              <hr />
              <span>ho???c</span>
              <hr />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '2rem 0 7rem',
                alignItems: 'center',
              }}
            >
              <p style={{ textAlign: 'center' }}>
                Vui l??ng m??? tr??nh duy???t (Chrome, Firefox, Safari) v?? truy c???p
                website isinhvien.vn ????? s??? d???ng t??nh n??ng n??y.
              </p>
              <GoogleLogin
                clientId={clientId}
                buttonText='????ng nh???p b???ng Google'
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <p></p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
