import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../store/userSlice';
import { updateShow } from '../store/navSlice';

import styles from './qrScanPage.module.css';

import TitleBar from '../components/TitleBar';

function QrScanPage() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateShow(false));
  }, []);

  const userData = JSON.stringify(user.data);

  return (
    <>
      <TitleBar title='Mã QR' />
      <div className={styles.container}>
        <p style={{ margin: '7rem 0 1rem 0' }}>
          Đưa mã này cho nhân viên để check-in
        </p>
        <QRCode
          id='qrcode'
          value={userData}
          size={290}
          level={'H'}
          includeMargin={true}
          //   imageSettings={{
          //     src: 'https://i.imgur.com/wG3nKXR.jpg?1',
          //     excavate: true,
          //   }}
          style={{
            borderRadius: '5px',
            border: '1px solid rgb(27, 183, 110)',
          }}
        />
        <p style={{ margin: '7rem 0 1rem 0' }}>
          Lưu mã QR để sử dụng thuận tiện hơn
        </p>
        <a
          onClick={downloadQR}
          style={{
            cursor: 'pointer',
            backgroundColor: '#fff',
            padding: '0.5rem 1rem',
            margin: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          Lưu về máy
        </a>
      </div>
    </>
  );
}

export default QrScanPage;

const downloadQR = () => {
  const canvas = document.getElementById('qrcode');
  const pngUrl = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');
  console.log('pngUrl', pngUrl);
  let downloadLink = document.createElement('a');
  downloadLink.href = pngUrl;
  downloadLink.download = 'isinhvien-qrcode.png';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
