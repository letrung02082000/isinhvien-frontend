import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TitleBar from '../components/TitleBar';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateCard } from '../store/userSlice';
import QrReader from 'modern-react-qr-reader';

import authHeader from '../utils/authHeader';
import BikeUserInfo from '../components/BicyclePage/BikeUserInfo';
import UploadCard from '../components/BicyclePage/UploadCard';
import styles from './allBicyclesPage.module.css';

function AllBicyclesPage() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const [bicycleList, setBicycleList] = useState([]);
  const [bikeUser, setBikeUser] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [scanned, setScanned] = useState(null);

  useEffect(() => {
    axios
      .get('/api/bike-user', authHeader())
      .then((res) => {
        if (res.data.data.length > 0) {
          let bikeUserInfo = res.data.data[0];
          bikeUserInfo.inTime = new Date(bikeUserInfo.inTime);

          if (bikeUserInfo.outTime == null) {
            bikeUserInfo.state = 0;
          } else {
            bikeUserInfo.state = 1;
            bikeUserInfo.outTime = new Date(bikeUserInfo.outTime);

            //calc total time used
            const totalTime =
              bikeUserInfo.outTime.getTime() - bikeUserInfo.inTime.getTime();
            const totalDates = Math.floor(totalTime / 1000 / 60 / 60 / 24);
            const totalHours = Math.floor(totalTime / 1000 / 60 / 60);
            const leftMinutes =
              Math.floor(totalTime / 1000 / 60) - 60 * totalHours;
            bikeUserInfo.totalHours = totalHours;
            bikeUserInfo.totalMinutes = leftMinutes;
            bikeUserInfo.totalDates = totalDates;

            //calc total price
            if (leftMinutes <= 15) {
              bikeUserInfo.totalPrice =
                bikeUserInfo.totalHours * bikeUserInfo.bike.hourPrice;
            } else {
              bikeUserInfo.totalPrice =
                (bikeUserInfo.totalHours + 1) * bikeUserInfo.bike.hourPrice;
            }

            if (bikeUserInfo.totalPrice > bikeUserInfo.bike.dayPrice) {
              const dayNum =
                bikeUserInfo.outTime.getDate() -
                bikeUserInfo.inTime.getDate() +
                1;

              bikeUserInfo.totalPrice = bikeUserInfo.bike.dayPrice * dayNum;
            }

            console.log(bikeUserInfo.totalPrice);
          }
          setBikeUser(bikeUserInfo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('/api/bike')
      .then((res) => {
        setBicycleList(res.data.data);
      })
      .catch((err) => alert(err.toString()));
  }, []);

  const handleBicycleButtonClick = (child) => {
    if (!child.isAvailable) {
      return;
    }

    history.push(`/bicycle?id=${child._id}`);
  };

  const handleReturnBikeButton = () => {
    setScanner(true);
  };

  const handleError = (error) => {
    console.log(error);
    alert(
      '???ng d???ng kh??ng c?? quy???n truy c???p camera. Vui l??ng c???p quy???n camera tr??n tr??nh duy???t c???a b???n. Ho???c li??n h???: 0797324886 ????? ???????c h??? tr??? nhanh nh???t.'
    );
    history.go(0);
  };

  const onNewScanResult = (data) => {
    if (data) {
      setScanner(false);
      setScanned(true);

      axios
        .patch('/api/bike-user', { bikeToken: data }, authHeader())
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.data);
            alert('B???n ???? tr??? xe th??nh c??ng!');
            history.go(0);
          }
        })
        .catch((err) => {
          alert(
            '???? c?? l???i x???y ra. Vui l??ng ch???p m??n h??nh l???i g???i v??? zalo: 0797324886 ????? ???????c h??? tr??? x??? l?? nhanh nh???t! L???i: ' +
              err.toString()
          );
        });
    }
  };

  return (
    <div className={styles.container}>
      <TitleBar title='Xe ?????p c??ng c???ng' />
      <img src='/bicyclebanner.jpg' alt='banner' width={'100%'} />
      {user.isLoggedIn ? (
        <div className={styles.cardContainer}>
          <BikeUserInfo />
          <UploadCard />
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <p>????ng nh???p ????? s??? d???ng t??nh n??ng n??y</p>
          <button
            onClick={() => history.push('/login')}
            className={styles.loginButton}
          >
            ????ng nh???p
          </button>
        </div>
      )}

      {scanner ? (
        <div className={styles.scanContainer}>
          <QrReader
            delay={100}
            style={{ borderRadius: '5px' }}
            onError={handleError}
            onScan={onNewScanResult}
            facingMode={'environment'}
            legacyMode={false}
          />
        </div>
      ) : (
        <div>
          {bikeUser ? (
            // 2022-03-30T07:09:03.830+00:00
            <div className={styles.bikeUserContainer}>
              <h5>Th??ng tin thu?? xe</h5>
              <p className={styles.bikeName}>{bikeUser?.bike.name}</p>
              <p>Ng??y thu??: {bikeUser?.inTime.toLocaleDateString('en-GB')}</p>
              <p>
                Thu?? v??o l??c: {bikeUser?.inTime.toLocaleTimeString('en-GB')}
              </p>
              <p>
                Tr??? v??o l??c:{' '}
                {bikeUser?.outTime
                  ? bikeUser?.outTime.toLocaleTimeString('en-GB')
                  : 'Ch??a c??'}
              </p>
              {bikeUser?.outTime ? (
                <p>
                  ???? d??ng: {bikeUser?.totalDates} ng??y {bikeUser?.totalHours}{' '}
                  gi??? {bikeUser?.totalMinutes} ph??t{' '}
                </p>
              ) : null}

              {bikeUser?.state == 0 ? (
                <p className={styles.bikeWaiting}>Ch??? tr??? xe</p>
              ) : (
                <p className={styles.bikeReturned}>???? tr??? xe</p>
              )}
              {bikeUser?.state == 0 ? (
                <button
                  onClick={handleReturnBikeButton}
                  className={styles.loginButton}
                >
                  Tr??? xe
                </button>
              ) : null}
              {bikeUser?.totalPrice ? (
                <p>T???ng c???ng: {bikeUser?.totalPrice} VN??</p>
              ) : null}
            </div>
          ) : (
            <div className={styles.bikeUserContainer}>
              <h5>Th??ng tin thu?? xe</h5>
              <p>Ch??a c?? th??ng tin thu?? xe</p>
            </div>
          )}
        </div>
      )}

      <div className={styles.bicycleContainer}>
        <h3 className={styles.header}>Ch???n xe c???a b???n</h3>
        <div className={styles.bicycleListContainer}>
          {bicycleList.map((child) => {
            return (
              <div
                key={child._id}
                className={styles.bicycleItem}
                onClick={() => handleBicycleButtonClick(child)}
                style={
                  child.isAvailable
                    ? null
                    : { color: '#ccc', borderColor: '#ccc' }
                }
              >
                <span>{child.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AllBicyclesPage;
