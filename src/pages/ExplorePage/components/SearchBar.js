import React, { useState } from 'react';

import { BiSearch } from 'react-icons/bi';

import styles from './explore.module.css';
function SearchBar({ placeholder, onChange, focusText, onKeyPress, value }) {
  const [placeholderText, setPlaceholderText] = useState(placeholder);

  const handleFocus = () => {
    if (focusText) {
      setPlaceholderText(focusText);
    }
  };
  return (
    <div className={styles.searchInput}>
      <div className={styles.searchIcon}>
        <BiSearch size={25} />
      </div>
      <div className={styles.searchBox}>
        <form>
          <input
            style={{ fontSize: '1rem' }}
            type='text'
            placeholder={placeholderText || 'Tìm kiếm'}
            onChange={onChange}
            onKeyPress={onKeyPress || null}
            onFocus={handleFocus}
            value={value}
          />
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
