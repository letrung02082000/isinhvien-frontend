import React from 'react';

import { useHistory } from 'react-router-dom';
import styles from './voucherCard.module.css';
function VoucherCardVertical(props) {
  const history = useHistory();
  const coupon = props.coupon;
  let d = new Date(coupon.expiryTime);
  const handleClick = () => {
    history.push(`/coupon?id=${coupon._id}`);
  };

  return (
    <div className={styles.cardVertical} onClick={handleClick}>
      {props.isUsed == 0 ? (
        <span
          style={{
            position: 'absolute',
            right: '1rem',
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '0.2rem 0.5rem',
            borderRadius: '5px',
          }}
        >
          Chưa sử dụng
        </span>
      ) : (
        <span
          style={{
            position: 'absolute',
            right: '1rem',
            backgroundColor: '#ccc',
            color: 'white',
            padding: '0.2rem 0.5rem',
            borderRadius: '5px',
          }}
        >
          Đã sử dụng
        </span>
      )}

      <img src='./logo.jpg' alt='logo' />
      <h6>{coupon.name}</h6>
      <div className={styles.cardInfo}>
        <span>Còn lại: {coupon.maxQuantity - coupon.count}</span>
        <span>HSD: {d.toLocaleDateString('en-GB')}</span>
      </div>
    </div>
  );
}

export default VoucherCardVertical;
