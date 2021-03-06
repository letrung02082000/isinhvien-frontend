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
      return alert('Vui l??ng nh???p ?????y ????? c??c tr?????ng!');
    }

    if (isNaN(dailyPrice)) {
      return alert('Gi?? ng??y kh??ng h???p l???');
    }

    if (isNaN(monthlyPrice)) {
      return alert('Gi?? th??ng kh??ng h???p l???');
    }

    if (isNaN(minQuantity)) {
      return alert('S??? l?????ng t???i thi???u kh??ng h???p l???');
    }

    if (isNaN(maxQuantity)) {
      return alert('S??? l?????ng t???i ??a kh??ng h???p l???');
    }

    const confirmed = window.confirm(
      `B???n c?? ch???c ch???n c???p nh???t ph??ng ${number} v???i c??c th??ng tin ???? cung c???p kh??ng?`
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
          return alert('C???p nh???t th??ng tin th??nh c??ng!');
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
        <button onClick={() => getPrevRoom()}>Tr?????c ????</button>
        <span>{page + 1}</span>
        <button onClick={() => getNextRoom()}>K??? ti???p</button>
      </div>
      {data.length === 0 ? (
        <p style={{ textAlign: 'center', margin: '5rem' }}>Kh??ng c?? d??? li???u</p>
      ) : null}
      <div className={styles.container}>
        {data.map((child) => {
          return (
            <div className={styles.roomContainer} key={child._id}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>S??? ph??ng</label>
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
                    <label className={styles.formLabel}>M?? t???</label>
                    <textarea
                      className={styles.formInput}
                      id={`formDesc_${child._id}`}
                      defaultValue={child.description}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Lo???i ph??ng</label>
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
                    <label className={styles.formLabel}>Gi?? ng??y</label>
                    <textarea
                      className={styles.formInput}
                      type='text'
                      id={`formDailyPrice_${child._id}`}
                      rows={1}
                      defaultValue={child.dailyPrice}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Gi?? th??ng</label>
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
                      S??? l?????ng t???i thi???u
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
                    <label className={styles.formLabel}>S??? l?????ng t???i ??a</label>
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
                    <label className={styles.formLabel}>H??? t??n</label>
                    <textarea
                      className={styles.formInput}
                      id={`formName_${child._id}`}
                      defaultValue={child?.name}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>S??? ??i???n tho???i</label>
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
                      Hi???n tr??n website
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
                      C??n ph??ng
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button
                  className={styles.formButton}
                  onClick={() => handleUpdateButton(child._id)}
                >
                  C???p nh???t
                </button>
                <button
                  className={styles.formButton}
                  onClick={() => toggleDetail(child._id)}
                >
                  Chi ti???t/???n
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
