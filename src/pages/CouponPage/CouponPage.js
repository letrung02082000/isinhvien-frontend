import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import QRCode from "qrcode.react";

import styles from "./couponPage.module.css";
import { MdArrowBack } from "react-icons/md";
import Loading from "../../components/Loading";
import authHeader from "../../utils/authHeader";
function CouponPage(props) {
  const serviceType = [
    "Tất cả dịch vụ",
    "Ăn uống",
    "Khóa học",
    "In ấn",
    "Đồng phục",
  ];
  const history = useHistory();
  const user = useSelector(selectUser);
  const query = new URLSearchParams(props.location.search);
  const couponId = query.get("id");
  const [coupon, setCoupon] = useState(null);
  const [save, setSave] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/coupon/${couponId}`)
      .then((res) => {
        console.log(res.data.data);
        setCoupon(res.data.data);
      })
      .catch((err) => {
        alert("Không tìm thấy mã giảm giá");
      });
  }, [couponId, setCoupon]);

  useEffect(() => {
    if (user.isLoggedIn) {
      axios
        .get(`/api/coupon-user/check?couponId=${couponId}`, authHeader())
        .then((res) => {
          setSave(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user.isLoggedIn, couponId, setSave]);

  if (!coupon) {
    return <Loading />;
  }

  const today = new Date();
  const notStarted =
    today >= new Date(coupon.startTime) && today < new Date(coupon.expiryTime)
      ? false
      : today < new Date(coupon.startTime)
      ? "Chưa mở"
      : "Hết hạn";

  const handleBackClick = () => {
    history.goBack();
  };

  const handleSaveClick = () => {
    axios
      .post("/api/coupon-user/save", { coupon: coupon._id }, authHeader())
      .then((res) => {
        setSave(true);
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Lưu mã không thành công. Bạn không thuộc đối tượng nhận ưu đãi hoặc mã đã được sử dụng. Xin cảm ơn!"
        );
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={handleBackClick}>
        <MdArrowBack size={28} />
      </div>
      <img src="/logo.jpg" alt="img" />
      <div className={styles.bodyContainer}>
        <h3 className={styles.couponTitle}>{coupon && coupon.name}</h3>
        <span>
          HSD:
          {new Date(coupon && coupon.expiryTime).toLocaleDateString("en-GB")}
        </span>
        <p>Áp dụng: {coupon && serviceType[coupon.serviceType]}</p>

        {!user.isLoggedIn ? (
          <button
            onClick={() => history.push("/login")}
            className={styles.loginButton}
          >
            Đăng nhập để nhận QR
          </button>
        ) : save && !save.isUsed ? (
          <>
            <p style={{ padding: "0 0.5rem", textAlign: "center" }}>
              Đưa mã này cho nhân viên để nhận được ưu đãi
            </p>

            <QRCode
              id="qrcode"
              value={`https://isinhvien.vn/coupon-scanned?user=${user.data.id}&coupon=${couponId}`}
              size={290}
              level={"H"}
              includeMargin={true}
              style={{
                borderRadius: "5px",
                border: "1px solid rgb(27, 183, 110)",
              }}
            />
          </>
        ) : coupon.requireWhiteList ? (
          <span style={{ textAlign: "center" }}>
            Ưu đãi dành cho một số người dùng nhất định.
            <br />
            Xem hướng dẫn nhận ưu đãi ở mô tả bên dưới.
          </span>
        ) : !notStarted ? (
          save && save.isUsed ? (
            "Đã sử dụng"
          ) : (
            <button className={styles.saveButton} onClick={handleSaveClick}>
              Lưu mã để nhận QR
            </button>
          )
        ) : (
          <button className={styles.saveButton} disabled>
            {notStarted}
          </button>
        )}

        <div className={styles.couponDescription}>
          <h3>Chi tiết ưu đãi</h3>
          <p>
            {coupon && coupon.description
              ? coupon.description
              : "Chưa cập nhật"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CouponPage;
