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
          return alert('???? c???p nh???t th??ng tin th??nh c??ng!');
        }
      })
      .catch((err) => alert(err.toString()));
  };

  const handleAddRoomButton = (id, roomId) => {
    const confirmed = window.confirm(
      'B???n c?? ch???c ch???n nh???p ph??ng kh??ng? D??? li???u ng?????i d??ng c?? s??? b??? x??a kh???i ph??ng n??y!'
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
                    alert('???? nh???n ph??ng th??nh c??ng!');
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
        <button onClick={() => getPrevRoom()}>Tr?????c ????</button>
        <span>{page + 1}</span>
        <button onClick={() => getNextRoom()}>K??? ti???p</button>
      </div>
      {data.length === 0 ? (
        <p style={{ textAlign: 'center', margin: '5rem' }}>Kh??ng c?? d??? li???u</p>
      ) : null}
      <div className={styles.roomsContainer}>
        {data.map((child) => {
          return (
            <div className={styles.roomContainer} key={child._id}>
              <div className={styles.userInfoContainer}>
                <div>
                  <p>T??n:</p>
                  <textarea
                    defaultValue={child?.name}
                    rows={1}
                    id={`formName_${child._id}`}
                  />
                </div>
                <div>
                  <p>S??? ??i???n tho???i:</p>
                  <textarea
                    defaultValue={child?.tel}
                    rows={1}
                    id={`formTel_${child._id}`}
                  />
                </div>
                <div>
                  <p>Ng??y v??o:</p>
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
                  <p>Ghi ch??/G??p ??:</p>
                  <textarea
                    defaultValue={child.feedback ? child.feedback : 'Kh??ng c??'}
                    rows={1}
                    id={`formFeedback_${child._id}`}
                  />
                </div>
                <div>
                  <p>Ph??ng:</p>

                  <select
                    value={child.guestHouse._id}
                    onChange={(e) =>
                      handleRoomChange(child._id, e.target.value)
                    }
                  >
                    {rooms.map((child) => {
                      return (
                        <option value={child._id}>Ph??ng {child.number}</option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <p>Gi?? ng??y: {child.guestHouse?.dailyPrice}</p>
                </div>
                <div>
                  <p>Gi?? th??ng: {child.guestHouse?.monthlyPrice}</p>
                </div>
                <div>
                  <p style={{ margin: '1rem 0' }}>
                    <span>T??nh tr???ng: </span>
                    {child.guestHouse?.isAvailable
                      ? 'C??n ph??ng'
                      : 'Kh??ng c?? s???n'}
                  </p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={() => updateInfo(child._id)}>C???p nh???t</button>
                <button
                  onClick={() => updateState(child._id, 0)}
                  style={
                    child.state === 0
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                >
                  ???? t???o
                </button>
                <button
                  onClick={() => updateState(child._id, 1)}
                  style={
                    child.state === 1
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                >
                  Ch??? thanh to??n
                </button>
                <button
                  onClick={() => updateState(child._id, 2)}
                  style={
                    child.state === 2
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                >
                  ???? ho??n t???t
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
                  ???? nh???n ph??ng
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
                  ???? h???y
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
