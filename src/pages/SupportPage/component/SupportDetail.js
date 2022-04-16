import React, { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import styles from "./supportDetail.module.css";

const SupportDetail = () => {
  const [telCopied, setTelCopied] = useState(false);
  const [zaloCopied, setZaloCopied] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`/api/job/${id}`)
  //     .then((res) => {
  //       if (res.data.data) {
  //         setData(res.data.data);
  //       }
  //     })
  //     .catch((error) =>
  //       alert(
  //         "Xin lỗi, không tìm thấy công việc này hoặc công việc đã bị gỡ bỏ!"
  //       )
  //     );
  // }, []);

  const handleTelCopy = () => {
    navigator.clipboard.writeText("0877876877");
    setTelCopied(true);
  };

  const handleZaloCopy = () => {
    navigator.clipboard.writeText("0877876877");
    setZaloCopied(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <p>
            <strong>Địa chỉ : {"...."}</strong>
          </p>
          <p>
            <strong>Thời gian: {"...."} </strong>
          </p>
          <p>
            <strong>Mô tả chi tiết: {"...."}</strong>
          </p>
          <p>
            <span style={{ color: "var(--primary)", fontWeight: "bold" }}>
              Di động:{" 0877876877 "}
            </span>
            <span onClick={handleTelCopy} className={styles.copyButton}>
              {telCopied ? "Đã chép" : <MdOutlineContentCopy />}
            </span>
          </p>

          <p>
            <span style={{ color: "var(--primary)", fontWeight: "bold" }}>
              Zalo:{" 0877876877 "}
            </span>
            <>
              <span onClick={handleZaloCopy} className={styles.copyButton}>
                {zaloCopied ? "Đã chép" : <MdOutlineContentCopy />}
              </span>
            </>
          </p>
        </div>
      </div>
    </>
  );
};

export default SupportDetail;
