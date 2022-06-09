import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateShow } from '../store/navSlice';
import styles from './swimmingPoolInfoPage.module.css';

//swiper
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import TitleBar from '../components/TitleBar';

function SwimmingPoolInfoPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateShow(false));
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar
        title='Hồ bơi'
        navigation='/pool-ticket'
        backgroundColor='rgb(0, 140, 255)'
      />
      <Swiper
        modules={[Pagination]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        slidesPerView={1}
        loop={true}
        autoHeight={false}
        autoplay
      >
        <SwiperSlide>
          <img
            src='/poolbanner.jpg'
            alt='banner'
            style={{ borderRadius: '0' }}
          />
        </SwiperSlide>
      </Swiper>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button
          className={styles.signupButton}
          onClick={() => history.push('/pool-ticket')}
        >
          Mua vé tháng
        </button>
        <button
          className={styles.signupButton}
          onClick={() => history.push('/pool-tutor')}
        >
          Đăng ký học bơi
        </button>
      </div>
      <div className={styles.bodyContainer}>
        <h3>
          Lý do bạn nên chọn hồ bơi <br />
          nhà khách ĐHQG
        </h3>
        <div>
          <img className={styles.numberIcon} src='/one.png' alt='img' />
        </div>
        <h5>
          Cơ sở vật chất hiện đại
          <br />
          Dịch vụ tiện nghi
        </h5>
        <ul>
          <li>
            <p className={styles.payText}>Có mái che nắng</p>
            <img
              className={styles.payIcon}
              src='/swimmingpool.png'
              alt='pay-icon'
            />
          </li>
          <li>
            <p className={styles.payText}>Cho thuê đồ bơi</p>
            <img
              className={styles.payIcon}
              src='/swimmingsuit.png'
              alt='pay-icon'
            />
          </li>
          <li>
            <p className={styles.payText}>Giáo viên hướng dẫn</p>
            <img
              className={styles.payIcon}
              src='/swimmingtutor.jpg'
              alt='pay-icon'
            />
          </li>
        </ul>
        <div>
          <img className={styles.numberIcon} src='/two.png' alt='img' />
        </div>
        <h5>Vị trí thuận tiện</h5>
        <ul>
          <li>
            <p className={styles.payText}>
              Gần ký túc xá
              <br />
              ĐHQG
            </p>
            <img
              className={styles.payIcon}
              src='/dormitory.png'
              alt='pay-icon'
            />
          </li>
          <li>
            <p className={styles.payText}>
              Có các tuyến
              <br />
              xe buýt đi qua
            </p>
            <img className={styles.payIcon} src='/bus.jpg' alt='pay-icon' />
          </li>
        </ul>
        <div>
          <img className={styles.numberIcon} src='/three.png' alt='img' />
        </div>
        <h5>Giá cả phải chăng</h5>
        <div className={styles.iconContainer}>
          <p className={styles.payText}>20.000đ/lượt</p>
          <p className={styles.payText}>Vé tháng siêu tiết kiệm</p>
          <img className={styles.payIcon} src='/savemoney.png' alt='pay-icon' />

          <p className={styles.payText}>500.000đ/2 tháng/30 lượt</p>
          <p className={styles.payText}>+1 lượt bơi miễn phí</p>
        </div>

        <div>
          <img className={styles.numberIcon} src='/four.png' alt='img' />
        </div>
        <h5>Nhiều ưu đãi tích điểm đổi voucher</h5>
        <div className={styles.iconContainer}>
          <img className={styles.payIcon} src='/voucher2.png' alt='pay-icon' />
        </div>
        <p className={styles.helpText}>Liên hệ hỗ trợ</p>
        <div className={styles.introContainer}>
          <a
            className={styles.contactButton}
            href='tel:+84797324886'
            target='_blank'
            rel='noreferer noreferrer'
          >
            Gọi ngay
          </a>
          <a
            className={styles.contactButton}
            href='https://zalo.me/0797324886'
            target='_blank'
            rel='noreferer noreferrer'
          >
            Zalo
          </a>
        </div>
      </div>
    </div>
  );
}

export default SwimmingPoolInfoPage;
