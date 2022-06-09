import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import styles from './voucherCard.module.css';
import authHeader from '../../utils/authHeader';
function VoucherCard(props) {
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);
  const coupon = props.coupon;

  useEffect(() => {
    setStartTime(new Date(coupon.startTime).toLocaleDateString('en-GB'));
    setExpiryTime(new Date(coupon.expiryTime).toLocaleDateString('en-GB'));
  }, [coupon]);

  const today = new Date();
  const isSaved = props.myCouponList.some((c) => c.coupon === coupon._id);
  const notStarted =
    today >= new Date(coupon.startTime) && today < new Date(coupon.expiryTime)
      ? false
      : today < new Date(coupon.startTime)
      ? 'Chưa mở'
      : 'Hết hạn';

  const handleSaveClick = () => {
    axios
      .post('/api/coupon-user/save', { coupon: coupon._id }, authHeader())
      .then((res) => {
        props.setMyCouponList([...props.myCouponList, res.data.data]);
        setRefresh(!refresh);
      })
      .catch((err) => {
        history.push(`/coupon?id=${coupon._id}`);
      });
  };

  const handleClick = () => {
    history.push(`/coupon?id=${coupon._id}&saved=${isSaved ? 1 : 0}`);
  };

  return (
    <div className={props.isVertical ? styles.cardVertical : styles.card}>
      {!notStarted ? (
        !coupon.requireWhiteList ? (
          !isSaved ? (
            <button className={styles.saveButton} onClick={handleSaveClick}>
              Lưu
            </button>
          ) : (
            <button className={styles.saveButton} disabled>
              Đã lưu
            </button>
          )
        ) : (
          <button className={styles.conditionButton}>Điều kiện</button>
        )
      ) : (
        <button className={styles.saveButton} disabled>
          {notStarted}
        </button>
      )}
      <div onClick={handleClick}>
        <img src='/logo2.png' alt='logo' />
        <h6 className={styles.cardTitle}>{coupon.name}</h6>
        <div className={styles.cardInfo}>
          <span>Còn lại: {coupon.maxQuantity - coupon.count}</span>
          <span>HSD: {expiryTime}</span>
        </div>
      </div>
    </div>
  );
}

export default VoucherCard;
