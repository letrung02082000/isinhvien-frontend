import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  updateTel,
  updateZalo,
  updateName,
} from '../../store/userSlice';
import axios from 'axios';
import styles from '../../pages/swimmingPoolTicketPage.module.css';
import { MdOutlineContentCopy } from 'react-icons/md';

export default function TicketForm(props) {
  const dispatch = useDispatch();
  let userInfo = useSelector(selectUser);

  const history = useHistory();

  const [receiptName, setReceiptName] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [isPaid, setIsPaid] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  const imageExtensions = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
  ];

  const handleTicketSubmitButton = (e) => {
    setIsLoading(true);

    const formData = new FormData();

    const fullname = document.getElementById('formName').value;
    const tel = document.getElementById('formTel').value;
    const zalo = document.getElementById('formZalo').value;
    const feedback = document.getElementById('formFeedback').value;
    const paidState = isPaid == 0;

    if (!fullname || !tel || !zalo) {
      setIsLoading(false);
      return alert(
        'Vui lòng nhập đầy đủ các trường Họ tên, số điện thoại và zalo!'
      );
    }

    formData.append('name', fullname);
    formData.append('tel', tel);
    formData.append('zalo', zalo);
    formData.append('receipt', receiptFile);
    formData.append('isPaid', paidState);
    formData.append('paymentMethod', paymentMethod);
    formData.append('feedback', feedback);

    axios({
      method: 'post',
      url: '/api/pool/ticket-user',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setOrder(res.data.data);
          console.log(res.data.data);
        } else {
          alert('Lỗi: ' + res.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Lỗi: ' + error);
        setIsLoading(false);
      });
  };

  const handleIsPaidChange = (value) => {
    setIsPaid(value);
  };

  const uploadReceipt = (e) => {
    if (imageExtensions.includes(e.target.files[0].type)) {
      setReceiptFile(e.target.files[0]);
      setReceiptName(e.target.files[0].name);
    } else {
      setReceiptName('Lỗi: Tệp tải lên không phải là tệp hình ảnh');
    }
  };

  const handleNameChange = (e) => {
    dispatch(updateName(e.target.value));
  };

  const handleTelChange = (e) => {
    dispatch(updateTel(e.target.value));
  };

  const handleZaloChange = (e) => {
    dispatch(updateZalo(e.target.value));
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const downloadQR = () => {
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    console.log('pngUrl', pngUrl);
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'isinhvien-ticket-qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(order.orderCode);
    setCopied(true);
  };

  return (
    <>
      {order ? (
        <div>
          <div className={styles.qrContainer}>
            <p style={{ margin: '1rem 0', textAlign: 'center' }}>
              Đăng ký thành công &#127881; &#127881; &#127881;
              <br /> Đơn hàng sẽ được xử lý và thông báo đến bạn qua Zalo
            </p>
            <p style={{ margin: '1rem 0' }}>
              Mã vé: {order.orderCode}{' '}
              <button
                onClick={handleCopy}
                style={{
                  margin: '0 1rem',
                  padding: '0.1rem',
                  backgroundColor: 'transparent',
                }}
              >
                {copied ? 'Đã chép' : <MdOutlineContentCopy />}
              </button>
            </p>
            <QRCode
              id='qrcode'
              value={order.orderCode}
              size={290}
              level={'H'}
              includeMargin={true}
              //   imageSettings={{
              //     src: 'https://i.imgur.com/wG3nKXR.jpg?1',
              //     excavate: true,
              //   }}
              style={{
                borderRadius: '5px',
                border: '1px solid rgb(27, 183, 110)',
              }}
            />
            <a
              onClick={downloadQR}
              style={{
                cursor: 'pointer',
                backgroundColor: '#fff',
                padding: '0.5rem 1rem',
                margin: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            >
              Lưu vé về máy
            </a>
          </div>
        </div>
      ) : (
        <form style={props.display === false ? { display: 'none' } : null}>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            <li>
              <strong>Giá vé: 500.000 đồng / 30 lượt / 2 tháng</strong>
              <br />+ Tặng thêm 1 lượt bơi miễn phí
            </li>
            <li>
              <strong>Thông tin chuyển khoản:</strong>
              <br />
              + Chủ tài khoản: Nguyễn Thị Hà
              <br />+ Ngân hàng: BIDV chi nhánh Đông Sài Gòn (Ngân hàng Thương
              mại cổ phần Đầu tư và Phát triển Việt Nam)
              <br />+ Số tài khoản: 31410002006579
              <br />+ Nội dung: Họ tên_SĐT_Ve Thang
              <br />+ Số tiền: 500.000 đồng
              <br />+ Gửi lại ảnh chụp biên lai trong form đăng ký nếu đã chuyển
              khoản.
              <br />+ Gửi lại ảnh chụp biên lai tại Zalo:{' '}
              <a
                href='https://zalo.me/0877876877'
                target='_blank'
                rel='noopener noreferrer'
              >
                0877.876.877
              </a>{' '}
              nếu đóng sau khi đăng ký.
            </li>
          </ul>

          <p style={{ margin: 0, color: ' #ff0000 ' }}>* bắt buộc</p>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tên của bạn*</label>
            <input
              className={styles.formInput}
              id='formName'
              type='text'
              placeholder='Nhập họ tên đầy đủ, có dấu'
              required
              value={userInfo.data.name}
              onChange={handleNameChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Số điện thoại liên hệ*</label>
            <input
              className={styles.formInput}
              id='formTel'
              type='text'
              placeholder='Nhập số điện thoại của bạn'
              required
              value={userInfo.data.tel}
              onChange={handleTelChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Số điện thoại Zalo*</label>
            <input
              className={styles.formInput}
              id='formZalo'
              type='text'
              placeholder='Nhập số điện thoại Zalo của bạn'
              required
              value={userInfo.data.zalo}
              onChange={handleZaloChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Hình thức đóng lệ phí*</label>
            <div className={styles.selectContainer}>
              <input
                className={styles.formInput}
                type='radio'
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
                type='radio'
                onChange={() => handlePaymentMethodChange(1)}
                checked={paymentMethod === 1}
              />
              <p onClick={() => handlePaymentMethodChange(1)}>
                Chuyển khoản ngân hàng
              </p>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Bạn đã đóng lệ phí chưa?*
            </label>
            <div className={styles.selectContainer}>
              <input
                className={styles.formInput}
                type='radio'
                onChange={() => handleIsPaidChange(0)}
                checked={isPaid == 0}
              />
              <p onClick={() => handleIsPaidChange(0)}>Đã thanh toán</p>
            </div>

            <div className={styles.selectContainer}>
              <input
                className={styles.formInput}
                type='radio'
                onChange={() => handleIsPaidChange(1)}
                checked={isPaid == 1}
              />
              <p onClick={() => handleIsPaidChange(1)}>
                Mình sẽ đóng lệ phí sau
              </p>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Ảnh chụp biên lai (nếu đã đóng lệ phí)
            </label>
            <label className={styles.formUploadButton}>
              <input
                className={styles.formInput}
                type='file'
                accept='image/*'
                id='receipt'
                name='receipt'
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
            <textarea className={styles.formFeedbackInput} id='formFeedback' />
          </div>

          {isLoading ? (
            <>
              <p>
                Hệ thống đang xử lý, vui lòng chờ trong ít nhất 15 giây {'<3'}
              </p>
              <p className={styles.formSubmitButton}>Đang đăng ký...</p>
            </>
          ) : (
            <button
              type='button'
              onClick={handleTicketSubmitButton}
              className={styles.formSubmitButton}
            >
              Đăng ký
            </button>
          )}
          <p style={{ margin: '1rem 0' }}>
            Trong quá trình đăng ký, nếu xảy ra lỗi hệ thống, vui lòng chụp màn
            hình lỗi gửi về Zalo:{' '}
            <a
              href="href='https://zalo.me/0797324886"
              target='_blank'
              rel='noopener noreferrer'
            >
              0797324886
            </a>{' '}
            để được hỗ trợ nhanh nhất. Xin cảm ơn.
          </p>
        </form>
      )}
    </>
  );
}
