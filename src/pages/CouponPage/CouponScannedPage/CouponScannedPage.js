import axios from "axios";
import React, { useState } from "react";

function CouponScannedPage(props) {
  const query = new URLSearchParams(props.location.search);
  const user = query.get("user");
  const coupon = query.get("coupon");
  const [msg, setMsg] = useState("");

  const handleConfirmButton = () => {
    axios
      .get("/api/coupon-user/use", { params: { user, coupon } })
      .then((res) => {
        if (res.status === 200) {
          setMsg("Sử dụng mã ưu đãi thành công <3");
        } else {
          setMsg("Không thể sử dụng mã ưu đãi này");
        }
      })
      .catch((error) => {
        console.log(error);
        setMsg(
          "Không thể sử dụng mã ưu đãi này. Lỗi: " + error.response.data.message
        );
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p style={{ margin: "1rem 0" }}>{msg}</p>
      <button onClick={handleConfirmButton} style={{ padding: "0.5rem 1rem" }}>
        Xác nhận
      </button>
    </div>
  );
}

export default CouponScannedPage;
