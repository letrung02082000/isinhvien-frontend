import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser } from '../store/userSlice';

import styles from './accountPage.module.css';

//component
import {
  AccountInfo,
  AccountHistory,
  Tool,
} from '../components/AccountPage/index';
import AccountItem from '../components/AccountPage/AccountItem';
import MainLayout from '../layouts/MainLayout';

function AccountPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLoginClick = () => {
    history.push('/login');
  };

  const handleSignUpClick = () => {
    history.push('/login');
  };

  // const handleUpdateInfo = () => {
  //   history.push('/profile');
  // };
  const handleLogout = () => {
    const refreshToken = localStorage.getItem('user-jwt-rftk');
    axios
      .post('/api/user/logout', { refreshToken })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.removeItem('user-info');
    localStorage.removeItem('user-jwt-tk');
    localStorage.removeItem('user-jwt-rftk');
    dispatch(logoutUser());
  };

  return (
    <MainLayout>
      <div className={styles.accountPageContainer}>
        {user.isLoggedIn ? (
          <>
            <AccountInfo />
            {/* <AccountHistory />
          <Tool handle={handleUpdateInfo} title='Cập nhật thông tin' />
          <Tool handle={handleUpdateInfo} title='Cài đặt' />
          <Tool handle={handleUpdateInfo} title='Về chúng tôi' />
          <Tool handle={handleUpdateInfo} title='Báo cáo lỗi' /> */}
            <Tool handle={handleLogout} title='Đăng xuất' />
          </>
        ) : (
          <div style={{ position: 'relative', height: '100%' }}>
            <div>
              <div className={styles.welcomeTitle}>
                <p>Chào mừng bạn đến với iSinhVien!</p>
                <button
                  onClick={handleLoginClick}
                  className={styles.buttonOutlined}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={handleSignUpClick}
                  className={styles.buttonOutlined}
                >
                  Đăng ký ngay
                </button>
              </div>
              <AccountItem route='/support'>Hỗ trợ</AccountItem>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default AccountPage;
