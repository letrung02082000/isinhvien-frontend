import axios from 'axios';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import LoginForm from '../components/LoginForm';
import { updateUser, selectUser } from '../store/userSlice';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';

import styles from './bicycleAdminPage.module.css';
import { authHeader } from '../utils';

function BicycleAdminPage() {
  const [isLogging, setIsLogging] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState(localStorage.getItem('user-jwt-tk'));
  const [refreshing, setRefreshing] = useState();
  const [shownBikes, setShownBikes] = useState(false);
  const [bicycleList, setBicycleList] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const refreshToken = localStorage.getItem('user-jwt-rftk') || '';

  useEffect(() => {
    axios
      .get('/api/bike')
      .then((res) => {
        setBicycleList(res.data.data);
      })
      .catch((err) => alert(err.toString()));
  }, []);

  const handleLoginButton = () => {
    axios
      .post('/api/bike-admin/login', { email, password })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          const userInfo = {
            id: data?.id,
            email: data?.email,
            avatarUrl: data?.avatarUrl || 'avatar-default.png',
            name: data?.name,
            role: data?.role,
          };

          localStorage.setItem('user-info', JSON.stringify(userInfo));
          localStorage.setItem('user-jwt-tk', data.accessToken);
          localStorage.setItem('user-jwt-rftk', data.refreshToken);

          setToken(data.accessToken);

          dispatch(
            updateUser({
              isLoggedIn: true,
              data: userInfo,
            })
          );
        }
      })
      .catch((err) => alert(err.toString()));
  };

  const handleRenewButton = () => {
    setRefreshing(true);
    axios
      .post('/api/bike-admin/refresh', { refreshToken })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('user-jwt-tk', res.data.accessToken);
          setToken(res.data.accessToken);
          setRefreshing(false);
        }
      })
      .catch((err) => {
        setRefreshing(false);
        alert(err.toString());
      });
  };

  const handleLogoutButton = () => {
    const confirmed = window.confirm('Bạn có chắc chắn đăng xuất không?');

    if (confirmed) {
      localStorage.removeItem('user-info');
      localStorage.removeItem('user-jwt-tk');
      localStorage.removeItem('user-jwt-rftk');
      dispatch(
        updateUser({
          isLoggedIn: false,
          data: {},
        })
      );
    }
  };

  const showBikeListButton = () => {
    setShownBikes(true);
  };

  const handleUpdateBicycle = (info) => {
    axios
      .patch(
        `/api/bike/${info._id}`,
        { isAvailable: !info.isAvailable },
        authHeader()
      )
      .then((res) => {
        if (res.status === 200) {
          axios
            .get('/api/bike')
            .then((res) => {
              setBicycleList(res.data.data);
            })
            .catch((err) => alert(err.toString()));
        }
      })
      .catch((err) => alert(err.toString()));
  };

  if (user.isLoggedIn && token) {
    return (
      <div className={styles.container}>
        <button className={styles.logoutButton} onClick={handleLogoutButton}>
          Đăng xuất
        </button>
        {refreshing ? (
          <Loading />
        ) : (
          <QRCode
            id='qrcode'
            value={token}
            size={290}
            level={'H'}
            includeMargin={true}
            //   imageSettings={{
            //     src: 'https://i.imgur.com/wG3nKXR.jpg?1',
            //     excavate: true,
            //   }}
            style={{
              borderRadius: '5px',
              border: '1px solid rgb(27, 183, 110)',
              margin: '2rem 0',
            }}
          />
        )}
        {/* <button className={styles.renewButton} onClick={handleRenewButton}>
          Lấy mã mới
        </button> */}
        <button
          className={styles.renewButton}
          style={
            shownBikes
              ? {
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  fontWeight: 'bold',
                }
              : null
          }
          onClick={showBikeListButton}
        >
          Trả xe
        </button>
        {shownBikes ? (
          <>
            <div className={styles.bicycleListContainer}>
              {bicycleList.map((child) => {
                return (
                  <div
                    key={child._id}
                    className={styles.bicycleItem}
                    onClick={() => handleUpdateBicycle(child)}
                    style={
                      child.isAvailable
                        ? null
                        : { color: '#ccc', borderColor: '#ccc' }
                    }
                  >
                    <span>{child.name}</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      onLogin={handleLoginButton}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
      isLogging={isLogging}
      setIsLogging={setIsLogging}
    />
  );
}

export default BicycleAdminPage;
