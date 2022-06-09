import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { authHeader } from '../../../utils';
import { Loading } from '../../_commons';
import './bikeUserInfo.css';

function BikeUserInfo() {
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    axios
      .get('/api/user/card', authHeader())
      .then((res) => {
        if (res.status === 200) {
          var image = new Image();
          image.src = `data:image/png;base64,${res.data.data}`;
          document
            .getElementsByClassName('id-card-container')[0]
            .appendChild(image);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(
          'Vui lòng cập nhật giấy tờ tùy thân để sử dụng tính năng này'
        );
        setLoading(false);
      });
  }, []);

  return (
    <div className='id-card-container'>
      {loading ? <Loading /> : null}
      <p style={{ textAlign: 'center' }}>{errMsg}</p>
    </div>
  );
}

export default BikeUserInfo;
