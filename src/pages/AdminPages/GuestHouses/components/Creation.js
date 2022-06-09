import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './creation.module.css';

function Creation() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get('/api/guest-house/category', {
        params: { page: 0, limit: 10 },
      })
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => alert(err.toString));
  }, []);

  const handleSubmitButton = () => {
    const number = document.getElementById('formNumber').value;
    const description = document.getElementById('formDesc').value;
    const category = document.getElementById('formCategory').value;
    const dailyPrice = document.getElementById('formDailyPrice').value;
    const monthlyPrice = document.getElementById('formMonthlyPrice').value;
    const minQuantity = document.getElementById('formMinQuantity').value;
    const maxQuantity = document.getElementById('formMaxQuantity').value;

    if (
      !number ||
      !description ||
      !category ||
      !dailyPrice ||
      !monthlyPrice ||
      !minQuantity ||
      !maxQuantity
    ) {
      return alert('Vui lòng nhập đầy đủ các trường!');
    }

    if (isNaN(number)) {
      return alert('Số phòng không hợp lệ');
    }

    if (isNaN(dailyPrice)) {
      return alert('Giá ngày không hợp lệ');
    }

    if (isNaN(monthlyPrice)) {
      return alert('Giá tháng không hợp lệ');
    }

    if (isNaN(minQuantity)) {
      return alert('Số lượng tối thiểu không hợp lệ');
    }

    if (isNaN(maxQuantity)) {
      return alert('Số lượng tối đa không hợp lệ');
    }

    const confirmed = window.confirm(
      `Bạn có chắc chắn tạo phòng ${number} với các thông tin đã cung cấp không?`
    );

    if (confirmed) {
      axios
        .post('/api/guest-house/room', {
          number,
          description,
          category,
          dailyPrice,
          monthlyPrice,
          minQuantity,
          maxQuantity,
        })
        .then((res) => {
          return alert('Tạo phòng thành công!');
        })
        .catch((err) => {
          console.log(err);
          return alert(err.toString());
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Số phòng</label>
        <input className={styles.formInput} type='text' id='formNumber' />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Mô tả</label>
        <textarea className={styles.formInput} id='formDesc'></textarea>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Loại phòng</label>
        <select id='formCategory'>
          {category.map((child) => {
            return <option value={child._id}>{child.name}</option>;
          })}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Giá ngày</label>
        <input className={styles.formInput} type='text' id='formDailyPrice' />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Giá tháng</label>
        <input className={styles.formInput} type='text' id='formMonthlyPrice' />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Số lượng tối thiểu</label>
        <input className={styles.formInput} type='text' id='formMinQuantity' />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Số lượng tối đa</label>
        <input className={styles.formInput} type='text' id='formMaxQuantity' />
      </div>
      <button className={styles.formButton} onClick={handleSubmitButton}>
        Tạo phòng
      </button>
    </div>
  );
}

export default Creation;
