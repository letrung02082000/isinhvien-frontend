import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Driving from './Driving';
import authHeader from '../../utils/authHeader';
import styles from './drivingDate.module.css';

function DrivingByDate() {
  const [dates, setDates] = useState([]);
  const [drivingDate, setDrivingDate] = useState(null);

  useEffect(() => {
    let today = new Date();
    today = today.toISOString().split('T')[0];
    setDrivingDate(today);

    axios
      .get('/api/driving/date?all=true', authHeader())
      .then((res) => {
        const temp = res.data.data;

        for (let e of temp) {
          e.date = new Date(e.date);
        }

        setDates(temp);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleVisibleButton = (_id, date, isVisible, formVisible = false) => {
    axios
      .put(
        '/api/driving/date',
        {
          _id,
          date,
          isVisible,
          formVisible,
        },
        authHeader()
      )
      .then((res) => {
        if (res.status === 200) {
          axios
            .get('/api/driving/date?all=true', authHeader())
            .then((res) => {
              const temp = res.data.data;

              for (let e of temp) {
                e.date = new Date(e.date);
              }

              setDates(temp);
            })
            .catch((error) => {
              alert(error);
            });
        }
      })
      .catch((error) => {
        alert('Vui lòng liên hệ quản trị để cập nhật');
      });
  };

  const handleAddDateButton = () => {
    axios
      .post(
        '/api/driving/date',
        {
          date: drivingDate,
          isVisible: false,
        },
        authHeader()
      )
      .then((res) => {
        if (res.status === 200) {
          axios
            .get('/api/driving/date?all=true', authHeader())
            .then((res) => {
              const temp = res.data.data;

              for (let e of temp) {
                e.date = new Date(e.date);
              }

              setDates(temp);
              alert('Thêm ngày thành công');
            })
            .catch((error) => {
              alert(error);
            });
        }
      })
      .catch((error) => {
        alert('Vui lòng liên hệ quản trị để thêm ngày');
      });
  };

  const handleChangeDate = (e) => {
    console.log(e.target.value);
    let date = new Date(`${e.target.value} 12:00:00`);
    setDrivingDate(date);
  };

  return (
    <div>
      <div className={styles.addDate}>
        <input
          type='date'
          id='start'
          name='trip-start'
          defaultValue={drivingDate}
          onChange={handleChangeDate}
        />
        <button
          onClick={() => handleAddDateButton()}
          className={styles.dateButton}
        >
          Thêm ngày
        </button>
      </div>
      <p style={{ textAlign: 'center' }}>
        Chỉ có thể thêm và ẩn, không thể xóa. Mặc định sau khi thêm, ngày sẽ bị
        ẩn.
      </p>
      <div>
        {dates.map((child, index) => {
          return (
            <div className={styles.dateContainer}>
              <span>{child.date.toLocaleDateString()}</span>
              <button
                onClick={() => {
                  handleVisibleButton(
                    child._id,
                    child.date,
                    true,
                    child.formVisible
                  );
                }}
                className={styles.dateButton}
                style={
                  child.isVisible
                    ? { backgroundColor: 'var(--primary)', color: 'white' }
                    : null
                }
              >
                Hiện
              </button>
              <button
                onClick={() => {
                  handleVisibleButton(
                    child._id,
                    child.date,
                    false,
                    child.formVisible
                  );
                }}
                className={styles.dateButton}
                style={
                  child.isVisible
                    ? null
                    : { backgroundColor: 'var(--primary)', color: 'white' }
                }
              >
                Ẩn
              </button>
              <button
                onClick={() => {
                  handleVisibleButton(
                    child._id,
                    child.date,
                    child.isVisible,
                    !child.formVisible
                  );
                }}
                className={styles.dateButton}
                style={
                  child.formVisible
                    ? { backgroundColor: 'var(--primary)', color: 'white' }
                    : null
                }
              >
                Hiện trên website
              </button>
            </div>
          );
        })}
      </div>
      <div>{dates.length <= 0 ? 'Không có dữ liệu' : null}</div>
    </div>
  );
}

export default DrivingByDate;
