import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  updateTel,
  updateZalo,
  updateName,
} from '../../store/userSlice';
import axios from 'axios';
import styles from '../../pages/swimmingPoolTicketPage.module.css';

export default function TutorForm(props) {
  const dispatch = useDispatch();
  let userInfo = useSelector(selectUser);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitButton = (e) => {
    setIsLoading(true);
    const name = document.getElementById('formName').value;
    const tel = document.getElementById('formTel').value;
    const zalo = document.getElementById('formZalo').value;
    const feedback = document.getElementById('formFeedback').value;

    if (!name || !tel || !zalo) {
      setIsLoading(false);
      return alert(
        'Vui lòng nhập đầy đủ các trường Họ tên, số điện thoại và zalo!'
      );
    }

    axios({
      method: 'post',
      url: '/api/pool/tutor-user',
      data: { name, tel, zalo, feedback },
    })
      .then((res) => {
        if (res.status === 200) {
          alert(
            'Đăng ký thành công. Trung tâm sẽ liên hệ với bạn trong thời gian sớm nhất. Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ zalo để được xử lý.'
          );
          setIsLoading(false);
        } else {
          alert('Lỗi: ' + res.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Lỗi: ' + error);
        setIsLoading(false);
      });
  };

  const handleNameChange = (e) => {
    dispatch(updateName(e.target.value));
  };

  const handleTelChange = (e) => {
    dispatch(updateTel(e.target.value));
  };

  const handleZaloChange = (e) => {
    dispatch(updateZalo(e.target.value));
  };

  return (
    <form style={props.display === false ? { display: 'none' } : null}>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        <li>
          <p>Học phí: 600.000 đồng/1 kỳ (6 buổi).</p>
          <p>
            Học phí toàn khóa: 1.200.000 đồng/2 kỳ (12 buổi) bao biết bơi, miễn
            phí vé vào hồ bơi.
          </p>
        </li>
        <li>
          <p>Giảm 10% khi đăng ký theo nhóm 5 người.</p>
        </li>
        <li>
          <p>Giảm 15% khi đăng ký theo nhóm 10 người.</p>
        </li>
        <li>
          <p>Có thể đóng học phí theo 1 kỳ hoặc toàn khóa.</p>
        </li>
        <li>
          Liên hệ tư vấn:{' '}
          <a
            href='https://zalo.me/0877876877'
            target='_blank'
            rel='noopener noreferrer'
          >
            0877.876.877
          </a>
        </li>
      </ul>
      <p style={{ margin: 0, color: ' #ff0000 ' }}>* bắt buộc</p>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Tên của bạn*</label>
        <input
          className={styles.formInput}
          id='formName'
          type='text'
          placeholder='Nhập họ tên đầy đủ, có dấu'
          required
          value={userInfo.data.name}
          onChange={handleNameChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Số điện thoại liên hệ*</label>
        <input
          className={styles.formInput}
          id='formTel'
          type='text'
          placeholder='Nhập số điện thoại của bạn'
          required
          value={userInfo.data.tel}
          onChange={handleTelChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Số điện thoại Zalo*</label>
        <input
          className={styles.formInput}
          id='formZalo'
          type='text'
          placeholder='Nhập số điện thoại Zalo của bạn'
          required
          value={userInfo.data.zalo}
          onChange={handleZaloChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Thắc mắc/Góp ý</label>
        <textarea className={styles.formFeedbackInput} id='formFeedback' />
      </div>

      {isLoading ? (
        <>
          <p>Hệ thống đang xử lý, vui lòng chờ trong ít nhất 15 giây {'<3'}</p>
          <p className={styles.formSubmitButton}>Đang đăng ký...</p>
        </>
      ) : (
        <button
          type='button'
          onClick={handleSubmitButton}
          className={styles.formSubmitButton}
        >
          Đăng ký
        </button>
      )}
      <p style={{ margin: '1rem 0' }}>
        Trong quá trình đăng ký, nếu xảy ra lỗi hệ thống, vui lòng chụp màn hình
        lỗi gửi về Zalo:{' '}
        <a
          href="href='https://zalo.me/0797324886"
          target='_blank'
          rel='noopener noreferrer'
        >
          0797324886
        </a>{' '}
        để được hỗ trợ nhanh nhất. Xin cảm ơn.
      </p>
    </form>
  );
}
