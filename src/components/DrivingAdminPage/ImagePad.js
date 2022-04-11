import React from 'react';
import styles from './imagePad.module.css';

function ImagePad({ image, onClose }) {
  return (
    <div className={styles.imageContainer}>
      {image ? (
        <>
          <img src={image} alt='img' />
          <button onClick={() => onClose()} style={{ padding: '0  1rem' }}>
            X
          </button>
        </>
      ) : null}
    </div>
  );
}

export default ImagePad;
