import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import styles from './swimmingTutor.module.css';

function SwimmingTutor() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar title='Học bơi' />
      {/* <div className={styles.seeMoreButtonContainer}>
        <button
          className={styles.seeMoreButton}
          onClick={() => {
            history.push('/pool-info');
          }}
        >
          Giới thiệu
        </button>
        <button
          className={styles.seeMoreButton}
          onClick={() => {
            history.push('/swimming-tutor');
          }}
        >
          Zalo
        </button>
      </div> */}
      {loading ? (
        <p
          style={{
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          Đang tải dữ liệu...
        </p>
      ) : (
        <iframe
          src='https://docs.google.com/forms/d/e/1FAIpQLSdjCQH27iWEjDWE9dWI4IaGwXWJBl-Cbeuh1IvAQUsTYvIrog/viewform?embedded=true'
          width='100%'
          height='812'
          frameborder='0'
          marginheight='0'
          marginwidth='0'
        >
          Đang tải…
        </iframe>
      )}
    </div>
  );
}

export default SwimmingTutor;
