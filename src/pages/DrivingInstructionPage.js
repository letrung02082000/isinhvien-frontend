import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import TitleBar from '../components/TitleBar';

import styles from './drivingInstructionPage.module.css';

function DrivingInstructionPage(props) {
  const search = new URLSearchParams(props.location.search);
  const source = search.get('s');
  const history = useHistory();
  const [dateList, setDateList] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get('/api/driving/date?formVisible=true');
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
        alert('Chưa có danh sách ngày thi mới');
      }
    } catch (e) {
      alert('Lỗi: ' + e);
    }
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar title='Hướng dẫn dự thi' navigation='driving-test' />
      <div className={styles.topHeader}>
        <img
          src='/drivingbanner.jpg'
          rel='driving banner'
          className={styles.drivingBanner}
        />
        <div className={styles.introContainerTop}>
          <button
            className={styles.contactButtonTop}
            onClick={() => {
              if (source == 2) {
                history.push('/driving-registration?s=2');
              } else {
                history.push('/driving-registration');
              }
            }}
          >
            Đăng ký
          </button>

          <a
            className={styles.contactButtonTop}
            href='https://zalo.me/0886405887'
            target='_blank'
            rel='noreferer noreferrer'
          >
            Hỗ trợ
          </a>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3 className={styles.sectionTitle}>Xem nhanh</h3>
          <a className={styles.fastTitle} href='#address'>
            Địa điểm
          </a>
          <a className={styles.fastTitle} href='#fee'>
            Lệ phí thi
          </a>
          <a className={styles.fastTitle} href='#date'>
            Ngày thi
          </a>
          <a className={styles.fastTitle} href='#online'>
            Quy trình đăng ký online
          </a>
          <a className={styles.fastTitle} href='#offline'>
            Quy trình đăng ký trực tiếp
          </a>
          <a className={styles.fastTitle} href='#mocktest'>
            Tài liệu lý thuyết và thi thử thực hành
          </a>
          <a className={styles.fastTitle} href='#faq'>
            Các câu hỏi thường gặp
          </a>
          <a className={styles.fastTitle} href='#contact'>
            Liên hệ hỗ trợ
          </a>
        </div>
        <div className={styles.body}>
          <div id='address'>
            <h3 className={styles.sectionTitle}>Địa điểm dự thi</h3>
            <p>Trường đại học thể dục thể thao TP.HCM.</p>
            <p>
              Địa chỉ: Khu phố 6, phường Linh Trung, thành phố Thủ Đức, thành
              phố Hồ Chí Minh (làng đại học, cạnh nhà điều hành ĐHQG).
            </p>
          </div>
          <div id='fee'>
            <h3 className={styles.sectionTitle}>Lệ phí thi</h3>
            <p>
              <strong>Gói A:</strong> 600.000đ (giảm giá sinh viên còn
              550.000đ).
            </p>
            <p>
              Thí sinh tự chuẩn bị: 4 ảnh thẻ 3x4, giấy khám sức khỏe tại các
              bệnh viện tuyến huyện trở lên, 2 bản photo chứng minh nhân dân/căn
              cước công dân không cần công chứng. Đăng ký trực tiếp tại nhà
              khách ĐHQG, đóng lệ phí trực tiếp hoặc chuyển khoản.
            </p>
            <p>
              <strong>Gói B:</strong> 650.000đ (giảm giá sinh viên còn
              590.000đ).
            </p>
            <p>
              Trung tâm hỗ trợ làm hồ sơ và khám sức khỏe cùng ngày dự thi. Đăng
              ký hoàn toàn online, có thể đóng lệ phí trực tiếp hoặc chuyển
              khoản.
            </p>
          </div>
          <div id='date'>
            <h3 className={styles.sectionTitle}>Ngày thi</h3>
            <p>
              Thí sinh chọn ngày dự thi căn cứ theo lịch thi mỗi tháng như sau:
            </p>
            <ul>
              {dateList &&
                dateList.map((child) => {
                  return <li key={child._id}>{child.description}</li>;
                })}
            </ul>
          </div>
          <div id='online'>
            <h3 className={styles.sectionTitle}>Hướng dẫn đăng ký online</h3>
            <p>1. Hoàn thành mẫu đơn đăng ký online bao gồm:</p>
            <ul>
              <li>Họ tên đầy đủ, có dấu.</li>
              <li>Số điện thoại liên hệ của bạn.</li>
              <li>Ảnh chụp 2 mặt chứng minh nhân dân/Căn cước công dân.</li>
              <li>
                Ảnh chụp chân dung để làm hồ sơ và in trên bằng lái (ảnh tự chụp
                bằng điện thoại, không quá 3 tháng, không chụp ảnh thẻ): Tóc
                không quá trán, vén tóc ra sau mang tai, lấy đủ 2 vai, lấy từ
                thắt lưng trở lên qua đầu, không đeo kính, trang phục lịch sự,
                lấy nền tường. Vui lòng không sử dụng filter hay chỉnh sửa làm
                mất đặc điểm nhận dạng. Xem ảnh mẫu{' '}
                <a
                  href='https://i.imgur.com/pfjgD5m.jpg'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  tại đây.
                </a>
              </li>
            </ul>
            <p>2. Thanh toán lệ phí</p>
            <ul>
              <li>
                Thông tin chuyển khoản:
                <br />- Chủ tài khoản: Nguyễn Ngọc Huân
                <br />- Ngân hàng: MB Bank (Ngân hàng Quân đội)
                <br />- Số tài khoản: 0877876877
                <br />- Nội dung: Họ tên_SĐT_Bang A1
                <br />- Số tiền: 590.000 đồng
                <br />- Gửi lại ảnh chụp biên lai trong form đăng ký nếu đã
                chuyển khoản.
                <br />- Gửi lại ảnh chụp biên lai tại Zalo:{' '}
                <a
                  href='https://zalo.me/0886405887'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  0886.405.887
                </a>{' '}
                (Ms.Trang) nếu đóng sau khi đăng ký.
              </li>
              <li>
                Đóng trực tiếp: Tại nhà khách ĐHQG. Vui lòng 0383.270.434
                (Ms.Thư) để hẹn thời gian trước khi đến đóng lệ phí.
              </li>
              <li>Hoàn thành lệ phí thi trước ngày dự thi 14 ngày.</li>
            </ul>
            <p style={{ color: 'var(--primary)' }}>
              <strong>Cảnh báo:</strong> Thí sinh cảnh giác trước các hình thức
              mời chào làm hồ sơ tận nơi, giá rẻ hay mạo danh trung tâm yêu cầu
              chuyển tiền. Trung tâm không chịu trách nhiệm.
            </p>
            <p>3. Chờ duyệt hồ sơ:</p>
            <ul>
              <li>
                Sau khi đăng ký, trung tâm sẽ xác nhận lại trong vòng 1 ngày,
                mọi thủ tục cần hoàn tất trước ngày thi 14 ngày.
              </li>
              <li>
                Nếu không nhận được thông báo, vui lòng liên hệ di động/Zalo:{' '}
                <a
                  href='https://zalo.me/0886405887'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  0886.405.887
                </a>{' '}
                để được hỗ trợ.
              </li>
              <li>
                Khung giờ phản hồi: 6h30-7h30, 12h30-13h30, 16h30-17h00,
                22h30-23h00.
              </li>
            </ul>
            <p>4. Đi thi</p>
            <ul>
              <li>
                Trước ngày thi 10 ngày, trung tâm sẽ cập nhật thời gian và danh
                sách dự thi tại page:{' '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.facebook.com/daihocquocgia'
                >
                  www.facebook.com/daihocquocgia
                </a>
                . Thi sinh vui lòng theo dõi để cập nhật thông tin sớm nhất.
              </li>
              <li>
                Khi đi thi thí sinh cần mang theo chứng minh nhân dân hoặc căn
                cước công dân bản gốc để đối chiếu.
              </li>
            </ul>
          </div>
          <div id='offline'>
            <h3 className={styles.sectionTitle}>Hướng dẫn đăng ký trực tiếp</h3>
            <p>
              Địa điểm: Tại nhà khách ĐHQG. Vui lòng gọi 0383.270.434 (Ms.Thư)
              để hẹn thời gian trước khi đến đăng ký (giờ hành chính).
            </p>
          </div>
          <div id='mocktest'>
            <h3 className={styles.sectionTitle}>
              {'Thi thử thực hành & Tài liệu lý thuyết'}
            </h3>
            <p>Thực hành:</p>
            <ul>
              <li>Trước 6h30 đối với ngày thi sáng.</li>
              <li>11h30 - 12h30 đối với ngày thi chiều.</li>
              <li>Ngày thi thử: cùng ngày với lịch thi chính thức.</li>
            </ul>
            <p>
              Lý thuyết: Thí sinh tải tài liệu học lý thuyết{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://drive.google.com/drive/folders/19vo_poKKXdz-tP_ZIgKdGFOwNNYMCxHZ'
              >
                tại đây.
              </a>
            </p>
          </div>
        </div>

        <div id='faq'>
          <h3 className={styles.sectionTitle}>Các câu hỏi thường gặp</h3>
          <dl className={styles.faqContainer}>
            <dt>Hỏi: Thời gian nhận bằng là bao lâu?</dt>
            <dd>
              Trả lời: 22 ngày làm việc kể từ ngày thi đậu, không bao gồm thứ 7,
              chủ nhật và ngày lễ.
            </dd>
            <dt>Hỏi: Học phí thanh toán ở đâu?</dt>
            <dd>
              Trả lời: Thanh toán online hoặc trực tiếp tại nhà khách ĐHQG.
            </dd>
            <dt>Hỏi: Có được lái thử trước khi thi không?</dt>
            <dd>
              Trả lời: Được lái thử với xe của trung tâm với phí 10k/vòng, địa
              điểm và thời gian được nêu ở trên.
            </dd>
            <dt>Hỏi: Mình muốn tập vòng số 8 có thể tập ở đâu?</dt>
            <dd>
              Trả lời: Cổng sau Trung tâm quốc phòng ĐHQG (miễn phí, bên ngoài,
              không vào trong trung tâm).
            </dd>

            <dt>Hỏi: Điểm đậu lý thuyết là bao nhiêu?</dt>
            <dd>Trả lời: 21/25 câu hỏi và không được sai câu điểm liệt.</dd>
          </dl>
        </div>
        <div className={styles.footer}>
          <p id='contact'>
            Để được hỗ trợ thêm, vui lòng liên hệ di động/Zalo:{' '}
            <a
              href='https://zalo.me/0886405887'
              target='_blank'
              rel='noopener noreferrer'
            >
              0886.405.887 (Ms. Trang)
            </a>{' '}
            hoặc{' '}
            <a
              href='https://zalo.me/0797324886'
              target='_blank'
              rel='noopener noreferrer'
            >
              0797.324.886 (Mr. Trung)
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DrivingInstructionPage;
