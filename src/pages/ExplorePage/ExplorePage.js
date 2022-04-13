import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";
import { useHistory } from "react-router-dom";

import styles from "./explorePage.module.css";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Pagination } from "swiper";
import {
  Category,
  SearchBar,
  VoucherList,
  VoucherListVertical,
} from "./components";
import { IoTicketSharp, IoShirtOutline } from "react-icons/io5";
import { MdPool } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { AiOutlinePrinter } from "react-icons/ai";
import authHeader from "../../utils/authHeader";
function ExplorePage() {
  const history = useHistory();
  const [couponList, setCouponList] = useState([]);
  const [whiteList, setWhiteList] = useState([]);
  const [myCouponList, setMyCouponList] = useState([]);
  const [isMyCoupon, setIsMyCoupon] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get("/api/coupon/available?limit=10")
      .then((res) => {
        setCouponList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/coupon/whitelist")
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
        .get("/api/coupon-user/my-coupon", authHeader())
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
        placeholder={"Tìm kiếm ưu đãi"}
        focusText={"Tính năng đang được phát triển"}
      />
      <div className={`${styles.switchButton}`}>
        <button
          className={isMyCoupon ? "" : styles.active}
          onClick={handleSwitchClick}
        >
          Ưu đãi
        </button>
        <button
          className={isMyCoupon ? styles.active : ""}
          onClick={handleSwitchMyClick}
        >
          Ưu đãi của tôi
        </button>
      </div>

      {!isMyCoupon ? (
        <>
          <Swiper
            modules={[Pagination]}
            slidesPerView={4}
            loop={false}
            height={"100%"}
            className="mySwiper"
            style={{ padding: "0.5rem", backgroundColor: "white" }}
          >
            <SwiperSlide>
              <Category icon={IoTicketSharp} name="Tất cả" type={0} />
            </SwiperSlide>
            <SwiperSlide>
              <Category icon={MdPool} name="Ăn uống" type={1} />
            </SwiperSlide>
            <SwiperSlide>
              <Category icon={FaHotel} name="Khóa học" type={2} />
            </SwiperSlide>
            <SwiperSlide>
              <Category icon={AiOutlinePrinter} name="In ấn" type={3} />
            </SwiperSlide>
            <SwiperSlide>
              <Category icon={IoShirtOutline} name="Đồng phục" type={4} />
            </SwiperSlide>
          </Swiper>
          <VoucherList
            type={99}
            title="Ưu đãi mới"
            couponList={couponList}
            savedCouponList={{ myCouponList, setMyCouponList }}
          />
          <VoucherList
            type={100}
            title="Ưu đãi độc quyền"
            couponList={whiteList}
            savedCouponList={{ myCouponList, setMyCouponList }}
          />
        </>
      ) : user.isLoggedIn ? (
        myCouponList && myCouponList.length > 0 ? (
          <VoucherListVertical />
        ) : (
          <p style={{ margin: "10rem 0 0", textAlign: "center" }}>
            Bạn chưa lưu mã ưu đãi nào :(
          </p>
        )
      ) : (
        <div className={styles.loginContainer}>
          <p>Đăng nhập để tích lũy điểm nhận voucher</p>
          <button onClick={() => navigateTo("/login")}>Đăng nhập ngay</button>
        </div>
      )}
    </MainLayout>
  );
}

export default ExplorePage;
