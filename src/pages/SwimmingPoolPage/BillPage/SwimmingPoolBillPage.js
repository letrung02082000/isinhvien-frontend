import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./swimmingPoolBillPage.module.css";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";
import authHeader from "../../../utils/authHeader";
import TitleBar from "../../../components/TitleBar";

function SwimmingPoolTicketPage() {
  const history = useHistory();

  const billState = history.location.state;

  const goBack = () => {
    history.goBack();
  };

  const confirmBuyTicket = () => {
    if (
      billState.quantity > 0 &&
      billState.quantity <= 10 &&
      billState.rentQuantity >= 0 &&
      billState.rentQuantity <= 10
    ) {
      axios
        .post(
          "/api/pool/ticket",
          {
            quantity: billState.quantity,
            rentQuantity: billState.rentQuantity,
            pool: billState.pool,
          },
          authHeader()
        )
        .then((res) => {
          console.log(res.data);
          history.push("/pool-status", { response: res.data });
        })
        .catch((error) => {
          console.log(error);
          // history.push('/pool-status', { response: error.response.data });s
        });
    }
  };

  return (
    <div className={styles.container}>
      <TitleBar title="Mua vé hồ bơi" />
      <div className={styles.ticketContainer}>
        <div className={styles.headerContainer}>
          <img src="https://i.imgur.com/OoihNw5.jpg" alt="banner" />
          <div className={styles.seeMoreButtonContainer}>
            <button
              className={styles.seeMoreButton}
              onClick={() => {
                history.push("/pool-info");
              }}
            >
              Thông tin
            </button>
            <button
              className={styles.seeMoreButton}
              onClick={() => {
                history.push("/swimming-tutor");
              }}
            >
              Đăng ký học bơi
            </button>
          </div>
        </div>
        <div className={styles.ticketFormContainer}>
          <div className={styles.inputContainer}>
            <p>
              Số lượng mua: <span>{billState.quantity}</span>
            </p>
          </div>
          <div className={styles.inputContainer}>
            <p>
              Số lượng đồ thuê: <span>{billState.rentQuantity}</span>
            </p>
          </div>
          <div className={styles.inputContainer}>
            <p>Tổng cộng: {billState.totalPrice}</p>
          </div>
          <div className={styles.getBillButtonContainer}>
            <button className={styles.getBillButton} onClick={confirmBuyTicket}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwimmingPoolTicketPage;
