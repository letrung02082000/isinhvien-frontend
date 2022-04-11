import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { MdArrowBack } from 'react-icons/md';
import styles from './titleBar.module.css';

function TitleBar(props) {
  const history = useHistory();
  const [bcolor, setBcolor] = useState(props.backgroundColor || '#019f91');

  console.log(bcolor);

  const goBack = () => {
    history.push(props.navigation || '/');
  };

  return (
    <div className={styles.titleBar} style={{ backgroundColor: bcolor }}>
      <button onClick={goBack} className={styles.goBackButton}>
        <MdArrowBack size={25} color='#fff' />
      </button>
      <p className={styles.pageTitle}>{props.title}</p>
    </div>
  );
}

export default TitleBar;
