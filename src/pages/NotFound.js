import React from 'react';
import TitleBar from '../components/TitleBar';
import MainLayout from '../layouts/MainLayout';

const NotFound = () => {
  return (
    <div>
      <TitleBar title='Lỗi' />
      <div
        style={{
          textAlign: 'center',
          minHeight: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Xin lỗi, không tìm thấy trang này</p>
      </div>
    </div>
  );
};

export default NotFound;
