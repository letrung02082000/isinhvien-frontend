import React, { useEffect, useState } from 'react';
import TitleBar from '../components/TitleBar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import styles from './jobPage.module.css';
import Loading from '../components/Loading';

function JobPage() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('/api/job')
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar title='Việc làm sinh viên' />
      {loading ? <Loading /> : null}
      {data.map((child) => {
        let date = new Date(child.createdAt);
        date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        let state = 'Không có';
        if (child.state === 1) {
          state = 'Đang mở';
        } else if (child.state === 2) {
          state = 'Đã đóng';
        }
        return (
          <div className={styles.jobContainer} key={child._id}>
            <div className={styles.imageContainer}>
              <img alt='image' src={child.banner} />
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.jobTitle}>{child.title}</p>
              <p>Ngày đăng: {date}</p>
              <p>Thời gian: {child.time}</p>
              <p
                className={styles.jobState}
                style={
                  child.state == 2
                    ? {
                        margin: '0.5rem 0',
                        backgroundColor: 'rgb(245, 55, 55)',
                      }
                    : { margin: '0.5rem 0' }
                }
              >
                {state}
              </p>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.contactButton}
                  onClick={() => history.push(`/job?id=${child._id}`)}
                >
                  Xem thông tin liên hệ
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default JobPage;
