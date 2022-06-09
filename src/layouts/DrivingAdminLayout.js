import React, { useState } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import styles from './drivingAdminLayout.module.css';

//redux
import { selectDrivingData } from '../store/drivingAdminSlice';
import { useSelector } from 'react-redux';

function DrivingAdminLayout({ children, onNavigate, onLogout }) {
  const [visible, setVisible] = useState(true);
  const data = useSelector(selectDrivingData);

  const exportToCSV = (csvData, fileName) => {
    csvData = csvData.map((child, index) => {
      let NgayThi = new Date(child.date);
      NgayThi = NgayThi.toLocaleDateString();

      const PhuongThucThanhToan =
        child.paymentMethod === 0 ? 'Trực tiếp' : 'Chuyển khoản';

      let TrangThai = '';
      if (child.processState == 0) {
        TrangThai = 'Đã tạo';
      } else if (child.processState == 1) {
        TrangThai = 'Chờ cập nhật thông tin';
      } else if (child.processState == 2) {
        TrangThai = 'Chờ thanh toán';
      } else if (child.processState == 3) {
        TrangThai = 'Đã hoàn tất';
      } else if (child.processState == 4) {
        TrangThai = 'Đã hủy';
      }

      return {
        STT: index + 1,
        HoTen: child.name,
        NgayThi,
        SoDienThoai: child.tel,
        Zalo: child.zalo,
        ChanDung: `https://drive.google.com/file/d/${child.portraitId}/view`,
        MatTruoc: `https://drive.google.com/file/d/${child.frontsideId}/view`,
        MatSau: `https://drive.google.com/file/d/${child.backsideId}/view`,
        BienLai: `https://drive.google.com/file/d/${child.receiptId}/view`,
        PhuongThucThanhToan,
        TrangThai,
      };
    });
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div className={styles.container}>
      {visible ? (
        <div className={styles.leftNav}>
          <h3 className={styles.pageTitle}>
            Quản lý
            <br />
            hồ sơ lái xe
          </h3>
          <div className={styles.navItems}>
            <div>
              <div className={styles.navItem} onClick={() => onNavigate('/a1')}>
                <p>Quản lý hồ sơ A1</p>
              </div>
              <div className={styles.navItem} onClick={() => onNavigate('/a2')}>
                <p>Quản lý hồ sơ A2</p>
              </div>
              <div className={styles.navItem} onClick={() => onNavigate('/b2')}>
                <p>Quản lý hồ sơ B2</p>
              </div>
              <div
                className={styles.navItem}
                onClick={() => onNavigate('/date')}
              >
                <p>Quản lý ngày thi</p>
              </div>
              <div
                className={styles.navItem}
                onClick={() => exportToCSV(data, 'data')}
              >
                <p>Tạo File Excel</p>
              </div>
              <div className={styles.navItem} onClick={() => setVisible(false)}>
                <p>Ẩn</p>
              </div>
            </div>
            <div className={styles.navItem} onClick={() => onLogout()}>
              <p>Đăng xuất</p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          Hiện
        </button>
      )}
      <div className={styles.mainBoard}>{children}</div>
    </div>
  );
}

export default DrivingAdminLayout;
