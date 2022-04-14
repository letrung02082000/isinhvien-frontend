import React from "react";
import TitleBar from "../../../components/TitleBar";
import styles from "./drivingTestPage.module.css";

import { useHistory } from "react-router-dom";

function DrivingTestPage() {
  const history = useHistory();

  const navigateTo = (url) => {
    history.push(url);
  };

  return (
    <div className={styles.drivingContainer}>
      <TitleBar title="Đăng ký thi sát hạch lái xe" />
      <div className={styles.header}>
        <img
          src="/drivingbanner.jpg"
          rel="driving banner"
          className={styles.drivingBanner}
        />
        <div className={styles.introContainerTop}>
          <a
            className={styles.contactButtonTop}
            href="tel:+84383270434"
            target="_blank"
            rel="noreferer noreferrer"
          >
            Gọi ngay
          </a>
          <a
            className={styles.contactButtonTop}
            href="https://zalo.me/0383270434"
            target="_blank"
            rel="noreferer noreferrer"
          >
            Zalo
          </a>
        </div>
      </div>

      <div className={styles.bodyContainer}>
        <h3>Đăng ký đơn giản</h3>
        <div>
          <img className={styles.numberIcon} src="/one.png" alt="img" />
        </div>
        <h5>Điền đơn đăng ký dự thi</h5>
        <div style={{ display: "flex" }}>
          <button
            className={styles.signupButton}
            onClick={() => navigateTo("/driving-instruction")}
          >
            Hướng dẫn
          </button>
          <button
            className={styles.signupButton}
            onClick={() => navigateTo("/driving-registration")}
          >
            Điền đơn
          </button>
        </div>
        <div>
          <img className={styles.numberIcon} src="/two.png" alt="img" />
        </div>
        <h5>Đóng phí dự thi</h5>
        <ul className={styles.mobileMoneyContainer}>
          <li>
            <p className={styles.payText}>Momo</p>
            <img className={styles.payIcon} src="/momo.png" alt="pay-icon" />
          </li>
          <li>
            <p className={styles.payText}>Zalo Pay</p>
            <img className={styles.payIcon} src="/zalopay.png" alt="pay-icon" />
          </li>
          <li>
            <p className={styles.payText}>Viettel Money</p>
            <img
              className={styles.payIcon}
              src="/viettelmoney.svg"
              alt="pay-icon"
            />
          </li>
          <li>
            <p className={styles.payText}>Chuyển khoản ngân hàng</p>
            <img className={styles.payIcon} src="/napas.jpg" alt="pay-icon" />
          </li>
          <li>
            <p className={styles.payText}>Đóng trực tiếp</p>
            <img
              className={styles.payIcon}
              src="/directmoney.png"
              alt="pay-icon"
            />
          </li>
        </ul>
        <div>
          <img className={styles.numberIcon} src="/three.png" alt="img" />
        </div>
        <h5>Chờ duyệt và xác nhận ngày thi</h5>
        <div>
          <img className={styles.numberIcon} src="/four.png" alt="img" />
        </div>
        <h5>Đi thi</h5>
        <div className={styles.signupContainer}>
          <button
            className={styles.signupButton}
            // href='https://forms.gle/JjoJf74w6oPEgYNq9'
            // target='_blank'
            // rel='noreferer noreferrer'
            onClick={() => navigateTo("/driving-registration")}
          >
            Đăng ký ngay
          </button>
        </div>
        <p className={styles.helpText}>Liên hệ hỗ trợ</p>
        <div className={styles.introContainer}>
          <a
            className={styles.contactButton}
            href="tel:+84383270434"
            target="_blank"
            rel="noreferer noreferrer"
          >
            Gọi ngay
          </a>
          <a
            className={styles.contactButton}
            href="https://zalo.me/0383270434"
            target="_blank"
            rel="noreferer noreferrer"
          >
            Zalo
          </a>
        </div>
      </div>
    </div>
  );
}

export default DrivingTestPage;
