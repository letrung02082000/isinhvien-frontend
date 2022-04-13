import React from 'react';
import { useHistory } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';

import VoucherCard from './VoucherCard';

import styles from './voucherList.module.css';
function VoucherList(props) {
  const history = useHistory();
  const type = props.type;

  return (
    <div className={styles.voucherList}>
      <div className={styles.voucherListTitle}>
        <h5>{props.title}</h5>
        <span onClick={() => history.push(`/coupon-list?type=${type}`)}>
          Xem tất cả ({props.couponList.length})
        </span>
      </div>
      <Swiper
        className='mySwiper'
        style={{ paddingLeft: '1rem' }}
        slidesPerView={'auto'}
        spaceBetween={20}
        modules={[Pagination]}
      >
        {props.couponList.map((child, idx, arr) => {
          return (
            <SwiperSlide key={child._id} style={{ maxWidth: '80%' }}>
              <VoucherCard
                coupon={child}
                setMyCouponList={props.savedCouponList.setMyCouponList}
                myCouponList={props.savedCouponList.myCouponList}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default VoucherList;
