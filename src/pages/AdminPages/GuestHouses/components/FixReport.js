import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './fixReport.module.css';

function FixReport() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    axios
      .get('/api/guest-house/report', {
        params: {
          limit,
          page,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        return alert(err.toString());
      });
  }, [page]);

  const updateState = (id, state) => {
    axios
      .patch(`/api/guest-house/report/${id}`, {
        state,
      })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get('/api/guest-house/report', {
              params: {
                limit,
                page,
              },
            })
            .then((res) => {
              setData(res.data.data);
            })
            .catch((err) => {
              return alert(err.toString());
            });
        }
      })
      .catch((err) => {
        return alert(err.toString());
      });
  };

  const getPrevPage = () => {
    if (page === 0) {
      return;
    }

    setPage(page - 1);
  };

  const getNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <div className={styles.pagingContainer}>
        <button onClick={() => getPrevPage()}>Trang trước</button>
        <span>{page + 1}</span>
        <button onClick={() => getNextPage()}>Trang kế tiếp</button>
      </div>
      <div className={styles.container}>
        {data.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Không có dữ liệu</p>
        ) : null}
        {data.map((child) => {
          const date = new Date(child.createdAt);
          return (
            <div key={child._id} className={styles.reportContainer}>
              <div className={styles.body}>
                <p>
                  Ngày tạo: {date.toLocaleDateString('en-GB')} lúc{' '}
                  {date.toLocaleTimeString('en-GB')}
                </p>
                <p>Phòng: {child.guestHouse.number}</p>
                <p>Họ tên: {child.guestHouse.name}</p>
                <p>Số điện thoại: {child.guestHouse.tel}</p>
                <p>Yêu cầu: {child.note}</p>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  style={
                    child.state === 0
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                  onClick={() => updateState(child._id, 0)}
                >
                  Đã tạo
                </button>
                <button
                  style={
                    child.state === 1
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                  onClick={() => updateState(child._id, 1)}
                >
                  Đang xử lý
                </button>
                <button
                  style={
                    child.state === 2
                      ? { backgroundColor: 'var(--primary)', color: 'white' }
                      : null
                  }
                  onClick={() => updateState(child._id, 2)}
                >
                  Đã hoàn tất
                </button>
                <button
                  style={
                    child.state === 3
                      ? {
                          backgroundColor: 'red',
                          color: 'white',
                          border: '1px solid red',
                        }
                      : null
                  }
                  onClick={() => updateState(child._id, 3)}
                >
                  Đã hủy
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FixReport;
