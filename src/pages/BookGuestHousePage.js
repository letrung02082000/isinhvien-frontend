import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import styles from './bookGuestHousePage.module.css';
import { MdArrowBack } from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
//redux
import { useDispatch } from 'react-redux';
import { updateShow } from '../store/navSlice';

function BookGuestHousePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch(updateShow(false));

  const [roomType, setRoomType] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [rentType, setRentType] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [displayRooms, setDisplayRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [endOfRoomList, setEndOfRoomList] = useState(true);
  const displayRoomNumber = 9;

  useEffect(() => {
    axios
      .get('/api/guest-house/query', { params: { type: roomType } })
      .then((response) => {
        let data = response.data.data;
        setRooms(data);
        setDisplayRooms(data.slice(0, displayRoomNumber));

        for (let index = 0; index < data.length; index++) {
          if (data[index].state === 0) {
            setSelectedRoom(data[index]._id);
            break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [roomType]);

  useEffect(() => {
    setEndOfRoomList(displayRooms.length >= rooms.length);
  }, [displayRooms, rooms]);

  const getBill = () => {
    let tmpDate = new Date();

    if (startDate === 1) {
      tmpDate.setDate(tmpDate.getDate() + 1);
    }

    const guestHouseUser = {
      guestHouse: selectedRoom,
      rentType,
      duration: 1,
      startDate: tmpDate,
    };

    history.push('/guest-house-bill', guestHouseUser);
  };

  const selectRoomType = (option) => {
    setRoomType(option);
  };

  const selectStartDate = (option) => {
    setStartDate(option);
  };

  const selectRentType = (option) => {
    setRentType(option);
  };

  const selectRoom = (info) => {
    if (info.state === 0) setSelectedRoom(info._id);
  };

  const loadMoreRooms = () => {
    if (displayRooms.length < rooms.length) {
      setDisplayRooms(rooms.slice(0, displayRoomNumber + displayRooms.length));
    }
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.titleBar}>
          <button onClick={goBack} className={styles.goBackButton}>
            <MdArrowBack size={25} color='#fff' />
          </button>
          <p className={styles.pageTitle}>?????t ph??ng nh?? kh??ch</p>
        </div>
        <div className={styles.roomTypeContainer}>
          <p className={styles.roomTypeTitle}>Lo???i ph??ng</p>
          <div className={styles.roomTypeOption}>
            <div
              className={roomType === 0 ? styles.roomTypeOptionSelected : null}
              onClick={() => selectRoomType(0)}
            >
              <p>Ph??ng ????n</p>
            </div>
            <div
              className={roomType === 1 ? styles.roomTypeOptionSelected : null}
              onClick={() => selectRoomType(1)}
            >
              <p>Ph??ng ????i</p>
            </div>
            <div
              className={roomType === 2 ? styles.roomTypeOptionSelected : null}
              onClick={() => selectRoomType(2)}
            >
              <p>Ph??ng ????i ??i???u ho??</p>
            </div>
          </div>
        </div>
        <div className={styles.startDateContainer}>
          <p className={styles.startDateTitle}>Ng??y v??o</p>
          <div className={styles.startDateOption}>
            <div
              className={
                startDate === 0 ? styles.startDateOptionSelected : null
              }
              onClick={() => selectStartDate(0)}
            >
              <p>H??m nay</p>
            </div>
            <div
              className={
                startDate === 1 ? styles.startDateOptionSelected : null
              }
              onClick={() => selectStartDate(1)}
            >
              <p>Ng??y mai</p>
            </div>
          </div>
        </div>
        <div className={styles.startDateContainer}>
          <p className={styles.startDateTitle}>H??nh th???c thu??</p>
          <div className={styles.startDateOption}>
            <div
              className={rentType === 0 ? styles.startDateOptionSelected : null}
              onClick={() => selectRentType(0)}
            >
              <p>Theo ng??y</p>
            </div>
            <div
              className={rentType === 1 ? styles.startDateOptionSelected : null}
              onClick={() => selectRentType(1)}
            >
              <p>Theo th??ng</p>
            </div>
          </div>
        </div>
        {/* <div className={styles.startDateContainer}>
          <p>Kho???ng th???i gian</p>
          <div></div>
        </div> */}
        <div className={styles.roomContainer}>
          <p className={styles.roomTitle}>Ch???n ph??ng</p>
          <div className={classNames(styles.roomOptions)}>
            {displayRooms.map((child, index) => {
              return (
                <div
                  onClick={() => selectRoom(child)}
                  key={child._id}
                  className={classNames({
                    [styles.roomOption]: true,
                    [styles.roomBooked]: child.state === 2 || child.state === 1,
                    [styles.selectedRoom]: child._id === selectedRoom,
                  })}
                >
                  <p>{child.name}</p>
                  <p>{child.state === 0 ? 'c??n tr???ng' : null}</p>
                  <p>{child.state === 1 ? '???? ?????t' : null}</p>
                  <p>{child.state === 2 ? '??ang thu??' : null}</p>
                </div>
              );
            })}
          </div>
          {endOfRoomList ? null : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={loadMoreRooms} className={styles.loadMoreButton}>
                <IoIosArrowDown />
                <span>T???i th??m </span>
              </button>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button className={styles.getBillButton} onClick={getBill}>
            <span>Xem ho?? ????n</span>
            <IoIosArrowForward size={15} />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default BookGuestHousePage;
