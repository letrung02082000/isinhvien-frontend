import React from 'react';
import MainLayout from '../layouts/MainLayout';

import { useDispatch } from 'react-redux';
import { updateNavIndex } from '../store/navSlice';

//styles
import styles from './appsPage.module.css';

//components
import Maintained from '../components/Maintained';

function AppsPage() {
  const dispatch = useDispatch(updateNavIndex);

  React.useEffect(() => {
    dispatch(updateNavIndex(1));
  });

  return (
    <MainLayout>
      <div className={styles.appsContainer}>
        <Maintained />
      </div>
    </MainLayout>
  );
}

export default AppsPage;
