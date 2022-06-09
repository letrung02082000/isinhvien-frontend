import React from 'react';

const Loading = (props) => (
  <>
    <img alt='Loading' src='/loading.gif' style={{ width: '100%' }} />
    <p style={{ backgroundColor: '#F5F5FA', textAlign: 'center' }}>
      {props.message || 'Đang tải dữ liệu...'}
    </p>
  </>
);

export default Loading;
