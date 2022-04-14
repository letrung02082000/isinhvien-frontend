import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './busSurveyPage.module.css';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';
import {
  selectBusSurvey,
  updateIntime,
  updateOuttime,
  updateReason,
} from '../store/busSurveySlice';
import TitleBar from '../components/TitleBar';

function BusSurveyPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const busSurvey = useSelector(selectBusSurvey);
  console.log(busSurvey);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [isUsed, setIsUsed] = useState(false);

  const imageExtensions = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
  ];

  const handleSubmitButton = (e) => {
    const fullname = document.getElementById('formName').value;
    const tel = document.getElementById('formTel').value;
    const email = document.getElementById('formEmail').value;
    const feedback = document.getElementById('formFeedback').value;

    if (!fullname || !tel) {
      return alert('Vui lòng nhập đầy đủ: họ tên và số điện thoại');
    }

    const formData = new FormData();

    formData.append('name', fullname);
    formData.append('tel', tel);
    formData.append('email', email);

    axios({
      method: 'post',
      url: '/api/driving/add',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
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

  const handleReasonChange = (index) => {
    dispatch(updateReason(index));
  };

  const handleIsUsedChange = (value) => {
    setIsUsed(value);
  };

  const handleDayChange = (e, value) => {
    e.preventDefault();
    setCurrentDay(value);
  };

  const handleInTimeChange = (e, value) => {
    let time = [...busSurvey.datetime[currentDay].inTime];

    if (e.target.checked) {
      if (time.includes(value)) {
        return;
      }

      time.push(value);
      time.sort((a, b) => a - b);
      dispatch(updateIntime({ day: currentDay, time }));
    } else {
      if (time.includes(value)) {
        const index = time.indexOf(value);
        time.splice(index, 1);
        dispatch(updateIntime({ day: currentDay, time }));
      }
    }
  };

  const handleOutTimeChange = (e, value) => {
    let time = [...busSurvey.datetime[currentDay].inTime];

    if (e.target.checked) {
      if (time.includes(value)) {
        return;
      }

      time.push(value);
      time.sort((a, b) => a - b);
      dispatch(updateIntime({ day: currentDay, time }));
    } else {
      if (time.includes(value)) {
        const index = time.indexOf(value);
        time.splice(index, 1);
        dispatch(updateIntime({ day: currentDay, time }));
      }
    }
  };

  return (
    <div className={styles.drivingRegisterContainer}>
      <TitleBar title='Khảo sát nhu cầu xe buýt' />
      <form className={styles.drivingFormContainer}>
        <p style={{ margin: 0, color: ' #ff0000 ' }}>* bắt buộc</p>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tên của bạn*</label>
          <input
            className={styles.formInput}
            id='formName'
            type='text'
            placeholder='Nhập họ tên đầy đủ, có dấu'
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Số điện thoại liên hệ*</label>
          <input
            className={styles.formInput}
            id='formTel'
            type='text'
            placeholder='Nhập số điện thoại của bạn'
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Địa chỉ email</label>
          <input
            className={styles.formInput}
            id='formEmail'
            type='text'
            placeholder='Nhập địa chỉ email để nhận voucher'
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Bạn có mong muốn được sử dụng dịch vụ xe đưa đón từ nhà đến trường
            và ngược lại không (dịch vụ Shuttle Bus: Chọn chỗ và thanh toán
            online; Biết vị trí xe bus; Không căng thẳng khi phải tự điều khiển
            xe; An toàn, bảo vệ môi trường...)?*
          </label>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleIsUsedChange(true)}
              checked={isUsed === true}
            />
            <p onClick={() => handleIsUsedChange(true)}>Có</p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleIsUsedChange(false)}
              checked={isUsed === false}
            />
            <p onClick={() => handleIsUsedChange(false)}>Không</p>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Đâu là lý do quan trọng nhất khi bạn chọn dịch vụ xe đưa đón này*
          </label>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleReasonChange(0)}
              checked={busSurvey && busSurvey.reason === 0}
            />
            <p onClick={() => handleReasonChange(0)}>Không có xe cá nhân</p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleReasonChange(1)}
              checked={busSurvey && busSurvey.reason === 1}
            />
            <p onClick={() => handleReasonChange(1)}>
              Không muốn tự điều khiển xe cá nhân
            </p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleReasonChange(2)}
              checked={busSurvey && busSurvey.reason === 2}
            />
            <p onClick={() => handleReasonChange(2)}>
              Khoảng cách từ nhà đến trường quá xa
            </p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleReasonChange(3)}
              checked={busSurvey && busSurvey.reason === 3}
            />
            <p onClick={() => handleReasonChange(3)}>Bảo vệ môi trường</p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleReasonChange(4)}
              checked={busSurvey && busSurvey.reason === 4}
            />
            <p onClick={() => handleReasonChange(4)}>Lý do khác</p>
          </div>
        </div>
        <div className={styles.formGroup}>
          <div>
            <button
              className={
                currentDay === 0 ? styles.selectedDay : styles.dayOfWeek
              }
              onClick={(e) => handleDayChange(e, 0)}
            >
              Thứ 2
            </button>
            <button
              className={
                currentDay === 1 ? styles.selectedDay : styles.dayOfWeek
              }
              onClick={(e) => handleDayChange(e, 1)}
            >
              Thứ 3
            </button>
            <button
              className={
                currentDay === 2 ? styles.selectedDay : styles.dayOfWeek
              }
              onClick={(e) => handleDayChange(e, 2)}
            >
              Thứ 4
            </button>
            <button
              className={
                currentDay === 3 ? styles.selectedDay : styles.dayOfWeek
              }
              onClick={(e) => handleDayChange(e, 3)}
            >
              Thứ 5
            </button>
            <button
              className={
                currentDay === 4 ? styles.selectedDay : styles.dayOfWeek
              }
              onClick={(e) => handleDayChange(e, 4)}
            >
              Thứ 6
            </button>
            <button
              className={
                currentDay === 5 ? styles.selectedDay : styles.dayOfWeek
              }
              onClick={(e) => handleDayChange(e, 5)}
            >
              Thứ 7
            </button>
            <button
              className={
                currentDay === 6 ? styles.selectedDay : styles.dayOfWeek
              }
              onClick={(e) => handleDayChange(e, 6)}
            >
              Chủ nhật
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Giờ đi*</label>
          <div className={styles.inTimeContainer}>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='inTime'
                checked={busSurvey.datetime[currentDay].inTime.includes(6)}
                onChange={(e) => handleInTimeChange(e, 6)}
              />
              <label for='inTime'>6:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='inTime'
                checked={busSurvey.datetime[currentDay].inTime.includes(7)}
                onChange={(e) => handleInTimeChange(e, 7)}
              />
              <label for='inTime'>7:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='inTime'
                checked={busSurvey.datetime[currentDay].inTime.includes(8)}
                onChange={(e) => handleInTimeChange(e, 8)}
              />
              <label for='inTime'>8:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='inTime'
                checked={busSurvey.datetime[currentDay].inTime.includes(9)}
                onChange={(e) => handleInTimeChange(e, 9)}
              />
              <label for='inTime'>9:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='inTime'
                checked={busSurvey.datetime[currentDay].inTime.includes(13)}
                onChange={(e) => handleInTimeChange(e, 13)}
              />
              <label for='inTime'>13:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='inTime'
                checked={busSurvey.datetime[currentDay].inTime.includes(14)}
                onChange={(e) => handleInTimeChange(e, 14)}
              />
              <label for='inTime'>14:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='inTime'
                checked={busSurvey.datetime[currentDay].inTime.includes(15)}
                onChange={(e) => handleInTimeChange(e, 15)}
              />
              <label for='inTime'>15:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='inTime'
                checked={busSurvey.datetime[currentDay].inTime.includes(16)}
                onChange={(e) => handleInTimeChange(e, 16)}
              />
              <label for='inTime'>16:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='inTime'
                checked={busSurvey.datetime[currentDay].inTime.includes(-1)}
                onChange={(e) => handleInTimeChange(e, -1)}
              />
              <label for='inTime'>Giờ khác</label>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Giờ về*</label>
          <div className={styles.inTimeContainer}>
            <div className={styles.boxGroup}>
              <input type='checkbox' name='outTime' />
              <label for='outTime'>9:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input type='checkbox' name='outTime' value='10' />
              <label for='outTime'>10:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input type='checkbox' name='outTime' value='11' />
              <label for='outTime'>11:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input type='checkbox' name='outTime' value='15' />
              <label for='outTime'>15:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input type='checkbox' name='outTime' value='16' />
              <label for='outTime'>16:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input type='checkbox' name='outTime' value='17' />
              <label for='outTime'>17:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input type='checkbox' name='outTime' value='-1' />
              <label for='outTime'>Giờ khác</label>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Địa chỉ đón bạn (chỉ nhập số nhà và đường hoặc KTX đang ở)
          </label>
          <input
            className={styles.formInput}
            id='fromAddress'
            type='text'
            placeholder='VD: F02 - KTX Khu B'
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Vui lòng nhập tên trường bạn muốn đến
          </label>
          <input
            className={styles.formInput}
            id='fromSchool'
            type='text'
            placeholder='VD: Nhập tên trường và cơ sở'
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Thắc mắc/Góp ý</label>
          <textarea className={styles.formFeedbackInput} id='formFeedback' />
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
            Hoàn thành khảo sát
          </button>
        )}
      </form>
    </div>
  );
}

export default BusSurveyPage;
