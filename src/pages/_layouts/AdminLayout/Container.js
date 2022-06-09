import React, { useState } from 'react';
import styles from './container.module.css';
import { useHistory } from 'react-router-dom';
import { MdOutlineChevronRight } from 'react-icons/md';

function DrivingAdminLayout({ children, title, navigation, root }) {
  const [visible, setVisible] = useState(true);
  const history = useHistory();

  const navigateTo = (path) => {
    history.push(`${root}?navigation=${path}`);
  };

  return (
    <div className={styles.container}>
      {visible ? (
        <div className={styles.leftNav}>
          <h3 className={styles.pageTitle}>{title || 'Quản trị'}</h3>
          <div className={styles.navItems}>
            <div>
              {navigation?.map((child, index) => {
                return (
                  <div
                    className={styles.navItem}
                    key={index}
                    onClick={() => navigateTo(child.path)}
                  >
                    <p>{child.name}</p>
                  </div>
                );
              })}
              <div className={styles.navItem} onClick={() => setVisible(false)}>
                <p>Ẩn</p>
              </div>
            </div>

            <div className={styles.navItem}>
              <p>Đăng xuất</p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setVisible(true);
          }}
          className={styles.showButton}
        >
          <MdOutlineChevronRight size='25' />
        </button>
      )}
      <div className={styles.mainBoard}>{children}</div>
    </div>
  );
}

export default DrivingAdminLayout;
