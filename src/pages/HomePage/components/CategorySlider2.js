import React, { useState, useEffect } from "react";

//swiper
import { Grid, FreeMode, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";

//styles
import "./categorySlider2.css";
import styles from "./categorySlider2.module.css";

//media query
import useMediaQuery from "../../../hooks/useMediaQuery";
import classNames from "classnames";

function CategorySlider2() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className={classNames(styles.categoryContainer, "cate-container")}>
      <Swiper
        modules={[Grid, FreeMode, Scrollbar]}
        freeMode={true}
        autoHeight={true}
        slidesPerView={3}
        scrollbar={{ hide: false }}
        grid={{
          rows: 2,
          fill: "row",
        }}
        spaceBetween={15}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classNames(styles.slideContainer)}>
            <img src="https://i.imgur.com/ooBldLi.jpg" alt="cover" />
            <p>Nhà sàn</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default CategorySlider2;

// function useWrapperHeight() {
//   const [wrapperHeight, setWrapperHeight] = useState(300);

//   useEffect(() => {
//     console.log(
//       document.getElementsByClassName('swiper-wrapper')[0].style.height
//     );
//     const handleResize = () => {
//       setWrapperHeight(getWrapperHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     return window.removeEventListener('resize', handleResize);
//   }, []);

//   return wrapperHeight;
// }

// const getWrapperHeight = () => {
//   return parseFloat(
//     document.getElementsByClassName('swiper-wrapper')[0].style.height
//   );
// };
