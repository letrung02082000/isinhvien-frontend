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
      return alert('Vui l??ng nh???p t??n c???a b???n!');
    }

    if (!roomSelected) {
      return alert('Vui l??ng ch???n ph??ng b???n mu???n thu??!');
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
          'Th??ng tin ????ng k?? c???a b???n ???? ???????c ghi nh???n, nh??n vi??n nh?? kh??ch ??HQG s??? li??n h??? v???i b???n ????? ho??n t???t th??? t???c ????ng k??. M???i th???c m???c, vui l??ng li??n h??? 0877.876.877 (Mr. Hu??n) ????? ???????c h??? tr???. Xin c???m ??n!'
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
      <TitleBar title='?????t ph??ng nh?? kh??ch' />
      <div className={styles.container}>
        <p className={styles.title}>Ch???n lo???i ph??ng</p>
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
          Th??ng tin lo???i ph??ng:
          <br />
          {currentCategory?.description}
        </p>
        <p className={styles.title}>Ch???n ph??ng</p>

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
                <span>Ph??ng {child.number}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.formInfo}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>T??n c???a b???n*</label>
            <input
              className={styles.formInput}
              id='formName'
              type='text'
              placeholder='Nh???p h??? t??n ?????y ?????, c?? d???u'
              defaultValue={user?.data.name}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>S??? ??i???n tho???i li??n h???*</label>
            <input
              className={styles.formInput}
              id='formTel'
              type='text'
              placeholder='Nh???p s??? ??i???n tho???i c???a b???n'
              defaultValue={user?.data.tel}
            />
          </div>
          {/* <div className={styles.formGroup}>
            <label className={styles.formLabel}>Ng??y v??o ??? d??? ki???n*</label>
            <DatePicker
              style={{ width: '100%' }}
              locale='vi'
              selected={inDate}
              onChange={handleDateChange}
            />
          </div> */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Th???i gian nh???n ph??ng (d??? ki???n):
            </label>
            <Datetime
              initialValue={inDate}
              locale='vi'
              onChange={handleDateChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Ghi ch??/G??p ??</label>
            <textarea className={styles.formInput} id='formFeedback' />
          </div>
          <div className={styles.formGroup}>
            {loading ? (
              <p className={styles.formSubmitButton}>??ang ????ng k??...</p>
            ) : (
              <button
                onClick={handleSubmitButton}
                className={styles.formSubmitButton}
              >
                ????ng k?? ngay
              </button>
            )}
          </div>
          <p style={{ margin: '1rem 0' }}>
            Trong qu?? tr??nh ????ng k??, n???u x???y ra l???i h??? th???ng, vui l??ng ch???p m??n
            h??nh l???i g???i v??? Zalo:{' '}
            <a
              href="href='https://zalo.me/0797324886"
              target='_blank'
              rel='noopener noreferrer'
            >
              0797324886
            </a>{' '}
            ????? ???????c h??? tr??? nhanh nh???t. Xin c???m ??n.
          </p>
        </div>
      </div>
    </>
  );
}

export default Container;
