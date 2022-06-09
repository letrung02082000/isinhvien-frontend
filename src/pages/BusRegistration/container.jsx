import axios from 'axios';
import React, { useState } from 'react';
import { TitleBar } from '../_commons';
import styles from './styles.module.css';
import busApi from './api';

function Container(props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitButton = () => {
    setIsLoading(true);
    const formName = document.getElementById('formName').value;
    const formTel = document.getElementById('formTel').value;
    const formZalo = document.getElementById('formZalo').value;
    const formNote = document.getElementById('formNote').value;
    const formAddress = document.getElementById('formAddress').value;

    if (!formName || !formTel) {
      setIsLoading(false);
      return alert(
        'Vui lòng nhập đầy đủ tên và số điện thoại liên hệ của bạn!'
      );
    }

    busApi
      .createBusUser({
        name: formName,
        tel: formTel,
        zalo: formZalo,
        note: formNote,
        address: formAddress,
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setIsLoading(false);
          return alert(
            'Đăng ký thành công! Chúng mình sẽ liên hệ với bạn trong thời gian sớm nhất. Mọi thắc mắc liên hệ 0877.876.877 để được giải đáp. Xin cảm ơn!'
          );
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <TitleBar title='Đặt xe đưa rước' navigation='/uniforms' />

      <form className={styles.formContainer}>
        <div className={styles.infoContainer}>
          <p style={{ margin: 0, color: ' #ff0000 ' }}>* bắt buộc</p>
          <div className={styles.formGroup}>
            <label for='formName' className={styles.formLabel}>
              Tên của bạn*
            </label>
            <input
              className={styles.formInput}
              id='formName'
              type='text'
              placeholder='Nhập đầy đủ họ tên, có dấu'
            />
          </div>

          <div className={styles.formGroup}>
            <label for='formTel' className={styles.formLabel}>
              Điện thoại liên hệ*
            </label>
            <input
              className={styles.formInput}
              id='formTel'
              type='text'
              placeholder='Nhập số điện thoại liên hệ của bạn'
            />
          </div>
          <div className={styles.formGroup}>
            <label for='formZalo' className={styles.formLabel}>
              Số điện thoại Zalo (Không bắt buộc)
            </label>
            <input
              className={styles.formInput}
              id='formZalo'
              type='text'
              placeholder='Nhập số điện thoại zalo của bạn'
            />
          </div>
          <div className={styles.formGroup}>
            <label for='formAddress' className={styles.formLabel}>
              Địa chỉ đón bạn (Không bắt buộc)
            </label>
            <input
              className={styles.formInput}
              id='formAddress'
              type='text'
              placeholder='Bỏ trống nếu cần xác nhận lại sau'
            />
          </div>
          <div className={styles.formGroup}>
            <label for='formNote' className={styles.formLabel}>
              Yêu cầu khác/Ghi chú (nếu có)
            </label>
            <textarea
              className={styles.formInput}
              id='formNote'
              rows='5'
              placeholder='Nhập yêu cầu của bạn...'
            />
          </div>

          {isLoading ? (
            <>
              <p>
                Hệ thống đang xử lý, vui lòng chờ trong ít nhất 15 giây {'<3'}
              </p>
              <p className={styles.formSubmitButton}>Đang đăng ký...</p>
            </>
          ) : (
            <button
              type='button'
              onClick={handleSubmitButton}
              className={styles.formSubmitButton}
            >
              Đăng ký ngay
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Container;
