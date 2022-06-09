import React, { useState } from 'react';
import styles from './drivingAdminPage.module.css';

import DrivingAdminLayout from '../layouts/DrivingAdminLayout';
import A1Driving from '../components/DrivingAdminPage/A1Driving';
import DrivingDate from '../components/DrivingAdminPage/DrivingDate';
import DrivingLogin from '../components/DrivingAdminPage/DrivingLogin';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser } from '../store/userSlice';
import axios from 'axios';
import A2Driving from '../components/DrivingAdminPage/A2Driving';
import B2Driving from '../components/DrivingAdminPage/B2Driving';

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
    (user.data.role === 1 ||
      user.data.role === 10 ||
      user.data.role === 11 ||
      user.data.role === 12 ||
      user.data.role === 13)
  ) {
    return (
      <DrivingAdminLayout onNavigate={onNavigate} onLogout={handleLogout}>
        {navigation === '/a1' ? <A1Driving /> : null}
        {navigation === '/a2' ? <A2Driving /> : null}
        {navigation === '/b2' ? <B2Driving /> : null}
        {navigation === '/date' ? <DrivingDate /> : null}
      </DrivingAdminLayout>
    );
  }

  return <DrivingLogin />;
}

export default DrivingAdminPage;
