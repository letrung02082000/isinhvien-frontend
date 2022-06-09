import React from 'react';
import styles from './footer.module.css';

function Footer() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Đối tác</p>
      <div className={styles.goldenSponsorContainer}>
        <img
          src='/sponsor/ipsc.png'
          alt='ipsc'
          className={styles.sponsorIcon}
        />
        <p>Trung tâm dịch vụ và xúc tiến đầu tư ĐHQG-HCM</p>
      </div>

      <div className={styles.sponsorsContainer}>
        <div className={styles.sponsorsContainer}>
          <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/thoidai.jpg'
              alt='apsc'
              className={styles.sponsorIcon}
            />
            <p>
              Trung tâm in ấn
              <br />
              Thời Đại
            </p>
          </div>
          <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/saigonpt.png'
              alt='apsc'
              className={styles.sponsorIcon}
            />
            <p>
              Công ty TNHH
              <br />
              Saigon Public Transport
            </p>
          </div>
          <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/igen.png'
              alt='igen'
              className={styles.sponsorIcon}
            />
            <p>iGen Group</p>
          </div>
          <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/uelspace.png'
              alt='apsc'
              className={styles.sponsorIcon}
            />
            <p>UEL Space</p>
          </div>

          <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/langf.png'
              alt='apsc'
              className={styles.sponsorIcon}
            />
            <p>Cẩm nang làng đại học</p>
          </div>
          <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/tnsv.png'
              alt='apsc'
              className={styles.sponsorIcon}
            />
            <p>Thiện nguyện sinh viên</p>
          </div>
          <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/hqsv.png'
              alt='apsc'
              className={styles.sponsorIcon}
            />
            <p>Hội quán sinh viên</p>
          </div>
          {/* <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/taman.jpg'
              alt='apsc'
              className={styles.sponsorIcon}
            />
            <p>
              Thực phẩm chay
              <br />
              Tâm An
            </p>
          </div> */}
          <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/hafu.jpg'
              alt='apsc'
              className={styles.sponsorIcon}
            />
            <p>Đồng phục HaFu</p>
          </div>
          {/* <div className={styles.sponsorContainer}>
            <img
              src='/sponsor/woori.png'
              alt='apsc'
              className={styles.sponsorIcon}
            />
            <p>Woori Coffee</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
