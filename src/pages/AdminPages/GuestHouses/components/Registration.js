import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './registration.module.css';
import Datetime from 'react-datetime';
import 'moment/locale/vi';

function Registration() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get('/api/guest-house/user', {
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
          limit: 10,
        },
      })
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => alert(err.toString()));

    axios
      .get('/api/guest-house/room', {
        params: {
          page: 0,
          limit: 100,
        },
      })
      .then((res) => {
        setRooms(res.data.data);
      })
      .catch((err) => alert(err.toString()));
  }, []);

  const updateState = (id, state) => {
    axios
      .patch(`/api/guest-house/user/${id}`, { state })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get('/api/guest-house/user', {
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

  const updateInfo = (id) => {
    const name = document.getElementById(`formName_${id}`).value;
    const tel = document.getElementById(`formTel_${id}`).value;
    const feedback = document.getElementById(`formFeedback_${id}`).value;

    axios
      .patch(`/api/guest-house/user/${id}`, { name, tel, feedback })
      .then((res) => {
        if (res.status === 200) {
          return alert('Đã cập nhật thông tin thành công!');
        }
      })
      .catch((err) => alert(err.toString()));
  };

  const handleAddRoomButton = (id, roomId) => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn nhập phòng không? Dữ liệu người dùng cũ sẽ bị xóa khỏi phòng này!'
    );

    if (confirmed) {
      const name = document.getElementById(`formName_${id}`).value;
      const tel = document.getElementById(`formTel_${id}`).value;

      axios
        .patch(`/api/guest-house/room/${roomId}`, { name, tel })
        .then((res) => {
          axios
            .patch(`/api/guest-house/user/${id}`, { state: 3 })
            .then((res) => {
              if (res.status === 200) {
                axios
                  .get('/api/guest-house/user', {
                    params: {
                      page,
                      limit,
                    },
                  })
                  .then((res) => {
                    setData(res.data.data);
                    alert('Đã nhận phòng thành công!');
                  })
                  .catch((err) => alert(err.toString()));
              }
            })
            .catch((err) => alert(err.toString()));
        })
        .catch((err) => alert(err.toString()));
    }
  };

  const getPrevRoom = () => {
    if (page <= 0) {
      return;
    } else {
      axios
        .get('/api/guest-house/user', {
          params: {
            page: page - 1,
            limit,
          },
        })
        .then((res) => {
          setPage(page - 1);
          setData(res.data.data);
        })
        .catch((err) => alert(err.toString()));
    }
  };

  const getNextRoom = () => {
    axios
      .get('/api/guest-house/user', {
        params: {
          page: page + 1,
          limit,
        },
      })
      .then((res) => {
        setPage(page + 1);
        setData(res.data.data);
      })
      .catch((err) => alert(err.toString()));
  };

  const handleRoomChange = (id, roomId) => {
    axios
      .patch(`/api/guest-house/user/${id}`, { guestHouse: roomId })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get('/api/guest-house/user', {
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
      <div className={styles.roomsContainer}>
        {data.map((child) => {
          return (
            <div className={styles.roomContainer} key={child._id}>
              <div className={styles.userInfoContainer}>
                <div>
                  <p>Tên:</p>
                  <textarea
                    defaultValue={child?.name}
                    rows={1}
                    id={`formName_${child._id}`}
                  />
                </div>
                <div>
                  <p>Số điện thoại:</p>
                  <textarea
                    defaultValue={child?.tel}
                    rows={1}
                    id={`formTel_${child._id}`}
                  />
                </div>
                <div>
                  <p>Ngày vào:</p>
                  {/* <Datetime
                    id={`formInDate_${child._id}`}
                    // initialValue={child.inDate || null}
                    locale='vi'
                    // onChange={handleDateChange}
                  /> */}
                  <p>
                    <span>{new Date(child?.inDate).toLocaleTimeString()}</span>{' '}
                    <span>{new Date(child?.inDate).toLocaleDateString()}</span>
                  </p>
                </div>

                <div>
                  <p>Ghi chú/Góp ý:</p>
                  <textarea
                    defaultValue={child.feedback ? child.feedback : 'Không có'}
                    rows={1}
                    id={`formFeedback_${child._id}`}
                  />
                </div>
                <div>
                  <p>Phòng:</p>

                  <select
                    value={child.guestHouse._id}
                    onChange={(e) =>
                      handleRoomChange(child._id, e.target.value)
                    }
                  >
                    {rooms.map((child) => {
                      return (
                        <option value={child._id}>Phòng {child.number}</option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <p>Giá ngày: {child.guestHouse?.dailyPrice}</p>
                </div>
                <div>
                  <p>Giá tháng: {child.guestHouse?.monthlyPrice}</p>
                </div>
                <div>
                  <p style={{ margin: '1rem 0' }}>
                    <span>Tình trạng: </span>
                    {child.guestHouse?.isAvailable
                      ? 'Còn phòng'
                      : 'Không có sẵn'}
                  </p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={() => updateInfo(child._id)}>Cập nhật</button>
                <button
                  onClick={() => updateState(child._id, 0)}
                  style={
                    child.state === 0
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                >
                  Đã tạo
                </button>
                <button
                  onClick={() => updateState(child._id, 1)}
                  style={
                    child.state === 1
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                >
                  Chờ thanh toán
                </button>
                <button
                  onClick={() => updateState(child._id, 2)}
                  style={
                    child.state === 2
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                >
                  Đã hoàn tất
                </button>
                <button
                  style={
                    child.state === 3
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                  onClick={() =>
                    handleAddRoomButton(child._id, child.guestHouse._id)
                  }
                >
                  Đã nhận phòng
                </button>
                <button
                  onClick={() => updateState(child._id, 4)}
                  style={
                    child.state === 4
                      ? {
                          backgroundColor: 'red',
                          color: 'white',
                          borderWidth: '0',
                        }
                      : null
                  }
                >
                  Đã hủy
                </button>

                <div></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Registration;
