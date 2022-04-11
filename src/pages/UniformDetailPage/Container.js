import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TitleBar } from '../_commons';
import styles from './container.module.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  updateName,
  updateTel,
  updateZalo,
} from '../../store/userSlice';

function Container(props) {
  const query = new URLSearchParams(props.location.search);
  const id = query.get('id');
  const [data, setData] = useState(null);
  const [documentFile, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [documentSize, setDocumentSize] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptName, setReceiptName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get(`/api/uniform/${id}`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.data);
          setData(res.data.data);
        }
      })
      .catch((err) => alert(err.toString()));
  }, []);

  useEffect(() => {
    if (documentFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('drive', data.drive);
      formData.append('document', documentFile);

      axios
        .post('/api/uniform-user/upload', formData, {
          onUploadProgress: (progressEvent) => {
            const percent = parseInt(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadPercent(percent / 2);

            if (percent == 100) {
              setTimeout(() => {
                setUploadPercent(75);
              }, 1500);
            }
          },
        })
        .then((res) => {
          setDocumentId(res.data.data.documentId);
          setUploadPercent(100);
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
          alert(err.toString());
        });
    }
  }, [documentFile]);

  const uploadDocument = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 16e6) {
        return setDocumentName(
          'Không thể tải lên tệp có kích thước lớn hơn 15 MB. Vui lòng gửi tài liệu bằng Link hoặc gửi thành nhiều lần'
        );
      }

      setDocument(file);
      setDocumentName(file.name);
    }
  };

  const uploadReceipt = (e) => {
    const imageExtensions = [
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/webp',
    ];

    if (imageExtensions.includes(e.target.files[0].type)) {
      setReceiptFile(e.target.files[0]);
      setReceiptName(e.target.files[0].name);
    } else {
      setReceiptName('Lỗi: Tệp tải lên không phải là tệp hình ảnh');
    }
  };

  const handleNameChange = (e) => {
    dispatch(updateName(e.target.value));
  };

  const handleTelChange = (e) => {
    dispatch(updateTel(e.target.value));
  };

  const handleZaloChange = (e) => {
    dispatch(updateZalo(e.target.value));
  };

  const handleSubmitButton = () => {
    const formNote = document.getElementById('formNote').value;
    const formAddress = document.getElementById('formAddress').value;
    const formDocumentLink = document.getElementById('formDocumentLink').value;

    if (!user.data.name) {
      return alert('Vui lòng nhập tên của bạn');
    }

    if (!user.data.tel) {
      return alert('Vui lòng nhập số điện thoại liên hệ của bạn');
    }

    if (!formNote) {
      return alert('Vui lòng nhập hướng dẫn in cho nhân viên');
    }

    setIsLoading(true);
    let formData = new FormData();
    formData.append('name', user.data.name);
    formData.append('tel', user.data.tel);
    formData.append('zalo', user.data.zalo || '');
    formData.append('address', formAddress);
    formData.append('note', formNote);
    formData.append('uniform', id);
    formData.append('documentId', documentId);
    formData.append('receipt', receiptFile);
    formData.append('drive', data.drive);

    if (documentId) {
      const documentLink = `https://drive.google.com/file/d/${documentId}`;
      formData.append('documentLink', documentLink);
    } else {
      formData.append('documentLink', formDocumentLink);
    }

    axios
      .post('/api/uniform-user', formData)
      .then((res) => {
        setIsLoading(false);
        alert(
          'Bạn đã đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian 1 ngày'
        );
      })
      .catch((err) => {
        alert(
          'Lỗi: ' +
            err.toString() +
            '. Liên hệ admin tại zalo: 0797324886 để được hỗ trợ nhanh nhất. Xin cảm ơn!'
        );
        setIsLoading(false);
      });
  };

  return (
    <div>
      <TitleBar title='Đặt đồng phục' navigation='/uniforms' />

      <form className={styles.formContainer}>
        <div className={styles.uploadContainer}>
          <div className={styles.formGroup}>
            <label
              className={styles.formUploadButton}
              style={{ margin: '0 auto' }}
            >
              <input
                className={styles.formInput}
                type='file'
                id='document'
                name='document'
                onChange={uploadDocument}
              />
              <img src='/uploadicon.png' style={{ width: '3rem' }} />
              <span>Tải lên mẫu áo (nếu có)</span>
            </label>
            {uploading ? (
              <p style={{ textAlign: 'center' }}>
                Đang tải tệp lên... {uploadPercent}%
              </p>
            ) : null}
            {documentName ? (
              <>
                <p className={styles.formFilename}>{documentName}</p>
                <button
                  type='button'
                  className={styles.button}
                  onClick={() => {
                    setDocumentId(null);
                    setDocumentName(null);
                  }}
                >
                  Xóa tệp
                </button>
              </>
            ) : null}
          </div>

          <div
            className={styles.formGroup}
            style={{ alignItems: 'center', margin: '1rem 0', width: '100%' }}
          >
            <label for='formDocumentLink'>Hoặc</label>
            <input
              id='formDocumentLink'
              type='text'
              placeholder='Nhập đường dẫn liên kết mẫu áo (nếu có)'
              style={{
                width: '100%',
                textAlign: 'center',
                margin: '1rem 0',
                padding: '0.5rem',
              }}
            />
            <div>
              <button
                type='button'
                className={styles.button}
                onClick={() => {
                  document.getElementById('formDocumentLink').value = null;
                }}
              >
                Xóa liên kết
              </button>
            </div>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <p style={{ margin: 0, color: ' #ff0000 ' }}>* bắt buộc</p>
          <div className={styles.formGroup}>
            <label for='formName' className={styles.formLabel}>
              Tên của bạn*
            </label>
            <input
              className={styles.formInput}
              value={user.data.name}
              id='formName'
              type='text'
              placeholder='Nhập đầy đủ họ tên, có dấu'
              onChange={handleNameChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label for='formTel' className={styles.formLabel}>
              Điện thoại liên hệ*
            </label>
            <input
              className={styles.formInput}
              value={user.data.tel}
              id='formDocument'
              type='text'
              placeholder='Nhập số điện thoại liên hệ của bạn'
              onChange={handleTelChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label for='formZalo' className={styles.formLabel}>
              Số điện thoại Zalo (Không bắt buộc)
            </label>
            <input
              className={styles.formInput}
              value={user.data.zalo}
              id='formZalo'
              type='text'
              placeholder='Nhập số điện thoại zalo của bạn'
              onChange={handleZaloChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label for='formAddress' className={styles.formLabel}>
              Địa chỉ giao hàng
            </label>
            <input
              className={styles.formInput}
              value={user.data.address}
              id='formAddress'
              type='text'
              placeholder='Bỏ trống nếu lấy tại cửa hàng'
            />
          </div>
          <div className={styles.formGroup}>
            <label for='formNote' className={styles.formLabel}>
              Yêu cầu may (có thể thay đổi sau)*
            </label>
            <textarea
              className={styles.formInput}
              id='formNote'
              rows='5'
              placeholder='Nhập yêu cầu may cho nhân viên: Loại chất liệu, số lượng,...'
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Biên lai (nếu đã chuyển khoản, thông tin chuyển khoản ở phần bên
              dưới)
            </label>
            <label className={styles.formUploadButton}>
              <input
                className={styles.formInput}
                type='file'
                id='formReceipt'
                name='receipt'
                onChange={uploadReceipt}
              />
              Tải ảnh lên
            </label>

            {receiptName ? <p>{receiptName}</p> : null}
          </div>

          {isLoading ? (
            <>
              <p>
                Hệ thống đang xử lý, vui lòng chờ trong ít nhất 15 giây {'<3'}
              </p>
              <p className={styles.formSubmitButton}>Đang đăng ký...</p>
            </>
          ) : (
            <button
              type='button'
              onClick={handleSubmitButton}
              className={styles.formSubmitButton}
            >
              Đặt hàng ngay
            </button>
          )}
        </div>
      </form>

      <div className={styles.photocopyContainer}>
        <h3>Thông tin cửa hàng</h3>
        <p className={styles.name}>{data && data.name}</p>
        <p>Địa chỉ: {data && data.address}</p>
        <p>Số điện thoại: {data && data.tel}</p>
        <p>
          Zalo cửa hàng:{' '}
          {data && (
            <a
              href={`https://zalo.me/${data.zalo}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {data.zalo}
            </a>
          )}
        </p>
        <img src={data && data.images[0]} />
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Thông tin chi tiết
        </p>
        <p>{data && data.description}</p>
      </div>
    </div>
  );
}

export default Container;
