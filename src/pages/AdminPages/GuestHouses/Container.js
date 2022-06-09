import React from 'react';
import { TitleBar } from '../../_commons';
import { AdminLayout } from '../../_layouts';
import {
  Creation,
  Category,
  AllRooms,
  FixReport,
  Registration,
} from './components';

function Container(props) {
  const query = new URLSearchParams(props.location.search);
  const navigation = query.get('navigation');

  return (
    <AdminLayout
      title='Quản trị nhà khách'
      root="guest-house-admin"
      navigation={[
        { name: 'Quản lý phòng', path: 'rooms' },
        { name: 'Tạo phòng', path: 'creation' },
        { name: 'Quản lý đăng ký', path: 'users' },
        { name: 'Báo hỏng', path: 'reports' },
        { name: 'Quản lý loại phòng', path: 'categories' },
      ]}
    >
      {navigation === 'rooms' ? <AllRooms /> : null}
      {navigation === 'creation' ? <Creation /> : null}
      {navigation === 'categories' ? <Category /> : null}
      {navigation === 'users' ? <Registration /> : null}
      {navigation === 'reports' ? <FixReport /> : null}
    </AdminLayout>
  );
}

export default Container;
