import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TitleBar } from '../_commons';
import styles from './container.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';
import Datetime from 'react-datetime';
import 'moment/locale/vi';

// import vi from 'date-fns/locale/vi';
// registerLocale('vi', vi);

function Container() {
  const [categoryList, setCategoryList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [roomSelected, setRoomSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inDate, setInDate] = useState(new Date());

  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get('/api/guest-house/category', {
        params: { search: { isVisible: true } },
      })
      .then((res) => {
        if (res.status === 200) {
          setCategoryList(res.data.data);
          setCurrentCategory(res.data.data[0]);
        }
      })
      .catch((err) => alert(err.toString()));

    axios
      .get('/api/guest-house/room', { params: { search: { isVisible: true } } })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => alert(err.toString()));
  }, []);

  useEffect(() => {
    const result = data?.filter((child) => {
      return child.category._id === currentCategory._id;
    });

    setCategoryData(result);
  }, [currentCategory, data]);

  const handleCategoryChange = (e) => {
    axios
      .get(`/api/guest-house/category/${e.target.value}`, {
        params: { search: { isVisible: true } },
      })
      .then((res) => {
        if (res.status === 200) {
          setRoomSelected(null);
          setCurrentCategory(res.data.data);
        }
      })
      .catch((err) => alert(err.toString()));
  };

  const handleRoomSelected = (id) => {
    setRoomSelected(id);
  };

  const handleSubmitButton = () => {
    const name = document.getElementById('formName').value;
    const tel = document.getElementById('formTel').value;
    const feedback = document.getElementById('formFeedback').value;

    if (!name || !tel) {
      return alert('Vui lòng nhập tên của bạn!');
    }

    if (!roomSelected) {
      return alert('Vui lòng chọn phòng bạn muốn thuê!');
    }

    setLoading(true);

    axios
      .post('/api/guest-house/user', {
        name,
        tel,
        guestHouse: roomSelected,
        feedback,
        inDate,
      })
      .then((res) => {
        setLoading(false);
        return alert(
          'Thông tin đăng ký của bạn đã được ghi nhận, nhân viên nhà khách ĐHQG sẽ liên hệ với bạn để hoàn tất thủ tục đăng ký. Mọi thắc mắc, vui lòng liên hệ 0877.876.877 (Mr. Huân) để được hỗ trợ. Xin cảm ơn!'
        );
      })
      .catch((err) => {
        setLoading(false);
        return alert(err.toString());
      });
  };

  const handleDateChange = (e) => {
    setInDate(e._d);
  };

  return (
    <>
      <TitleBar title='Đặt phòng nhà khách' />
      <div className={styles.container}>
        <p className={styles.title}>Chọn loại phòng</p>
        <select onChange={handleCategoryChange}>
          {categoryList.map((child) => {
            return (
              <option value={child._id} key={child._id}>
                {child.name}
              </option>
            );
          })}
        </select>
        <p className={styles.categoryDesc}>
          Thông tin loại phòng:
          <br />
          {currentCategory?.description}
        </p>
        <p className={styles.title}>Chọn phòng</p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {categoryData.map((child) => {
            return (
              <div
                key={child._id}
                className={styles.roomContainer}
                onClick={() => handleRoomSelected(child._id)}
                style={
                  roomSelected === child._id
                    ? { backgroundColor: 'var(--primary)', color: 'white' }
                    : null
                }
              >
                <span>Phòng {child.number}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.formInfo}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tên của bạn*</label>
            <input
              className={styles.formInput}
              id='formName'
              type='text'
              placeholder='Nhập họ tên đầy đủ, có dấu'
              defaultValue={user?.data.name}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Số điện thoại liên hệ*</label>
            <input
              className={styles.formInput}
              id='formTel'
              type='text'
              placeholder='Nhập số điện thoại của bạn'
              defaultValue={user?.data.tel}
            />
          </div>
          {/* <div className={styles.formGroup}>
            <label className={styles.formLabel}>Ngày vào ở dự kiến*</label>
            <DatePicker
              style={{ width: '100%' }}
              locale='vi'
              selected={inDate}
              onChange={handleDateChange}
            />
          </div> */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Thời gian nhận phòng (dự kiến):
            </label>
            <Datetime
              initialValue={inDate}
              locale='vi'
              onChange={handleDateChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Ghi chú/Góp ý</label>
            <textarea className={styles.formInput} id='formFeedback' />
          </div>
          <div className={styles.formGroup}>
            {loading ? (
              <p className={styles.formSubmitButton}>Đang đăng ký...</p>
            ) : (
              <button
                onClick={handleSubmitButton}
                className={styles.formSubmitButton}
              >
                Đăng ký ngay
              </button>
            )}
          </div>
          <p style={{ margin: '1rem 0' }}>
            Trong quá trình đăng ký, nếu xảy ra lỗi hệ thống, vui lòng chụp màn
            hình lỗi gửi về Zalo:{' '}
            <a
              href="href='https://zalo.me/0797324886"
              target='_blank'
              rel='noopener noreferrer'
            >
              0797324886
            </a>{' '}
            để được hỗ trợ nhanh nhất. Xin cảm ơn.
          </p>
        </div>
      </div>
    </>
  );
}

export default Container;
