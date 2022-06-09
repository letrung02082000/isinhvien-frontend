import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { authHeader } from '../../utils';
import Driving from './Driving';

function A2Driving() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/api/driving/type?type=1', authHeader())
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }

        setLoading(false);
      })
      .catch((err) => {
        alert(err.toString());
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? <p>Đang tải dữ liệu...</p> : null}
      {data.length <= 0 ? <p>Không có dữ liệu</p> : null}
      <div>
        {data.map((child) => {
          return <Driving info={child} key={child._id} id={child._id} />;
        })}
      </div>
    </>
  );
}

export default A2Driving;
