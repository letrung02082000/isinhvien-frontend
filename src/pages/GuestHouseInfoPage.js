import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './guestHouseInfoPage.module.css';

import TitleBar from '../components/TitleBar';

function GuestHouseInfoPage() {
  const history = useHistory();

  const handleSignupButton = () => {
    history.push('/guest-house-user');
  };

  return (
    <div className={styles.container}>
      <TitleBar title='Thông tin nhà khách' backgroundColor='#01787A' />
      <img
        className={styles.banner}
        src='/guesthouse.jpg'
        alt='guest-house'
        style={{ width: '100%' }}
      />

      <div className={styles.body}>
        <h2 className={styles.title}>Thông tin chung</h2>
        <p style={{ textAlign: 'center' }}>Nhà Khách Đại Học Quốc Gia TP.HCM</p>
        <p style={{ textAlign: 'center' }}>
          Địa chỉ: Khu phố Tân Lập - P. Đông Hòa - TP. Dĩ An - T. Bình Dương
        </p>
        <p style={{ textAlign: 'center' }}>
          Thông tin liên hệ
          <br /> 02837.244.222 / 0977.742.191 ( Ms.Hà)
          <br />
          hoặc
          <br />
          0981.190.069 ( Ms.Ngọc)
        </p>
        <div className={styles.signupButtonContainer}>
          <button onClick={handleSignupButton}>Đặt phòng ngay</button>
        </div>
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>Bảng giá phòng</h2>
        <h3>&#10024; Phòng máy lạnh</h3>

        <ul>
          <li>
            <h5>1 giường đôi</h5>
            <p>&#128142; Đơn giá: 250 000 đồng</p>
            <p>&#128073; Số lượng: 1-2 người</p>
          </li>
          <li>
            <h5>2 giường đôi</h5>
            <p>
              &#128142; Đơn giá: 300 000 đồng (1-2 người), 350 000 đồng (3
              người), 400 000 đồng (4 người)
            </p>
            <p>&#128073; Số lượng: 1-4 người</p>
          </li>
          <li>
            <h5>2 giường đơn</h5>
            <p>&#128142; Đơn giá: 300 000 đồng</p>
            <p>&#128073; Số lượng: 1-2 người</p>
          </li>
        </ul>
        <p>Lưu ý: Giá phòng chưa bao gồm hóa đơn.</p>
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>Quy trình nhận và trả phòng</h2>
        <h5 className={styles.text}>Nhận phòng</h5>
        <ul>
          <li>Xuất trình giấy tờ tại quầy lễ tân</li>
          <li>Cập nhật thông tin</li>
          <li>Giao chìa khóa và nhận phòng</li>
        </ul>
        <h5 className={styles.text}>Trả phòng</h5>
        <ul>
          <li> Quý khách trả phòng trước 12h00</li>
          <li>
            Nếu quý khách trả phòng sau 12h phụ thu như sau:
            <br />
            Từ 12h-15h, phụ thu 30% giá phòng
            <br />
            Từ 15h-18h, phụ thu 50% giá phòng
            <br />
            Sau 18h, phụ thu 100% giá phòng
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GuestHouseInfoPage;
