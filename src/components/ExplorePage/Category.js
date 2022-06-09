import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './explore.module.css';
function Category(props) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/coupon-list?type=${props.type}`);
  };

  return (
    <div className={styles.category} onClick={handleClick}>
      <props.icon
        size={41}
        style={{
          color: 'var(--primary)',
          padding: '0.25rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: 'white',
        }}
      />
      <span>{props.name}</span>
    </div>
  );
}

export default Category;
