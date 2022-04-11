import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Driving from './Driving';
import styles from './allDriving.module.css';
import authHeader from '../../utils/authHeader';
import ImagePad from './ImagePad';

//redux
import { updateDrivingData } from '../../store/drivingAdminSlice';
import { useDispatch } from 'react-redux';
import { BsCheckLg } from 'react-icons/bs';

function AllDriving() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [dateSelected, setDateSelected] = useState(0);
  const [state, setState] = useState(null);
  const [image, setImage] = useState(null);

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
    console.log(newData);
    return newData;
  };

  useEffect(() => {
    dispatch(updateDrivingData(data));
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/driving/date?isVisible=true', authHeader())
      .then((res) => {
        const temp = res.data.data;

        for (let e of temp) {
          e.date = new Date(e.date);
        }

        setDates(temp);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    if (dateSelected === dates.length) {
      if (state === null) {
        axios
          .get('/api/driving/all', authHeader())
          .then((res) => {
            const newData = checkDuplicate(res.data.data);
            setData(newData);
            setLoading(false);
          })
          .catch((error) => {
            alert(error);
            setLoading(false);
          });
      } else {
        axios
          .get('/api/driving/all', {
            params: { state: state },
            ...authHeader(),
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
      }
    }

    if (dates[dateSelected]) {
      axios
        .get('/api/driving/query', {
          params: { date: dates[dateSelected].date, state },
          ...authHeader(),
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
    }
  }, [dates, state]);

  const handleDateButton = (index) => {
    setLoading(true);

    axios
      .get('/api/driving/query', {
        params: { date: dates[index].date, state },
        ...authHeader(),
      })
      .then((res) => {
        const newData = checkDuplicate(res.data.data);
        setData(newData);
        setDateSelected(index);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const handleAllDatesButton = (index) => {
    setLoading(true);

    axios
      .get('/api/driving/all', {
        params: { state },
        ...authHeader(),
      })
      .then((res) => {
        const newData = checkDuplicate(res.data.data);
        setData(newData);
        setDateSelected(index);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const handleStateButton = (value) => {
    setState(value);
  };

  const showImage = (image) => {
    setImage(image);
  };

  const hideImage = (image) => {
    setImage(null);
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
          onClick={() => handleAllDatesButton(dates.length)}
          className={styles.dateButton}
          style={
            dateSelected === dates.length
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : null
          }
        >
          Tất cả
        </button>
        <span>Tổng số: {data.length}</span>
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

      {loading ? <p>Đang tải dữ liệu...</p> : null}
      {data.length <= 0 ? <p>Không có dữ liệu</p> : null}
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
    </div>
  );
}

export default AllDriving;
