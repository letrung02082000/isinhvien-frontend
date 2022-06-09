import React from 'react';
import Maintained from '../components/Maintained';
import TitleBar from '../components/TitleBar';

function MaintainPage() {
  return (
    <div>
      <TitleBar title='Đang phát triển' />
      <Maintained />
    </div>
  );
}

export default MaintainPage;
