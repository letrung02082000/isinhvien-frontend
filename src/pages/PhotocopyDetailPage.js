import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TitleBar from '../components/TitleBar';
import styles from './photocopyDetailPage.module.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  updateName,
  updateTel,
  updateZalo,
} from '../store/userSlice';

function PhotocopyDetail(props) {
  const query = new URLSearchParams(props.location.search);
  const id = query.get('id');
  const [data, setData] = useState(null);
  const [documentFile, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [documentSize, setDocumentSize] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptName, setReceiptName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get(`/api/photocopy/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => alert(err.toString()));
  }, []);

  useEffect(() => {
    if (documentFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('drive', data.drive);
      formData.append('document', documentFile);

      axios
        .post('/api/photocopy-user/upload', formData, {
          onUploadProgress: (progressEvent) => {
            const percent = parseInt(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadPercent(percent / 2);

            if (percent == 100) {
              setTimeout(() => {
                setUploadPercent(75);
              }, 1500);
            }
          },
        })
        .then((res) => {
          setDocumentId(res.data.data.documentId);
          setUploadPercent(100);
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
          alert(err.toString());
        });
    }
  }, [documentFile]);

  const uploadDocument = (e) => {
    const file = e.target.files[0];
    setDocumentSize(file.size);

    if (file.size > 16e6) {
      return setDocumentName(
        'Kh??ng th??? t???i l??n t???p c?? k??ch th?????c l???n h??n 15 MB. Vui l??ng g???i t??i li???u b???ng Link ho???c g???i th??nh nhi???u l???n'
      );
    }

    setDocument(file);
    setDocumentName(file.name);
  };

  const uploadReceipt = (e) => {
    const imageExtensions = [
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/webp',
    ];

    if (imageExtensions.includes(e.target.files[0].type)) {
      setReceiptFile(e.target.files[0]);
      setReceiptName(e.target.files[0].name);
    } else {
      setReceiptName('L???i: T???p t???i l??n kh??ng ph???i l?? t???p h??nh ???nh');
    }
  };

  const handleNameChange = (e) => {
    dispatch(updateName(e.target.value));
  };

  const handleTelChange = (e) => {
    dispatch(updateTel(e.target.value));
  };

  const handleZaloChange = (e) => {
    dispatch(updateZalo(e.target.value));
  };

  const handleSubmitButton = () => {
    const formNote = document.getElementById('formNote').value;
    console.log(formNote);
    const formAddress = document.getElementById('formAddress').value;
    const formDocumentLink = document.getElementById('formDocumentLink').value;
    console.log(user.name);
    if (!user.data.name) {
      return alert('Vui l??ng nh???p t??n c???a b???n');
    }

    if (!user.data.tel) {
      return alert('Vui l??ng nh???p s??? ??i???n tho???i li??n h??? c???a b???n');
    }

    if (!formNote) {
      return alert('Vui l??ng nh???p h?????ng d???n in cho nh??n vi??n');
    }

    if (formDocumentLink || documentId) {
      setIsLoading(true);
      let formData = new FormData();
      formData.append('name', user.data.name);
      formData.append('tel', user.data.tel);
      formData.append('zalo', user.data.zalo || '');
      formData.append('address', formAddress);
      formData.append('note', formNote);
      formData.append('photocopyInfo', id);
      formData.append('documentId', documentId);
      formData.append('receipt', receiptFile);
      formData.append('drive', data.drive);

      if (documentId) {
        const documentLink = `https://drive.google.com/file/d/${documentId}`;
        formData.append('documentLink', documentLink);
      } else {
        formData.append('documentLink', formDocumentLink);
      }

      axios
        .post('/api/photocopy-user/add', formData)
        .then((res) => {
          setIsLoading(false);
          alert('B???n ???? g???i t??i li???u th??nh c??ng!');
        })
        .catch((err) => {
          alert(
            'L???i: ' +
              err.toString() +
              '. Li??n h??? admin t???i zalo: 0797324886 ????? ???????c h??? tr??? nhanh nh???t. Xin c???m ??n!'
          );
          setIsLoading(false);
        });
    } else {
      alert('Vui l??ng t???i l??n t???p ho???c ????nh k??m li??n k???t t??i li???u!');
    }
  };

  return (
    <div>
      <TitleBar title='Th??ng tin in ???n' navigation='/photocopies' />

      <form className={styles.formContainer}>
        <div className={styles.uploadContainer}>
          <div className={styles.formGroup}>
            <label
              className={styles.formUploadButton}
              style={{ margin: '0 auto' }}
            >
              <input
                className={styles.formInput}
                type='file'
                id='document'
                name='document'
                onChange={uploadDocument}
              />
              <img src='/uploadicon.png' style={{ width: '3rem' }} />
              <span>T???i t???p l??n</span>
            </label>
            {uploading ? (
              <p style={{ textAlign: 'center' }}>
                ??ang t???i t???p l??n... {uploadPercent}%
              </p>
            ) : null}
            {documentName ? (
              <>
                <p className={styles.formFilename}>{documentName}</p>
                <button
                  type='button'
                  className={styles.button}
                  onClick={() => {
                    setDocumentId(null);
                    setDocumentName(null);
                  }}
                >
                  X??a t???p
                </button>
              </>
            ) : null}
          </div>

          <div
            className={styles.formGroup}
            style={{ alignItems: 'center', margin: '1rem 0', width: '100%' }}
          >
            <label for='formDocumentLink'>Ho???c</label>
            <input
              id='formDocumentLink'
              type='text'
              placeholder='Nh???p ???????ng d???n li??n k???t ?????n t??i li???u'
              style={{
                width: '100%',
                textAlign: 'center',
                margin: '1rem 0',
                padding: '0.5rem',
              }}
            />
            <div>
              <button
                type='button'
                className={styles.button}
                onClick={() => {
                  document.getElementById('formDocumentLink').value = null;
                }}
              >
                X??a li??n k???t
              </button>
            </div>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <p style={{ margin: 0, color: ' #ff0000 ' }}>* b???t bu???c</p>
          <div className={styles.formGroup}>
            <label for='formName' className={styles.formLabel}>
              T??n c???a b???n*
            </label>
            <input
              className={styles.formInput}
              value={user.data.name}
              id='formName'
              type='text'
              placeholder='Nh???p ?????y ????? h??? t??n, c?? d???u'
              onChange={handleNameChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label for='formTel' className={styles.formLabel}>
              ??i???n tho???i li??n h???*
            </label>
            <input
              className={styles.formInput}
              value={user.data.tel}
              id='formDocument'
              type='text'
              placeholder='Nh???p s??? ??i???n tho???i li??n h??? c???a b???n'
              onChange={handleTelChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label for='formZalo' className={styles.formLabel}>
              S??? ??i???n tho???i Zalo (Kh??ng b???t bu???c)
            </label>
            <input
              className={styles.formInput}
              value={user.data.zalo}
              id='formZalo'
              type='text'
              placeholder='Nh???p s??? ??i???n tho???i zalo c???a b???n'
              onChange={handleZaloChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label for='formAddress' className={styles.formLabel}>
              ?????a ch??? giao h??ng
            </label>
            <input
              className={styles.formInput}
              value={user.data.address}
              id='formAddress'
              type='text'
              placeholder='B??? tr???ng n???u l???y t???i c???a h??ng'
            />
          </div>
          <div className={styles.formGroup}>
            <label for='formNote' className={styles.formLabel}>
              H?????ng d???n in*
            </label>
            <textarea
              className={styles.formInput}
              id='formNote'
              rows='5'
              placeholder='Nh???p h?????ng d???n in cho nh??n vi??n: s??? trang c???n in, lo???i gi???y in, kh??? in,... B???n c??
            c???n x??c nh???n tr?????c khi in kh??ng?'
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Bi??n lai (n???u ???? chuy???n kho???n, th??ng tin chuy???n kho???n ??? ph???n b??n
              d?????i)
            </label>
            <label className={styles.formUploadButton}>
              <input
                className={styles.formInput}
                type='file'
                id='formReceipt'
                name='receipt'
                onChange={uploadReceipt}
              />
              T???i ???nh l??n
            </label>

            {receiptName ? <p>{receiptName}</p> : null}
          </div>

          {isLoading ? (
            <>
              <p>
                H??? th???ng ??ang x??? l??, vui l??ng ch??? trong ??t nh???t 15 gi??y {'<3'}
              </p>
              <p className={styles.formSubmitButton}>??ang ????ng k??...</p>
            </>
          ) : (
            <button
              type='button'
              onClick={handleSubmitButton}
              className={styles.formSubmitButton}
            >
              G???i t??i li???u ngay
            </button>
          )}
        </div>
      </form>

      <div className={styles.photocopyContainer}>
        <h3>Th??ng tin ??i???m in ???n</h3>
        <p className={styles.name}>{data && data.name}</p>
        <p>?????a ch???: {data && data.address}</p>
        <p>S??? ??i???n tho???i: {data && data.tel}</p>
        <p>
          Zalo c???a h??ng:{' '}
          {data && (
            <a
              href={`https://zalo.me/${data.zalo}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {data.zalo}
            </a>
          )}
        </p>
        <img src={data && data.images[0]} />
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Th??ng tin chi ti???t
        </p>
        <p>{data && data.description}</p>
      </div>
    </div>
  );
}

export default PhotocopyDetail;
