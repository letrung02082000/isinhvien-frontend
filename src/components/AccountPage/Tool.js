import React from 'react';
import {FiChevronRight} from 'react-icons/fi'
import styles from './accountPage.module.css';
function Tool(props) {
  return (
    <div className={styles.general+' '+ styles.tool} onClick={props.handle} >
        <span>{props.title}</span>
        <FiChevronRight style={{float:'right'}}/>
    </div>
  );
}

export default Tool;
