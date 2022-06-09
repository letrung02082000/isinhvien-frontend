import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TitleBar } from '../_commons';
import styles from './container.module.css';

function Container() {
  const [data, setData] = useState([]);
  const [roomSelected, setRoomSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('/api/guest-house/room')
      .then((res) => {
        setData(res.data.data);

        if (res.data.data[0]) {
          setRoomSelected(res.data.data[0]);
        }
      })
      .catch((err) => {
        alert(err.toString());
      });
  }, []);

  const handleRoomChange = (e) => {
    setRoomSelected(e.target.value);
  };

  const handleSubmitButton = () => {
    const note = document.getElementById('formNote')?.value;

    if (!roomSelected) {
      return alert('Vui lòng chọn phòng của bạn!');
    }

    if (!note) {
      return alert('Vui lòng nhập nội dung yêu cầu sửa chữa của bạn!');
    }

    setLoading(true);

    axios
      .post('/api/guest-house/report', { guestHouse: roomSelected, note })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          alert('Bạn đã gửi yêu cầu sửa chữa thành công!');
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.toString());
      });
  };

  return (
    <div>
      <TitleBar title='Gửi yêu cầu sửa chữa' />
      <div className={styles.container}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Vui lòng chọn phòng của bạn
          </label>
          <select value={roomSelected} onChange={handleRoomChange}>
            {data.map((child) => {
              return (
                <option key={child._id} value={child._id}>
                  Phòng {child.number}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Yêu cầu</label>
          <textarea
            className={styles.formInput}
            placeholder='Nhập nội dung yêu cầu sửa chữa của bạn'
            rows={5}
            id='formNote'
          />
        </div>

        {loading ? (
          <span className={styles.formButton}>Đang gửi yêu cầu</span>
        ) : (
          <button className={styles.formButton} onClick={handleSubmitButton}>
            Gửi yêu cầu
          </button>
        )}
      </div>
    </div>
  );
}

export default Container;
