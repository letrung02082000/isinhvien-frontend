import React from 'react';

//swiper
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

//styles
import './homeSlider.css';

//media query
import useMediaQuery from '../../hooks/useMediaQuery';

function HomeSlider() {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        slidesPerView={1}
        loop={true}
        autoHeight={true}
        className='mySwiper'
      >
        <SwiperSlide>
          <img src='/home-banner/01.jpg' alt='banner' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/home-banner/02.jpg' alt='banner' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/home-banner/03.jpg' alt='banner' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default HomeSlider;
