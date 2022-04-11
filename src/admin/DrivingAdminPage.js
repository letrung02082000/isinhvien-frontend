import React, { useState } from 'react';
import styles from './drivingAdminPage.module.css';

import DrivingAdminLayout from '../layouts/DrivingAdminLayout';
import AllDriving from '../components/DrivingAdminPage/AllDriving';
import DrivingDate from '../components/DrivingAdminPage/DrivingDate';
import DrivingLogin from '../components/DrivingAdminPage/DrivingLogin';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser } from '../store/userSlice';
import axios from 'axios';

function DrivingAdminPage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [navigation, setNavigation] = useState('/all');

  const onNavigate = (value) => {
    setNavigation(value);
  };

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

  if (
    user.isLoggedIn &&
    (user.data.role === 1 || user.data.role === 10 || user.data.role === 11)
  ) {
    return (
      <DrivingAdminLayout onNavigate={onNavigate} onLogout={handleLogout}>
        {navigation === '/all' ? <AllDriving /> : null}
        {navigation === '/date' ? <DrivingDate /> : null}
      </DrivingAdminLayout>
    );
  }

  return <DrivingLogin />;
}

export default DrivingAdminPage;
