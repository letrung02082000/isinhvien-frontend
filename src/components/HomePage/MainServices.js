import React from 'react';
import { useHistory } from 'react-router-dom';
import { IoShirtOutline } from 'react-icons/io5';
import { IoMdPrint } from 'react-icons/io';
import { AiOutlineArrowRight } from 'react-icons/ai';
import {
  FaBusAlt,
  FaMotorcycle,
  FaPrint,
  FaSwimmingPool,
  FaHome,
} from 'react-icons/fa';

import styles from './mainservices.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';

function MainServices(props) {
  const history = useHistory();
  // const isMobile = useMediaQuery('(max-width: 767px)');
  const user = useSelector(selectUser);

  const handleBuyTicketButton = () => {
    if (!user.isLoggedIn) {
      navigateTo('/login', { message: 'Vui lòng đăng nhập để tiếp tục!' });
    } else {
      navigateTo('/pool-ticket');
    }
  };

  const navigateTo = (url, state) => {
    history.push(url, state);
  };

  return (
    <div className={styles.itemsContainer}>
      <div
        className={styles.itemContainer}
        onClick={() => navigateTo('/pool-ticket')}
      >
        <div>
          {/* <FaSwimmingPool size={40} style={{ color: 'white' }} /> */}
          <img
            src='/main-icon/pool2.png'
            alt='pool'
            className={styles.mainIcon}
          />
        </div>
        <p>
          Dịch vụ
          <br />
          hồ bơi
        </p>
      </div>
      <div
        className={styles.itemContainer}
        onClick={() => navigateTo('/driving-test')}
      >
        <div>
          {/* <FaMotorcycle size={40} className={styles.mainIcon} /> */}
          <img
            src='/main-icon/motobike.png'
            alt='pool'
            className={styles.mainIcon}
          />
        </div>
        <p>Thi sát hạch lái xe</p>
      </div>
      <div className={styles.itemContainer} onClick={() => navigateTo('/jobs')}>
        <div>
          {/* <AiOutlineArrowRight size={40} style={{ color: 'white' }} /> */}
          <img
            src='/main-icon/job2.png'
            alt='pool'
            className={styles.mainIcon}
          />
        </div>
        <p>
          Việc làm <br /> sinh viên
        </p>
      </div>
      <div
        className={styles.itemContainer}
        onClick={() => navigateTo('/photocopies')}
      >
        <div>
          {/* <IoMdPrint size={40} style={{ color: 'white' }} /> */}
          <img
            src='/main-icon/photocopy2.png'
            alt='pool'
            className={styles.mainIcon}
          />
        </div>
        <p>Gửi in ấn</p>
      </div>
      <div
        className={styles.itemContainer}
        onClick={() => navigateTo('/bicycles')}
      >
        <div>
          {/* <FaHome size={40} style={{ color: 'white' }} /> */}
          <img
            src='/main-icon/bicycle.jpeg'
            alt='bicycle'
            className={styles.mainIcon}
          />
        </div>
        <p>
          Xe đạp
          <br />
          công cộng
        </p>
      </div>
      <div
        className={styles.itemContainer}
        onClick={() => navigateTo('/uniforms')}
      >
        <div>
          {/* <IoShirtOutline size={40} style={{ color: 'white' }} /> */}
          <img
            src='/main-icon/uniform2.png'
            alt='pool'
            className={styles.mainIcon}
          />
        </div>
        <p>Đặt đồng phục</p>
      </div>

      <div
        className={styles.itemContainer}
        onClick={() => navigateTo('/maintain')}
      >
        <div>
          {/* <AiOutlineArrowRight size={40} style={{ color: 'white' }} /> */}
          <img
            src='/main-icon/health2.png'
            alt='pool'
            className={styles.mainIcon}
          />
        </div>
        <p>
          Sức khỏe <br /> sinh viên
        </p>
      </div>

      <div
        className={styles.itemContainer}
        onClick={() => navigateTo('/maintain')}
      >
        <div>
          {/* <AiOutlineArrowRight size={40} style={{ color: 'white' }} /> */}
          <img
            src='/main-icon/course.jpg'
            alt='pool'
            className={styles.mainIcon}
          />
        </div>
        <p>Khóa học</p>
      </div>

      <div
        className={styles.itemContainer}
        onClick={() => navigateTo('/maintain')}
      >
        <div>
          {/* <AiOutlineArrowRight size={40} style={{ color: 'white' }} /> */}
          <img
            src='/main-icon/volunteer.jpg'
            alt='pool'
            className={styles.mainIcon}
          />
        </div>
        <p>Thiện nguyện</p>
      </div>
    </div>
  );
}

export default MainServices;
