import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './container.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBusSurvey,
  updateIntime,
  updateOuttime,
  updateReason,
  updateAddress,
  updateSchool,
  updateIsUsed,
  updateDistrict,
  updateTown,
  updateProvince,
} from '../../store/busSurveySlice';
import {
  updateName,
  updateTel,
  updateEmail,
  selectUser,
} from '../../store/userSlice';
import { TitleBar } from '../_commons';
import Autosuggest from 'react-autosuggest';

function BusSurveyPage() {
  const schoolList = [
    'Trường Đại học Bách Khoa (cơ sở 2)',
    'Trường Đại học Bách Khoa (cơ sở 1)',
    'Trường Đại học Khoa học Tự nhiên (cơ sở 2)',
    'Trường Đại học Khoa học Tự nhiên (cơ sở 1)',
    'Trường Đại học Khoa học Xã hội và Nhân văn (cơ sở 2)',
    'Trường Đại học Khoa học Xã hội và Nhân văn (cơ sở 1)',
    'Trường Đại học Quốc tế',
    'Trường Đại học Công nghệ Thông tin',
    'Trường Đại học Kinh tế - Luật ',
    'Viện Môi trường - Tài nguyên',
  ];

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const busSurvey = useSelector(selectBusSurvey);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  let currentDayText = '';

  switch (currentDay) {
    case 0:
      currentDayText = 'Thứ 2';
      break;
    case 1:
      currentDayText = 'Thứ 3';
      break;
    case 2:
      currentDayText = 'Thứ 4';
      break;
    case 3:
      currentDayText = 'Thứ 5';
      break;
    case 4:
      currentDayText = 'Thứ 6';
      break;
    case 5:
      currentDayText = 'Thứ 7';
      break;
    case 6:
      currentDayText = 'Chủ nhật';
      break;
  }

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
    const address = document.getElementById('formAddress').value;
    const town = document.getElementById('formTown').value;
    const district = document.getElementById('formDistrict').value;
    const province = document.getElementById('formProvince').value;
    const feedback = document.getElementById('formFeedback').value;

    if (!fullname || !tel) {
      return alert('Vui lòng nhập đầy đủ: họ tên và số điện thoại');
    }

    if (!address || !town || !district || !province) {
      return alert('Vui lòng nhập đầy đủ: địa chỉ đón bạn');
    }

    if (!busSurvey.school) {
      return alert('Vui lòng nhập đầy đủ: tên trường của bạn');
    }

    if (!busSurvey.datetime) {
      return alert('Vui lòng chọn giờ đi và giờ về cho các ngày trong tuần');
    }

    const formData = new FormData();

    for (let child of busSurvey.datetime) {
      formData.append('datetime', JSON.stringify(child));
    }

    formData.append('name', fullname);
    formData.append('tel', tel);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('town', busSurvey.town);
    formData.append('district', busSurvey.district);
    formData.append('province', busSurvey.province);
    formData.append('feedback', feedback);
    formData.append('school', busSurvey.school);
    formData.append('reason', busSurvey.reason);
    formData.append('isUsed', busSurvey.isUsed);

    axios({
      method: 'post',
      url: '/api/bus-survey',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.status === 200) {
          alert(
            'Cảm ơn bạn đã hoàn thành khảo sát. Chúng tôi sẽ gửi thông báo quà tặng đến địa chỉ email bạn đăng ký sau khi kết thúc đợt khảo sát này (dự kiến: 30/5/2022)'
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
    dispatch(updateIsUsed(value));
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
    let time = [...busSurvey.datetime[currentDay].outTime];

    if (e.target.checked) {
      if (time.includes(value)) {
        return;
      }

      time.push(value);
      time.sort((a, b) => a - b);
      dispatch(updateOuttime({ day: currentDay, time }));
    } else {
      if (time.includes(value)) {
        const index = time.indexOf(value);
        time.splice(index, 1);
        dispatch(updateOuttime({ day: currentDay, time }));
      }
    }
  };

  const handleNameChange = (e) => {
    dispatch(updateName(e.target.value));
  };

  const handleEmailChange = (e) => {
    dispatch(updateEmail(e.target.value));
  };

  const handleTelChange = (e) => {
    dispatch(updateTel(e.target.value));
  };

  const handleAddressChange = (e) => {
    dispatch(updateAddress(e.target.value));
  };

  const handleTownChange = (e) => {
    dispatch(updateTown(e.target.value));
  };

  const handleDistrictChange = (e) => {
    dispatch(updateDistrict(e.target.value));
  };

  const handleProvinceChange = (e) => {
    dispatch(updateProvince(e.target.value));
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) return [];

    let filterList = schoolList.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

    if (!filterList || filterList.length < 1) {
      return ['Trường khác'];
    }

    return filterList;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    dispatch(updateSchool(newValue));
  };

  const inputProps = {
    placeholder: 'Chọn trường từ gợi ý hoặc nhập tên trường',
    value: busSurvey.school,
    onChange: onChange,
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

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
            value={user.data.name}
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
            onChange={handleTelChange}
            value={user.data.tel}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Địa chỉ email (không bắt buộc)
          </label>
          <input
            className={styles.formInput}
            id='formEmail'
            type='text'
            placeholder='Nhập địa chỉ email để nhận voucher'
            onChange={handleEmailChange}
            value={user.data.email}
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
              checked={busSurvey?.isUsed === true}
            />
            <p onClick={() => handleIsUsedChange(true)}>Có</p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleIsUsedChange(false)}
              checked={busSurvey?.isUsed === false}
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
              checked={busSurvey?.reason === 0}
            />
            <p onClick={() => handleReasonChange(0)}>Không có xe cá nhân</p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleReasonChange(1)}
              checked={busSurvey?.reason === 1}
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
              checked={busSurvey?.reason === 2}
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
              checked={busSurvey?.reason === 3}
            />
            <p onClick={() => handleReasonChange(3)}>Bảo vệ môi trường</p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type='radio'
              onChange={() => handleReasonChange(4)}
              checked={busSurvey?.reason === 4}
            />
            <p onClick={() => handleReasonChange(4)}>Lý do khác</p>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} style={{ color: 'red' }}>
            Chọn lần lượt{' '}
            <strong>giờ đến trường (giờ có mặt tại trường dự kiến)</strong> và{' '}
            <strong>giờ về</strong> cho các ngày từ Thứ Hai đến Chủ Nhật (có thể
            bỏ trống các ngày không có nhu cầu)
          </label>
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
          <label className={styles.formLabel}>
            Giờ đến trường (giờ có mặt tại trường dự kiến) ({currentDayText}) *
          </label>
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
          <label className={styles.formLabel}>
            Giờ về ({currentDayText}) *
          </label>
          <div className={styles.inTimeContainer}>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='outTime'
                checked={busSurvey.datetime[currentDay].outTime.includes(9)}
                onChange={(e) => handleOutTimeChange(e, 9)}
              />
              <label for='outTime'>9:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='outTime'
                checked={busSurvey.datetime[currentDay].outTime.includes(10)}
                onChange={(e) => handleOutTimeChange(e, 10)}
              />
              <label for='outTime'>10:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='outTime'
                checked={busSurvey.datetime[currentDay].outTime.includes(11)}
                onChange={(e) => handleOutTimeChange(e, 11)}
              />
              <label for='outTime'>11:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='outTime'
                checked={busSurvey.datetime[currentDay].outTime.includes(15)}
                onChange={(e) => handleOutTimeChange(e, 15)}
              />
              <label for='outTime'>15:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='outTime'
                checked={busSurvey.datetime[currentDay].outTime.includes(16)}
                onChange={(e) => handleOutTimeChange(e, 16)}
              />
              <label for='outTime'>16:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='outTime'
                checked={busSurvey.datetime[currentDay].outTime.includes(17)}
                onChange={(e) => handleOutTimeChange(e, 17)}
              />
              <label for='outTime'>17:00</label>
            </div>
            <div className={styles.boxGroup}>
              <input
                type='checkbox'
                name='outTime'
                checked={busSurvey.datetime[currentDay].outTime.includes(-1)}
                onChange={(e) => handleOutTimeChange(e, -1)}
              />
              <label for='outTime'>Giờ khác</label>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Địa chỉ đón bạn (chỉ nhập số nhà và đường hoặc KTX đang ở)*
          </label>
          <input
            className={styles.formInput}
            id='formAddress'
            type='text'
            placeholder='VD: 01 Nguyễn Tất Thành'
            value={busSurvey?.address}
            onChange={handleAddressChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Phường/Xã*</label>
          <input
            className={styles.formInput}
            id='formTown'
            type='text'
            placeholder='VD: Phường 12'
            value={busSurvey?.town}
            onChange={handleTownChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Quận/Huyện*</label>
          <input
            className={styles.formInput}
            id='formDistrict'
            type='text'
            placeholder='VD: Quận 4'
            value={busSurvey?.district}
            onChange={handleDistrictChange}
          />
          {/* <select
            defaultValue={busSurvey.district}
            onChange={handleDistrictChange}
          >
            <option value={0}>Thành phố Thủ Đức</option>
            <option value={1}>Quận 1</option>
            <option value={3}>Quận 3</option>
            <option value={4}>Quận 4</option>
            <option value={5}>Quận 5</option>
            <option value={6}>Quận 6</option>
            <option value={7}>Quận 7</option>
            <option value={8}>Quận 8</option>
            <option value={10}>Quận 10</option>
            <option value={11}>Quận 11</option>
            <option value={12}>Quận 12</option>
            <option value={13}>Quận Bình Thạnh</option>
            <option value={14}>Quận Bình Tân</option>
            <option value={15}>Quận Gò Vấp</option>
            <option value={16}>Quận Phú Nhuận</option>
            <option value={17}>Quận Tân Bình</option>
            <option value={18}>Quận Tân Phú</option>
            <option value={19}>Khu vực khác</option>
          </select> */}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tỉnh/Thành phố*</label>
          <input
            className={styles.formInput}
            id='formProvince'
            type='text'
            placeholder='VD: Hồ Chí Minh'
            value={busSurvey?.province}
            onChange={handleProvinceChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Vui lòng chọn trường bạn muốn đến*
          </label>
          {/* <input
            className={styles.formInput}
            id='formSchool'
            type='text'
            placeholder='Nhập tên trường và cơ sở'
            value={busSurvey?.school}
            onChange={handleSchoolChange}
          /> */}
          <Autosuggest
            theme={{
              container: styles.formSchool__container,
              input: styles.formSchool__input,
              suggestionHighlighted: styles.formSchool__highlight,
              suggestionsList: styles.formSchool__suggestionList,
              suggestion: styles.formSchool__suggestion,
            }}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion={true}
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
