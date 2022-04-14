import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
import axios from "axios";
import TitleBar from "../../../components/TitleBar";

import { MdOutlineContentCopy } from "react-icons/md";
import styles from "./jobDetailPage.module.css";

function JobDetailPage(props) {
  const id = new URLSearchParams(props.location.search).get("id");
  const [data, setData] = useState(null);
  const [telCopied, setTelCopied] = useState(false);
  const [zaloCopied, setZaloCopied] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/job/${id}`)
      .then((res) => {
        if (res.data.data) {
          setData(res.data.data);
        }
      })
      .catch((error) =>
        alert(
          "Xin lỗi, không tìm thấy công việc này hoặc công việc đã bị gỡ bỏ!"
        )
      );
  }, []);

  const handleTelCopy = () => {
    navigator.clipboard.writeText(data.tel);
    setTelCopied(true);
  };

  const handleZaloCopy = () => {
    navigator.clipboard.writeText(data.zalo);
    setZaloCopied(true);
  };

  return (
    <>
      <TitleBar title="Thông tin việc làm" navigation="/jobs" />
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={data && data.banner} />
        </div>
        <div className={styles.infoContainer}>
          <p>
            <strong>Tên công việc:</strong> {data && data.title}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {data && data.address}
          </p>
          <p>
            <strong>Mức lương:</strong> {data && data.price}
          </p>
          <p>
            <strong>Thời gian: </strong>
            {data && data.time}
          </p>
          <p>
            <strong>Mô tả chi tiết:</strong> {data && data.description}
          </p>
          <p>
            <span style={{ color: "var(--primary)", fontWeight: "bold" }}>
              Di động:{" "}
            </span>
            {data && data.tel}
            <span onClick={handleTelCopy} className={styles.copyButton}>
              {telCopied ? "Đã chép" : <MdOutlineContentCopy />}
            </span>
          </p>

          <p>
            <span style={{ color: "var(--primary)", fontWeight: "bold" }}>
              Zalo:{" "}
            </span>
            {data && data.zalo ? (
              <>
                {data.zalo}
                <span onClick={handleZaloCopy} className={styles.copyButton}>
                  {zaloCopied ? "Đã chép" : <MdOutlineContentCopy />}
                </span>
              </>
            ) : (
              "Không có thông tin"
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default JobDetailPage;
