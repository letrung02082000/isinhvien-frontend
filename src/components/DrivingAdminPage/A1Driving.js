import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Driving from './Driving';
import styles from './allDriving.module.css';
import authHeader from '../../utils/authHeader';
import ImagePad from './ImagePad';
import { updateDrivingData } from '../../store/drivingAdminSlice';
import { useDispatch } from 'react-redux';

function AllDriving() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [dateSelected, setDateSelected] = useState(0);
  const [state, setState] = useState(null);
  const [image, setImage] = useState(null);
  const [isAll, setIsAll] = useState(false);
  const [count, setCount] = useState(0);

  const checkDuplicate = (data) => {
    const newData = data.map((child) => {
      let dup = 0;

      for (let element of data) {
        if (element.tel == child.tel) {
          ++dup;
        }
      }

      child.dup = dup;

      return child;
    });
    return newData;
  };

  useEffect(() => {
    dispatch(updateDrivingData(data));
  }, [data]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/driving/date?isVisible=true', authHeader())
      .then(async (res) => {
        const temp = res.data.data;

        for (let e of temp) {
          e.date = new Date(e.date);
        }

        setDates(temp);

        if (temp[0]) {
          axios
            .get('/api/driving/query', {
              params: { date: temp[0].date, state: null },
              ...authHeader(),
            })
            .then((res) => {
              const newData = checkDuplicate(res.data.data);
              setData(newData);
              setDateSelected(0);
              setLoading(false);
            })
            .catch((error) => {
              alert(error);
              setLoading(false);
            });
        }

        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  }, []);

  const queryDrivings = async (dateIndex, state) => {
    if (dateIndex === null) {
      axios
        .get('/api/driving/query', {
          params: { date: null, state },
          ...authHeader(),
        })
        .then((res) => {
          const newData = checkDuplicate(res.data.data);
          setData(newData);
          setDateSelected(dateIndex);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    } else {
      axios
        .get('/api/driving/query', {
          params: { date: dates[dateIndex].date, state },
          ...authHeader(),
        })
        .then((res) => {
          const newData = checkDuplicate(res.data.data);
          setData(newData);
          setDateSelected(dateIndex);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }
  };

  const handleDateButton = async (index) => {
    setLoading(true);
    setIsAll(false);

    if (index === null) {
      await queryDrivings(null, state);
      return;
    }

    await queryDrivings(index, state);
    setDateSelected(index);
  };

  const handleStateButton = async (value) => {
    setIsAll(false);
    setLoading(true);
    setState(value);
    await queryDrivings(dateSelected, value);
  };

  const showImage = (image) => {
    setImage(image);
  };

  const hideImage = (image) => {
    setImage(null);
  };

  const countDrivings = async () => {
    axios
      .get('/api/driving/count', {
        ...authHeader(),
        params: { state },
      })
      .then((res) => {
        setCount(res.data.data);
      })
      .catch((error) => {
        alert(error.toString());
      });
  };

  const getAllDrivings = async (state) => {
    axios
      .get('/api/driving/all', {
        ...authHeader(),
        params: {
          state,
        },
      })
      .then((res) => {
        const newData = checkDuplicate(res.data.data);
        setData(newData);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const handleAllDatesButton = async () => {
    setLoading(true);
    setIsAll(true);
    setDateSelected(null);
    await queryDrivings(null, null);
  };

  return (
    <div>
      {image ? <ImagePad onClose={hideImage} image={image} /> : null}
      <div className={styles.tableHeader}>
        <p className={styles.date}>Ngày thi</p>
        <p className={styles.date}>Ngày tạo</p>
        <p className={styles.name}>Họ tên</p>
        <p className={styles.tel}>Liên hệ</p>

        <p className={styles.payment}>Hình thức thanh toán</p>
        <p className={styles.paid}>Lệ phí</p>
        <p className={styles.processState}>Trạng thái</p>
      </div>

      <div className={styles.dateFilter}>
        {dates.map((child, index) => {
          return (
            <button
              onClick={() => handleDateButton(index)}
              className={styles.dateButton}
              key={child._id}
              style={
                dateSelected === index
                  ? { backgroundColor: 'var(--primary)', color: 'white' }
                  : null
              }
            >
              {child.date.toLocaleDateString()}
            </button>
          );
        })}

        <button
          onClick={() => handleAllDatesButton()}
          className={styles.dateButton}
          style={
            isAll ? { backgroundColor: 'var(--primary)', color: 'white' } : null
          }
        >
          Tất cả
        </button>
        <span>Tổng: {data.length} hồ sơ</span>
      </div>
      <div className={styles.stateButtonContainer}>
        <button
          onClick={() => handleStateButton(null)}
          className={styles.dateButton}
          style={
            state == null
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : null
          }
        >
          Tất cả
        </button>

        <button
          onClick={() => handleStateButton(0)}
          className={styles.dateButton}
          style={
            state === 0
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : null
          }
        >
          Đã tạo
        </button>
        <button
          onClick={() => handleStateButton(1)}
          className={styles.dateButton}
          style={
            state === 1
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : null
          }
        >
          Chờ cập nhật
        </button>
        <button
          onClick={() => handleStateButton(2)}
          className={styles.dateButton}
          style={
            state === 2
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : null
          }
        >
          Chờ thanh toán
        </button>
        <button
          onClick={() => handleStateButton(3)}
          className={styles.dateButton}
          style={
            state === 3
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : null
          }
        >
          Đã hoàn tất
        </button>
        <button
          onClick={() => handleStateButton(4)}
          className={styles.dateButton}
          style={
            state === 4
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : null
          }
        >
          Đã hủy
        </button>
      </div>

      {data.length <= 0 ? <p>Không có dữ liệu</p> : null}

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div>
          {data.map((child) => {
            return (
              <Driving
                info={child}
                dateList={dates}
                key={child._id}
                id={child._id}
                showImage={showImage}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AllDriving;
