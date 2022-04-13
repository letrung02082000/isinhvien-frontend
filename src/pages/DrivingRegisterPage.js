import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import TitleBar from "../components/TitleBar";

import styles from "./drivingRegisterPage.module.css";
import { SearchBar } from "./ExplorePage/components";

function DrivingRegisterPage() {
  const { search } = useLocation();
  const source = new URLSearchParams(search).get("s") || 0;

  const [frontsideName, setFrontsideName] = useState(null);
  const [frontsideFile, setFrontsideFile] = useState(null);
  const [backsideName, setBacksideName] = useState(null);
  const [backsideFile, setBacksideFile] = useState(null);
  const [portraitName, setPortraitName] = useState(null);
  const [portraitFile, setPortraitFile] = useState(null);
  const [receiptName, setReceiptName] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [isPaid, setIsPaid] = useState(1);
  const [drivingType, setDrivingType] = useState(0);
  const [date, setDate] = useState(0);
  const [dateList, setDateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState(null);

  const imageExtensions = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];

  useEffect(async () => {
    try {
      const response = await axios.get("/api/driving/date?formVisible=true");
      let data = response.data.data;

      if (data.length > 0) {
        data = data.map((child) => {
          return {
            ...child,
            date: new Date(child.date),
          };
        });

        setDateList(data);
      } else {
        alert("Chưa có danh sách ngày thi mới");
      }
    } catch (e) {
      alert("Lỗi: " + e);
    }
  }, []);

  const handleSubmitButton = (e) => {
    setIsLoading(true);
    console.log(dateList[date].date.toLocaleDateString());
    if (!frontsideFile) {
      setIsLoading(false);
      return alert("Lỗi: Vui lòng tải lên mặt trước cmnd/cccd");
    }
    if (!backsideFile) {
      setIsLoading(false);
      return alert("Lỗi: Vui lòng tải lên mặt sau cmnd/cccd");
    }
    if (!portraitFile) {
      setIsLoading(false);
      return alert("Lỗi: Vui lòng tải lên ảnh chân dung của bạn");
    }

    const fullname = document.getElementById("formName").value;
    const tel = document.getElementById("formTel").value;
    const zalo = document.getElementById("formZalo").value;
    const feedback = document.getElementById("formFeedback").value;
    let paidState = isPaid === 0;

    if (!fullname || !tel || !zalo) {
      return alert(
        "Vui lòng nhập đầy đủ: họ tên, số điện thoại và số điện thoại zalo"
      );
    }

    const formData = new FormData();

    formData.append("name", fullname);
    formData.append("tel", tel);
    formData.append("zalo", zalo);
    formData.append("frontside", frontsideFile);
    formData.append("backside", backsideFile);
    formData.append("portrait", portraitFile);
    formData.append("receipt", receiptFile);
    formData.append("isPaid", paidState);
    formData.append("paymentMethod", paymentMethod);
    formData.append("feedback", feedback);
    formData.append("drivingType", drivingType);
    formData.append("source", source);

    if (drivingType === 0) {
      formData.append("date", dateList[date].date.getTime());
    }

    axios({
      method: "post",
      url: "/api/driving/add",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        if (res.status === 200) {
          alert(
            "Đăng ký thành công. Trung tâm sẽ liên hệ với bạn trong thời gian sớm nhất. Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ zalo để được xử lý."
          );
          setIsLoading(false);
        } else {
          alert("Lỗi: " + res.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Lỗi: " + error);
        setIsLoading(false);
      });
  };

  const handleIsPaidChange = (value) => {
    setIsPaid(value);
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleDrivingTypeChange = (value) => {
    setDrivingType(value);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  const uploadFrontside = (e) => {
    if (imageExtensions.includes(e.target.files[0].type)) {
      setFrontsideFile(e.target.files[0]);
      setFrontsideName(e.target.files[0].name);
      console.log(e.target.files[0]);
    } else {
      setFrontsideName("Lỗi: Tệp tải lên không phải là tệp hình ảnh");
    }
  };
  const uploadBackside = (e) => {
    if (imageExtensions.includes(e.target.files[0].type)) {
      setBacksideFile(e.target.files[0]);
      setBacksideName(e.target.files[0].name);
    } else {
      setBacksideName("Lỗi: Tệp tải lên không phải là tệp hình ảnh");
    }
  };
  const uploadPortrait = (e) => {
    if (imageExtensions.includes(e.target.files[0].type)) {
      setPortraitFile(e.target.files[0]);
      setPortraitName(e.target.files[0].name);
    } else {
      setPortraitName("Lỗi: Tệp tải lên không phải là tệp hình ảnh");
    }
  };
  const uploadReceipt = (e) => {
    if (imageExtensions.includes(e.target.files[0].type)) {
      setReceiptFile(e.target.files[0]);
      setReceiptName(e.target.files[0].name);
    } else {
      setReceiptName("Lỗi: Tệp tải lên không phải là tệp hình ảnh");
    }
  };

  const handleSearchChange = (e) => {
    console.log(searchValue);
    setSearchValue(e.target.value);
  };

  const handleSearchPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      axios
        .get("/api/driving/search", { params: { tel: searchValue } })
        .then((res) => {
          const data = res.data.data;

          if (data.length === 0) {
            alert("Không tìm thấy hồ sơ khớp với số điện thoại " + searchValue);
          } else {
            setSearchData(data);
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Không tìm thấy hồ sơ khớp với số điện thoại " + searchValue);
        });
    }
  };

  return (
    <div className={styles.drivingRegisterContainer}>
      <TitleBar title="Đăng ký dự thi" navigation="/driving-test" />
      <SearchBar
        placeholder={"Tra cứu trạng thái hồ sơ"}
        focusText={"Nhập số điện thoại và nhấn Enter"}
        onChange={handleSearchChange}
        onKeyPress={handleSearchPress}
        value={searchValue}
      />
      {searchData &&
        searchData.map((child) => {
          const date = new Date(child.date);
          const processDate = new Date(date);
          processDate.setDate(date.getDate() - 14);
          let state = "";

          if (child.processState == 0) {
            state = "Đang chờ xử lý";
          } else if (child.processState == 1) {
            state = "Đang chờ cập nhật";
          } else if (child.processState == 2) {
            state = "Đang chờ thanh toán";
          } else if (child.processState == 3) {
            state = "Đã hoàn tất hồ sơ";
          } else if (child.processState == 4) {
            state = "Đã hủy hồ sơ";
          }

          return (
            <div className={styles.orderContainer}>
              <p>Họ tên: {child.name}</p>
              <p>
                Ngày dự thi:
                {` ${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`}
              </p>
              <p>Trạng thái: {state}</p>
              <p>
                Hồ sơ của bạn sẽ được xử lý vào ngày:
                {` ${processDate.getDate()}/${
                  processDate.getMonth() + 1
                }/${processDate.getFullYear()}`}
              </p>
              <p>
                Vui lòng liên hệ{" "}
                <a
                  href="https://zalo.me/0383270434"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0383.270.434
                </a>{" "}
                để được hỗ trợ trong trường hợp hồ sơ của bạn chưa được xử lý.
              </p>
            </div>
          );
        })}
      <form className={styles.drivingFormContainer}>
        <p style={{ margin: 0 }}>
          Xem hướng dẫn đăng ký dự thi{" "}
          <a
            href="/driving-instruction"
            target="_blank"
            rel="noopener noreferrer"
          >
            tại đây.
          </a>
        </p>
        <ul style={{ listStyle: "none", padding: "0" }}>
          <li>
            Thông tin chuyển khoản:
            <br />- Chủ tài khoản: Nguyễn Ngọc Huân
            <br />- Ngân hàng: MB Bank (Ngân hàng Quân đội)
            <br />- Số tài khoản: 0877876877
            <br />- Nội dung: Họ tên_SĐT_Bang A1_Ngày dự thi
            <br />- Số tiền: 590.000 đồng đối với bằng A1, 2.000.000 đồng đối
            với bằng A2
            <br />- Gửi lại ảnh chụp biên lai trong form đăng ký nếu đã chuyển
            khoản.
            <br />- Gửi lại ảnh chụp biên lai tại Zalo:{" "}
            <a
              href="https://zalo.me/0383270434"
              target="_blank"
              rel="noopener noreferrer"
            >
              0383.270.434
            </a>{" "}
            nếu đóng sau khi đăng ký.
          </li>

          <li>Hoàn thành lệ phí thi trước ngày dự thi 14 ngày.</li>
        </ul>
        <p style={{ margin: 0, color: " #ff0000 " }}>* bắt buộc</p>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tên của bạn*</label>
          <input
            className={styles.formInput}
            id="formName"
            type="text"
            placeholder="Nhập họ tên đầy đủ, có dấu"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Số điện thoại liên hệ*</label>
          <input
            className={styles.formInput}
            id="formTel"
            type="text"
            placeholder="Nhập số điện thoại của bạn"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Số điện thoại Zalo*</label>
          <input
            className={styles.formInput}
            id="formZalo"
            type="text"
            placeholder="Nhập số điện thoại Zalo của bạn"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Mặt trước CMND/CCCD*</label>
          <label className={styles.formUploadButton}>
            <input
              className={styles.formInput}
              type="file"
              accept="image/*"
              id="frontside"
              name="frontside"
              onChange={uploadFrontside}
              required
            />
            Tải tệp lên
          </label>
          {frontsideName ? (
            <p className={styles.formFilename}>{frontsideName}</p>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Mặt sau CMND/CCCD*</label>
          <label className={styles.formUploadButton}>
            <input
              className={styles.formInput}
              type="file"
              accept="image/*"
              id="backside"
              name="backside"
              onChange={uploadBackside}
              required
            />
            Tải tệp lên
          </label>
          {backsideName ? (
            <p className={styles.formFilename}>{backsideName}</p>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Ảnh chụp chân dung* (không chụp ảnh thẻ, xem ảnh mẫu trong hướng dẫn{" "}
            <a
              href="/driving-instruction"
              target="_blank"
              rel="noopener noreferrer"
            >
              tại đây
            </a>
            )
            <br />
            Xem video hướng dẫn tạo ảnh nền xanh tại{" "}
            <a
              href="https://youtu.be/56xW53bxNLg"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://youtu.be/56xW53bxNLg
            </a>
          </label>
          <label className={styles.formUploadButton}>
            <input
              className={styles.formInput}
              type="file"
              accept="image/*"
              id="portrait"
              name="portrait"
              onChange={uploadPortrait}
              required
            />
            Tải tệp lên
          </label>
          {portraitName ? (
            <p className={styles.formFilename}>{portraitName}</p>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Chọn loại bằng lái*</label>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type="radio"
              onChange={() => handleDrivingTypeChange(0)}
              checked={drivingType === 0}
            />
            <p onClick={() => handleDrivingTypeChange(0)}>
              Bằng A1 (Mô tô 2 bánh có dung tích xi lanh từ 50cc cho đến dưới
              175cc, lệ phí thi 590.000 đồng, chọn ngày thi ở mục bên dưới)
            </p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type="radio"
              onChange={() => handleDrivingTypeChange(1)}
              checked={drivingType === 1}
            />
            <p onClick={() => handleDrivingTypeChange(1)}>
              Bằng A2 (Mô tô 2 bánh không giới hạn dung tích xi lanh, lệ phí thi
              2.000.000 đồng, trung tâm liên hệ hướng dẫn qua điện thoại)
            </p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type="radio"
              onChange={() => handleDrivingTypeChange(2)}
              checked={drivingType === 2}
            />
            <p onClick={() => handleDrivingTypeChange(2)}>
              Bằng B2 (Bằng lái xe ô tô, trung tâm liên hệ hướng dẫn qua điện
              thoại)
            </p>
          </div>
        </div>

        {drivingType === 0 ? (
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Chọn ngày thi*</label>

            {dateList.map((child, index) => {
              return (
                <div className={styles.selectContainer}>
                  <input
                    className={styles.formInput}
                    type="radio"
                    onChange={() => handleDateChange(index)}
                    checked={date === index}
                  />
                  <p onClick={() => handleDateChange(index)}>
                    {child.description || child.date.toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Hình thức đóng lệ phí*</label>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type="radio"
              onChange={() => handlePaymentMethodChange(0)}
              checked={paymentMethod === 0}
            />
            <p onClick={() => handlePaymentMethodChange(0)}>
              Đóng trực tiếp tại nhà khách ĐHQG
            </p>
          </div>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type="radio"
              onChange={() => handlePaymentMethodChange(1)}
              checked={paymentMethod === 1}
            />
            <p onClick={() => handlePaymentMethodChange(1)}>
              Chuyển khoản ngân hàng
            </p>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Bạn đã đóng lệ phí chưa?*</label>
          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type="radio"
              onChange={() => handleIsPaidChange(0)}
              checked={isPaid == 0}
            />
            <p onClick={() => handleIsPaidChange(0)}>Đã thanh toán</p>
          </div>

          <div className={styles.selectContainer}>
            <input
              className={styles.formInput}
              type="radio"
              onChange={() => handleIsPaidChange(1)}
              checked={isPaid == 1}
            />
            <p onClick={() => handleIsPaidChange(1)}>Mình sẽ đóng lệ phí sau</p>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Ảnh chụp biên lai (nếu đã đóng lệ phí)
          </label>
          <label className={styles.formUploadButton}>
            <input
              className={styles.formInput}
              type="file"
              accept="image/*"
              id="receipt"
              name="receipt"
              onChange={uploadReceipt}
            />
            Tải tệp lên
          </label>

          {receiptName ? (
            <p className={styles.formFilename}>{receiptName}</p>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Thắc mắc/Góp ý</label>
          <textarea className={styles.formFeedbackInput} id="formFeedback" />
        </div>

        {isLoading ? (
          <>
            <p>
              Hệ thống đang xử lý, vui lòng chờ trong ít nhất 15 giây {"<3"}
            </p>
            <p className={styles.formSubmitButton}>Đang đăng ký...</p>
          </>
        ) : (
          <button
            type="button"
            onClick={handleSubmitButton}
            className={styles.formSubmitButton}
          >
            Đăng ký
          </button>
        )}
        <p style={{ margin: "1rem 0" }}>
          Trong quá trình đăng ký, nếu xảy ra lỗi hệ thống, vui lòng chụp màn
          hình lỗi gửi về Zalo:{" "}
          <a
            href="href='https://zalo.me/0797324886"
            target="_blank"
            rel="noopener noreferrer"
          >
            0797324886
          </a>{" "}
          để được hỗ trợ nhanh nhất. Xin cảm ơn.
        </p>
      </form>
    </div>
  );
}

export default DrivingRegisterPage;
