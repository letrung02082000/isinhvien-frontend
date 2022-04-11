import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './container.module.css';
import { TitleBar, SearchBar } from '../_commons';

function Container() {
  const history = useHistory();
  const [uniformList, setUniformList] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/uniform', { params: { limit, page } })
      .then((res) => {
        if (res.data) {
          setUniformList(res.data.data);
        }
      })
      .catch((err) => {
        alert(err.toString());
      });
  }, [page, limit]);

  const navigateTo = (url, data) => {
    history.push(url, data);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      axios
        .get('/api/photocopy-user/query', { params: { tel: searchValue } })
        .then((res) => {
          const data = res.data.data;

          if (data.length === 0) {
            alert(
              'Không tìm thấy đơn hàng khớp với số điện thoại ' + searchValue
            );
          } else {
            console.log(data);
            setSearchData(data);
          }
        })
        .catch((e) => {
          console.log(e);
          alert(
            'Không tìm thấy đơn hàng khớp với số điện thoại ' + searchValue
          );
        });
    }
  };

  return (
    <div className={styles.container}>
      <TitleBar title='Đặt đồng phục' />
      {/* <div className={styles.imgContainer}>
        <img src='https://i.imgur.com/Wkn6m6d.png' alt='photocopy banner' />
      </div> */}
      <SearchBar
        placeholder='Tra cứu đơn hàng của bạn'
        focusText='Nhập số điện thoại của bạn và nhấn Enter'
        value={searchValue}
        onChange={handleSearchChange}
        onKeyPress={handleSearchPress}
      />
      {searchData &&
        searchData.map((child) => {
          const date = new Date(child.createdAt);
          let state = '';

          if (child.state == 0) {
            state = 'Đang chờ xử lý';
          }

          return (
            <div className={styles.orderContainer} key={child._id}>
              <p>Mã đơn hàng: {child.orderCode || ''}</p>
              <p>Họ tên: {child.name}</p>
              <p>Ngày tạo: {date.toLocaleDateString('en-GB')}</p>
              <p>Trạng thái: {state}</p>
              <a
                href={child.documentLink}
                alt='document link'
                target='_blank'
                rel='noreferer noopener'
              >
                Link tài liệu (admin)
                <br />
              </a>
              <a
                href={`https://drive.google.com/file/d/${child.receiptId}`}
                alt='receipt link'
                target='_blank'
                rel='noreferer noopener'
              >
                Link hóa đơn (admin)
              </a>
              <p>Hướng dẫn in: {child.note}</p>
              <p>Địa chỉ giao hàng: {child.address}</p>
            </div>
          );
        })}
      <div className={styles.listContainer}>
        {uniformList.map((child, idx, arr) => {
          return (
            <div key={child._id} className={styles.photocopyItemContainer}>
              <img src={child.images[0]} alt='logo' />
              <div className={styles.bodyContainer}>
                <p className={styles.photocopyName}>{child.name}</p>
                <p>{child.address}</p>
                <p>Di động: {child.tel}</p>
                <div className={styles.btnContainer}>
                  <button
                    onClick={() => navigateTo(`/uniform?id=${child._id}`)}
                  >
                    Đặt hàng ngay
                  </button>
                  {/* <button onClick={handleContactButton}>Liên hệ</button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Container;
