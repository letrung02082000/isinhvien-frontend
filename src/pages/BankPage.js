import React, { useState } from 'react';
import TitleBar from '../components/TitleBar';
import styles from './bankPage.module.css';
import { MdOutlineContentCopy } from 'react-icons/md';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import useMediaQuery from '../hooks/useMediaQuery';

function BankPage() {
  const isLargeScreen = useMediaQuery('min-width: 600px');
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(0);

  const nextSlide = (e) => {
    const swiper = document.querySelector('.instructionSwiper').swiper;
    swiper.slideNext();
  };

  const prevSlide = () => {
    const swiper = document.querySelector('.instructionSwiper').swiper;
    swiper.slidePrev();
  };

  const handleSlideChange = (e) => {
    setStep(e.realIndex + 1);
  };

  const handleCopyButton = () => {
    try {
      navigator.clipboard.writeText('P746');
      setCopied(true);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <TitleBar title='Mở thẻ MB Bank' />
        <img src='/bankbanner.jpg' style={{ width: '100%' }} />
        <p className={styles.header}>
          Mở tài khoản miễn phí, hoàn toàn online bằng công nghệ eKYC, miễn phí
          giao dịch trọn đời tại MBBank
        </p>
        <div className={styles.bodyContainer}>
          <h3 className={styles.mainTitle}>3 bước đơn giản</h3>
          <h5 className={styles.title}>
            Bước 1: Tải app MBBank từ cửa hàng Play Store hoặc App Store
          </h5>
          <a
            href={
              'https://play.google.com/store/apps/details?id=com.mbmobile&hl=vi&gl=US'
            }
            target='_blank'
            rel='noreferrer noopener'
            className={styles.button}
          >
            Mở CH Play
          </a>
          <a
            href={'https://apps.apple.com/vn/app/mb-bank/id1205807363?l=vi'}
            target='_blank'
            rel='noreferrer noopener'
            className={styles.button}
          >
            Mở App Store
          </a>
          <h5 className={styles.title}>
            Bước 2: Đóng app và mở lại bằng đường dẫn bên dưới (bắt buộc để nhận
            được hoàn tiền 30.000 đồng vào tài khoản sau khi đăng ký thành công)
          </h5>

          <a
            href={'https://l.linklyhq.com/l/tFVc'}
            target='_blank'
            rel='noreferrer noopener'
            className={styles.button}
          >
            Mở MBBank
          </a>

          <h5 className={styles.title}>
            Bước 3: Thực hiện eKYC để hoàn tất đăng ký, hệ thống MBBank sẽ hoàn
            tiền 30.000đ trong vòng 5 phút sau khi đăng ký thành công.
          </h5>

          <Swiper
            // modules={[Pagination]}
            // pagination={{ clickable: true }}
            slidesPerView={1}
            loop={true}
            style={{ width: '100%' }}
            className='instructionSwiper'
            onSlideChange={handleSlideChange}
            autoHeight
          >
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb1.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb2.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb3.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb4.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb5.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb6.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb7.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb8.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb9.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb10.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb11.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb12.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb13.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb14.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.image}
                src='/mbbank/bb15.png'
                alt='img'
                style={{ width: '100%', maxWidth: '15rem' }}
              />
            </SwiperSlide>
          </Swiper>
          <div className={styles.buttonContainer}>
            <button className={styles.slideButton} onClick={prevSlide}>
              Lùi lại
            </button>
            <span>Bước {step}</span>
            <button className={styles.slideButton} onClick={nextSlide}>
              Kế tiếp
            </button>
          </div>
          <div className={styles.stepContainer}>
            {step === 1 ? (
              <p>
                Chọn Đăng ký ngay từ màn hình chào mừng của ứng dụng.
                <br />
                Lưu ý: Bắt buộc mở app MBBank từ liên kết bên trên để nhận được
                hoàn tiền 30.000đ
              </p>
            ) : null}
            {step === 2 ? (
              <p>
                Nhập Số điện thoại và bấm Tiếp theo. Mã OTP sẽ được gửi về số
                điện thoại bạn vừa đăng ký
              </p>
            ) : null}
            {step === 3 ? <p>Hãy nhập mã OTP xác nhận</p> : null}
            {step === 4 ? (
              <p>
                Bắt đầu eKYC bằng cách chụp giấy tờ tùy thân mặt trước và mặt
                sau của bạn
                <br />
                Bạn có thể lựa chọn 1 trong ba giấy tờ tùy thân để xác minh
                thông tin: Chứng minh nhân dân/Thẻ căn cước, Hộ chiếu, Chứng
                minh thư quân đội
              </p>
            ) : null}
            {step === 5 ? <p>Chụp ảnh mặt trước giấy tờ tùy thân</p> : null}
            {step === 6 ? (
              <p>Chọn sử dụng và làm tương tự với mặt sau giấy tờ tùy thân</p>
            ) : null}

            {step === 7 ? (
              <p>
                Xác thực chân dung và giọng nói: Xác nhận chân dung theo hướng
                dẫn trong hình và đọc to dãy số trên màn hình.
              </p>
            ) : null}
            {step === 8 ? (
              <p>
                Xác thực chân dung và giọng nói: Xác nhận chân dung theo hướng
                dẫn trong hình và đọc to dãy số trên màn hình.
              </p>
            ) : null}
            {step === 9 ? (
              <p>
                Xác thực chân dung và giọng nói: Xác nhận chân dung theo hướng
                dẫn trong hình và đọc to dãy số trên màn hình.
              </p>
            ) : null}
            {step === 10 ? (
              <p>Kiểm tra thông tin cá nhân và chọn Tiếp tục</p>
            ) : null}
            {step === 11 ? (
              <p>
                Tạo tài khoản đăng nhập (Vui lòng ghi nhớ tên tài khoản và mật
                khẩu để truy cập vào ứng dụng sau này). Nhập mã giới thiệu{' '}
                <span style={{ color: 'red', fontWeight: 'bold' }}>P746</span>{' '}
                <MdOutlineContentCopy
                  style={{ margin: '0 0.5rem' }}
                  onClick={handleCopyButton}
                />
                <span
                  style={{
                    fontSize: '0.9rem',
                    backgroundColor: '#ccc',
                    padding: '0.2rem',
                    margin: '0 1rem 0 0',
                    borderRadius: '5px',
                  }}
                >
                  {copied ? 'Đã chép' : null}
                </span>
                tại ô Mã người giới thiệu để nhận được hoàn tiền 30.000đ. Sau đó
                chọn Tiếp tục
              </p>
            ) : null}
            {step === 12 ? (
              <p>
                Chọn Tài khoản trùng với số điện thoại và chọn Tiếp tục (số tài
                khoản hoàn toàn miễn phí)
              </p>
            ) : null}
            {step === 13 ? <p>Chọn Tiếp tục khi hiển thị quà tặng</p> : null}
            {step === 14 ? (
              <p>Xác nhận thông tin cá nhân và chọn Xác nhận</p>
            ) : null}

            {step === 15 ? (
              <p>
                Nhập Mã OTP được gửi về số điện thoại và hoàn tất đăng ký. Bạn
                sẽ nhận được ngay 30.000 đồng vào tài khoản sau khi đăng ký
                thành công!
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankPage;
