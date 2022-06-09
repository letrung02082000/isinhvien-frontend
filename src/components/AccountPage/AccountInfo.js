import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';

import styles from './accountPage.module.css';
function AccountInfo() {
  const user = useSelector(selectUser).data;
  return (
    <div className={styles.general}>
      <div className={styles.accountInfo}>
        <img
          src={user?.avatarUrl || 'https://i.imgur.com/OWaqqrf.png'}
          style={{ width: '30%' }}
          className='mt-3'
          alt='avt'
        />
        <h6>{user.name}</h6>
        {/* <button  className={styles.simpleButton}>Cập nhật thông tin</button> */}
      </div>
    </div>
  );
}

export default AccountInfo;
