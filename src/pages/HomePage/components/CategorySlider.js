import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//swiper
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";

//styles
import styles from "./categorySlider.module.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlinePool, MdBusiness, MdHouseSiding } from "react-icons/md";
import { FaBusAlt, FaMotorcycle } from "react-icons/fa";
import { RiPrinterCloudLine } from "react-icons/ri";
import { IoIosBicycle } from "react-icons/io";

//media query
import useMediaQuery from "../../../hooks/useMediaQuery";

function CategorySlider() {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const navigateTo = (url) => {
    history.push(url);
  };

  return (
    <div>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        autoHeight={true}
        slidesPerView={4}
        spaceBetween={15}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className={styles.itemContainer}
            onClick={() => navigateTo("/pool-info")}
          >
            <MdOutlinePool />
            <p>Hồ bơi</p>
          </div>
        </SwiperSlide>

        {/* <SwiperSlide>
          <div
            className={styles.itemContainer}
            onClick={() => navigateTo('/guest-house-info')}
          >
            <MdBusiness />
            <p>Nhà khách</p>
          </div>
        </SwiperSlide> */}
        <SwiperSlide>
          <div
            className={styles.itemContainer}
            onClick={() => navigateTo("/bicycles")}
          >
            <IoIosBicycle />
            <p>Xe đạp</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className={styles.itemContainer}
            onClick={() => navigateTo("/photocopies")}
          >
            <RiPrinterCloudLine />
            <p>In ấn</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className={styles.itemContainer}
            onClick={() => navigateTo("/driving-test")}
          >
            <FaMotorcycle />
            <p>Sát hạch</p>
          </div>
        </SwiperSlide>

        {/* <SwiperSlide>
          <div className={styles.itemContainer}>
            <HiOutlineLocationMarker />
            <p>Cắm trại</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.itemContainer}>
            <FaBusAlt />
            <p>Xe buýt</p>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}

export default CategorySlider;
