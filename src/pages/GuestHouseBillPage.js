import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './guestHouseBillPage.module.css';
import { MdArrowBack } from 'react-icons/md';

import authHeader from '../utils/authHeader';

function GuestHouseBillPage() {
  const { state } = useLocation();
  const history = useHistory();
  const [roomInfo, setRoomInfo] = useState({
    name: '',
    state: 0,
    rentType: 0,
  });

  const price =
    state.rentType === 0 ? roomInfo.dailyPrice : roomInfo.monthlyPrice;
  const totalPrice = price * state.duration;

  useEffect(() => {
    axios
      .get(`/api/guest-house/room/${state.guestHouse}`)
      .then((response) => {
        const result = response.data;

        if (response.status === 200) {
          setRoomInfo(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const goBack = () => {
    history.goBack();
  };

  const bookGuestHouse = () => {
    const info = {
      guestHouse: state.guestHouse,
      rentType: state.rentType,
      duration: state.duration,
      startDate: state.startDate,
    };
    axios
      .post('/api/guest-house/book', info, authHeader())
      .then((response) => {
        if (response.status === 200) {
          history.push('/book-guest-house-status', {
            statusText: 'Thành công',
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return history.push('/login');
        }

        const result = error.response.data;
        console.log(result);
        if (result) {
          history.push('/book-guest-house-status', {
            statusText: result.message,
          });
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <button onClick={goBack} className={styles.goBackButton}>
          <MdArrowBack size={25} color='#fff' />
        </button>
        <p className={styles.pageTitle}>Hoá đơn đặt phòng</p>
      </div>
      <div className={styles.roomInfoContainer}>
        <p className={styles.infoTitle}>Thông tin</p>
        <p>Tên phòng: {roomInfo.name}</p>
        <p>
          Tình trạng:{' '}
          {roomInfo.state == 0 ? 'Còn phòng' : 'Không thể đặt phòng này'}
        </p>
        <p>
          Đơn giá:{' '}
          {state.rentType == 0 ? roomInfo.dailyPrice : roomInfo.monthlyPrice}{' '}
          vnđ
        </p>
        <p>
          Hình thức thuê: {state.rentType == 0 ? 'Theo ngày' : 'Theo tháng'}
        </p>
        <p>
          Thời gian: {state.duration} {state.rentType == 0 ? 'ngày' : 'tháng'}{' '}
          (Bạn có thể gia hạn khi gần hết hạn)
        </p>
        <p>
          Ngày bắt đầu:{' '}
          {state.startDate.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className={styles.totalPriceContainer}>
        <p>
          Thành tiền: <span>{totalPrice} vnđ</span>
        </p>
        <button onClick={bookGuestHouse}>Đặt ngay</button>
        {/* <p>Bạn có thể huỷ bất cứ lúc nào</p> */}
      </div>
    </div>
  );
}

export default GuestHouseBillPage;
