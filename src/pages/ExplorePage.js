import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import { useHistory } from 'react-router-dom';

import styles from './explorePage.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import {
  Category,
  SearchBar,
  VoucherList,
  VoucherListVertical,
} from '../components/ExplorePage';
import { IoTicketSharp, IoShirtOutline } from 'react-icons/io5';
import { MdPool } from 'react-icons/md';
import { FaHotel } from 'react-icons/fa';
import { AiOutlinePrinter } from 'react-icons/ai';
import authHeader from '../utils/authHeader';
function ExplorePage() {
  const history = useHistory();
  const [couponList, setCouponList] = useState([]);
  const [whiteList, setWhiteList] = useState([]);
  const [myCouponList, setMyCouponList] = useState([]);
  const [isMyCoupon, setIsMyCoupon] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get('/api/coupon/available?limit=10')
      .then((res) => {
        setCouponList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('/api/coupon/whitelist')
      .then((res) => {
        setWhiteList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (user.isLoggedIn) {
      axios
        .get('/api/coupon-user/my-coupon', authHeader())
        .then((res) => {
          if (res.data.data) {
            setMyCouponList(res.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user.isLoggedIn]);

  const handleSwitchClick = (event) => {
    setIsMyCoupon(false);
  };
  const handleSwitchMyClick = (event) => {
    setIsMyCoupon(true);
  };

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <MainLayout>
      <SearchBar
        placeholder={'T??m ki???m ??u ????i'}
        focusText={'T??nh n??ng ??ang ???????c ph??t tri???n'}
      />
      <div className={`${styles.switchButton}`}>
        <button
          className={isMyCoupon ? '' : styles.active}
          onClick={handleSwitchClick}
        >
          ??u ????i
        </button>
        <button
          className={isMyCoupon ? styles.active : ''}
          onClick={handleSwitchMyClick}
        >
          ??u ????i c???a t??i
        </button>
      </div>

      {!isMyCoupon ? (
        <>
          <Swiper
            modules={[Pagination]}
            slidesPerView={4}
            loop={false}
            height={'100%'}
            className='mySwiper'
            style={{ padding: '0.5rem', backgroundColor: 'white' }}
          >
            <SwiperSlide>
              <Category icon={IoTicketSharp} name='T???t c???' type={0} />
            </SwiperSlide>
            <SwiperSlide>
              <Category icon={MdPool} name='??n u???ng' type={1} />
            </SwiperSlide>
            <SwiperSlide>
              <Category icon={FaHotel} name='Kh??a h???c' type={2} />
            </SwiperSlide>
            <SwiperSlide>
              <Category icon={AiOutlinePrinter} name='In ???n' type={3} />
            </SwiperSlide>
            <SwiperSlide>
              <Category icon={IoShirtOutline} name='?????ng ph???c' type={4} />
            </SwiperSlide>
          </Swiper>
          <VoucherList
            type={99}
            title='??u ????i m???i'
            couponList={couponList}
            savedCouponList={{ myCouponList, setMyCouponList }}
          />
          <VoucherList
            type={100}
            title='??u ????i ?????c quy???n'
            couponList={whiteList}
            savedCouponList={{ myCouponList, setMyCouponList }}
          />
        </>
      ) : user.isLoggedIn ? (
        myCouponList && myCouponList.length > 0 ? (
          <VoucherListVertical />
        ) : (
          <p style={{ margin: '10rem 0 0', textAlign: 'center' }}>
            B???n ch??a l??u m?? ??u ????i n??o :(
          </p>
        )
      ) : (
        <div className={styles.loginContainer}>
          <p>????ng nh???p ????? t??ch l??y ??i???m nh???n voucher</p>
          <button onClick={() => navigateTo('/login')}>????ng nh???p ngay</button>
        </div>
      )}
    </MainLayout>
  );
}

export default ExplorePage;
