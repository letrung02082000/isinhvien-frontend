import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './allRooms.module.css';

function AllRooms() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get('/api/guest-house/room', {
        params: {
          page,
          limit,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => alert(err.toString()));

    axios
      .get('/api/guest-house/category', {
        params: {
          page: 0,
          limit: 25,
        },
      })
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => alert(err.toString()));
  }, [page]);

  const toggleDetail = (id) => {
    if (document.getElementById(`detail_${id}`).style.display === 'none') {
      document.getElementById(`detail_${id}`).style.display = 'flex';
    } else {
      document.getElementById(`detail_${id}`).style.display = 'none';
    }
  };

  const handleUpdateButton = (id) => {
    const number = document.getElementById('formNumber_' + id).value;
    const description = document.getElementById('formDesc_' + id).value;
    const category = document.getElementById('formCategory_' + id).value;
    const dailyPrice = document.getElementById('formDailyPrice_' + id).value;
    const monthlyPrice = document.getElementById(
      'formMonthlyPrice_' + id
    ).value;
    const minQuantity = document.getElementById('formMinQuantity_' + id).value;
    const maxQuantity = document.getElementById('formMaxQuantity_' + id).value;
    const name = document.getElementById('formName_' + id).value;
    const tel = document.getElementById('formTel_' + id).value;
    const email = document.getElementById('formEmail_' + id).value;

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
      `Bạn có chắc chắn cập nhật phòng ${number} với các thông tin đã cung cấp không?`
    );

    if (confirmed) {
      axios
        .patch(`/api/guest-house/room/${id}`, {
          number,
          description,
          category,
          dailyPrice,
          monthlyPrice,
          minQuantity,
          maxQuantity,
          name,
          tel,
          email,
        })
        .then((res) => {
          return alert('Cập nhật thông tin thành công!');
        })
        .catch((err) => {
          console.log(err);
          return alert(err.toString());
        });
    }
  };

  const getPrevRoom = () => {
    if (page <= 0) {
      return;
    } else {
      setPage(page - 1);
    }
  };

  const getNextRoom = () => {
    setPage(page + 1);
  };

  const handleVisibleButton = (id, value) => {
    axios
      .patch(`/api/guest-house/room/${id}`, { isVisible: value })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get('/api/guest-house/room', {
              params: {
                page,
                limit,
              },
            })
            .then((res) => {
              setData(res.data.data);
            })
            .catch((err) => alert(err.toString()));
        }
      })
      .catch((err) => alert(err.toString()));
  };

  const handleAvailableButton = (id, value) => {
    axios
      .patch(`/api/guest-house/room/${id}`, { isAvailable: value })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get('/api/guest-house/room', {
              params: {
                page,
                limit,
              },
            })
            .then((res) => {
              setData(res.data.data);
            })
            .catch((err) => alert(err.toString()));
        }
      })
      .catch((err) => alert(err.toString()));
  };

  return (
    <>
      <div className={styles.pagingContainer}>
        <button onClick={() => getPrevRoom()}>Trước đó</button>
        <span>{page + 1}</span>
        <button onClick={() => getNextRoom()}>Kế tiếp</button>
      </div>
      {data.length === 0 ? (
        <p style={{ textAlign: 'center', margin: '5rem' }}>Không có dữ liệu</p>
      ) : null}
      <div className={styles.container}>
        {data.map((child) => {
          return (
            <div className={styles.roomContainer} key={child._id}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Số phòng</label>
                <textarea
                  className={styles.formInput}
                  type='text'
                  id={`formNumber_${child._id}`}
                  defaultValue={child.number}
                  rows={1}
                />
              </div>

              <div
                className={styles.detailInfo}
                style={{ display: 'none' }}
                id={`detail_${child._id}`}
              >
                <div className={styles.roomInfo}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Mô tả</label>
                    <textarea
                      className={styles.formInput}
                      id={`formDesc_${child._id}`}
                      defaultValue={child.description}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Loại phòng</label>
                    <select
                      id={`formCategory_${child._id}`}
                      defaultValue={child.category._id}
                      style={{ width: '100%' }}
                    >
                      {category.map((child) => {
                        return (
                          <option value={child._id} key={child._id}>
                            {child.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Giá ngày</label>
                    <textarea
                      className={styles.formInput}
                      type='text'
                      id={`formDailyPrice_${child._id}`}
                      rows={1}
                      defaultValue={child.dailyPrice}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Giá tháng</label>
                    <textarea
                      className={styles.formInput}
                      type='text'
                      id={`formMonthlyPrice_${child._id}`}
                      rows={1}
                      defaultValue={child.monthlyPrice}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Số lượng tối thiểu
                    </label>
                    <textarea
                      className={styles.formInput}
                      type='text'
                      id={`formMinQuantity_${child._id}`}
                      rows={1}
                      defaultValue={child.minQuantity}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Số lượng tối đa</label>
                    <textarea
                      className={styles.formInput}
                      type='text'
                      id={`formMaxQuantity_${child._id}`}
                      rows={1}
                      defaultValue={child.maxQuantity}
                    />
                  </div>
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Họ tên</label>
                    <textarea
                      className={styles.formInput}
                      id={`formName_${child._id}`}
                      defaultValue={child?.name}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Số điện thoại</label>
                    <textarea
                      className={styles.formInput}
                      id={`formTel_${child._id}`}
                      defaultValue={child?.tel}
                      rows={1}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email</label>
                    <textarea
                      className={styles.formInput}
                      id={`formEmail_${child._id}`}
                      defaultValue={child?.email}
                    />
                  </div>
                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() =>
                        handleVisibleButton(child._id, !child.isVisible)
                      }
                      style={
                        child.isVisible
                          ? null
                          : {
                              backgroundColor: 'white',
                              color: 'var(--primary)',
                            }
                      }
                    >
                      Hiện trên website
                    </button>
                    <button
                      onClick={() =>
                        handleAvailableButton(child._id, !child.isAvailable)
                      }
                      style={
                        child.isAvailable
                          ? null
                          : {
                              backgroundColor: 'white',
                              color: 'var(--primary)',
                            }
                      }
                    >
                      Còn phòng
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button
                  className={styles.formButton}
                  onClick={() => handleUpdateButton(child._id)}
                >
                  Cập nhật
                </button>
                <button
                  className={styles.formButton}
                  onClick={() => toggleDetail(child._id)}
                >
                  Chi tiết/Ẩn
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllRooms;
