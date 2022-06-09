import React from 'react';

import styles from './accountPage.module.css';
function AccountHistory() {
    const data= {
        'Hồ bơi':10,
        'Nhà khách':0,
        'In ấn':0,
        'Nhà sàn':0,
    }
  return (
    <div className={`row text-center ${styles.general}`} style={{margin:'0'}}>
        <h4>Lịch sử hoạt động</h4>
        {
            Object.keys(data).map((key,index)=>{
                return (
                    <div className='col-3'>
                        <h6>{data[key]}</h6>{key}
                    </div>
                )
            })
        }
    </div>
  );
}

export default AccountHistory;
