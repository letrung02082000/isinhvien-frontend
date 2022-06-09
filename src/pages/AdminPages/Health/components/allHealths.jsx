import React, { useEffect, useState } from "react";
import { Loading } from "../../../_commons";
import healthApi from "../api";
import styles from "./allHealths.module.css";
import { useHistory } from "react-router-dom";
import { ToastWrapper } from "../../../../utils";

function AllHealths() {
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [healthList, setHealthList] = useState([]);

  useEffect(() => {
    healthApi
      .getAllHealthPostss(page, limit)
      .then((res) => {
        if(res.data) {
          setHealthList(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [page]);

  const handleUpdateButton = (id) => {
    history.push(`/health-admin?navigation=update&id=${id}`);
  };

  const toggleVisibleButton = (id, isVisible) => {
    healthApi
      .updateHealthPosts(id, { isVisible })
      .then((res) => {
        healthApi
          .getAllHealthPostss(page, limit)
          .then((res) => {
            setHealthList(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        alert(err.toString());
      });
  };

  const handlePageChange = (value) => {
    if (value < 0) {
      return;
    }

    setPage(value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      {healthList.length === 0 ? <span>Không có dữ liệu</span> : null}
      {healthList.map((child) => {
        return (
          <div className={styles.itemContainer} key={child._id}>
            <div className={styles.contentContainer}>
              <h2>{child.title}</h2>
              <p
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: child.content }}
              ></p>
              <span>Độ ưu tiên: {child.priority}</span>
              <p>
                Ngày tạo:{" "}
                {new Date(child.createdAt).toLocaleDateString("en-GB")},{" "}
                {new Date(child.createdAt).toLocaleTimeString("en-GB")}
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={() => handleUpdateButton(child._id)}>
                Chỉnh sửa
              </button>
              <button
                style={
                  child.isVisible
                    ? { backgroundColor: "var(--primary)", color: "white" }
                    : { color: "red", borderColor: "red" }
                }
                onClick={() => toggleVisibleButton(child._id, !child.isVisible)}
              >
                {child.isVisible ? "Ẩn bài viết" : "Hiện bài viết"}
              </button>
            </div>
          </div>
        );
      })}
      <div className={styles.pagingContainer}>
        <button
          className={styles.button}
          onClick={() => handlePageChange(page - 1)}
        >
          {"<"}
        </button>
        {page + 1}
        <button
          className={styles.button}
          onClick={() => handlePageChange(page + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default AllHealths;
