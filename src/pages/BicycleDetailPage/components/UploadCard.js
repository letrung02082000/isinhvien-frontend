import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import authHeader from '../../../utils/authHeader';
import styles from './uploadCard.module.css';
import Compressor from 'compressorjs';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateCard } from '../../../store/userSlice';
import { Loading } from '../../_commons';

function UploadCard() {
  const dispatch = useDispatch();
  const history = useHistory();

  const imageExtensions = ['image/jpeg', 'image/png'];
  const [frontsideName, setFrontsideName] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  const uploadFrontside = async (e) => {
    setUploading(true);

    if (imageExtensions.includes(e.target.files[0].type)) {
      new Compressor(e.target.files[0], {
        quality: 0.6,
        convertSize: 1000000,
        success(result) {
          const formData = new FormData();
          formData.append('card', result, result.name);

          axios
            .post('/api/user/card', formData, authHeader())
            .then((res) => {
              if (res.status === 200) {
                setUploading(false);
                dispatch(updateCard(res.data.data.card));
                alert('Cập nhật thông tin thành công!');
                history.go(0);
              }
            })
            .catch((err) => {
              setUploading(false);

              alert(
                'Không thể tải lên giấy tờ tùy thân. Vui lòng liên hệ zalo: 0797324886 để được hỗ trợ nhanh nhất! ' +
                  err.toString()
              );
            });
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      setFrontsideName('Lỗi: Chỉ tải lên tệp hình ảnh JPG và PNG');
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Mặt trước giấy tờ tùy thân</label>
        {uploading ? (
          <Loading message='Đang cập nhật thông tin...' />
        ) : (
          <label className={styles.formUploadButton}>
            <input
              className={styles.formInput}
              type='file'
              accept='image/*'
              id='frontside'
              name='frontside'
              onChange={uploadFrontside}
              required
            />
            Cập nhật
          </label>
        )}
        {frontsideName ? (
          <p className={styles.formFilename}>{frontsideName}</p>
        ) : null}
      </div>
    </div>
  );
}

export default UploadCard;
