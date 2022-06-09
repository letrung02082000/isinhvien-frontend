import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './accountItem.module.css';
import { IoIosArrowForward } from 'react-icons/io';

function AccountItem(props) {
  const history = useHistory();
  const navigateTo = () => history.push(props.route);

  return (
    <div className={styles.container} onClick={navigateTo}>
      <span>{props.children}</span> <IoIosArrowForward size={25} />
    </div>
  );
}

export default AccountItem;
