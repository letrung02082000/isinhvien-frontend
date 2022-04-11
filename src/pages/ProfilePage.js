import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import { Form, Button,FloatingLabel } from 'react-bootstrap';
import styles from './profilePage.module.css';

import useMediaQuery from '../hooks/useMediaQuery';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser, updateUser } from '../store/userSlice';

//components
import PasswordField from '../components/PasswordField';
function ProfilePage() {
  const user = useSelector(selectUser).data;
  const dispatch = useDispatch();
  const history = useHistory();

  const isMobile = useMediaQuery('(max-width: 768px)',{defaultMatches:true});
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarMsg, setAvatarMsg] = useState(null);
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [address, setAddress] = useState('');
  const [psw, setPsw] = useState(null);
  const [newPsw, setNewPsw] = useState(null);
  const [confirmPswMsg, setConfirmPswMsg] = useState(null);

  const hiddenFileInput = React.useRef(null);
  const nameInput = React.useRef(null);
  const telInput = React.useRef(null); 
  const addressInput = React.useRef(null);

  useEffect(() => {
    axios.get('/api/user/profile',{headers:{'token':localStorage.getItem('user-jwt-tk')}}).then((res) => {
      const userProfile = res.data.user.user;
      setAvatarUrl(userProfile.avatarUrl||'avatar-default.png');
      setName(userProfile.name||'');
      setTel(`0${userProfile.tel}`||'');
      setAddress(userProfile.address||'');
    });
  },[]);
  const handleAvatarClick = (event) =>{
    hiddenFileInput.current.click();
  }
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const extList = ['jpg', 'png', 'jpeg', 'gif', 'JPG', 'PNG', 'JPEG', 'GIF'];
    const fileExt = file.name.split('.').at(-1);

    if (extList.includes(fileExt)) {
      setAvatarImage(file);
      setAvatarUrl(URL.createObjectURL(file));
    } else {
      setAvatarMsg('Không phải hình ảnh');
    }
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    
    history.push('/login');
  };
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTelChange = (event) => {
    setTel(event.target.value);
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imgbbKey ='9304eb5630f3f1e2a368fa2ee7cf100f';
    const formData = {};
    if(avatarImage){
      const formDataImgbb = new FormData();
      formDataImgbb.append('image', avatarImage);
      try{
        const respone = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, formDataImgbb);
        formData.avatarUrl =  respone.data.data.url;
      }
      catch(err){
        console.log(err);
      }
    }
    else{
      formData.avatarUrl = user.avatarUrl;
    }
    
    formData.name = name;
    formData.tel = tel;
    formData.address = address;
    axios.post('/api/user/update-profile', formData,{headers:{'token':localStorage.getItem('user-jwt-tk')}}).then((res) => {
      console.log(res.data);
      if (res.data.message==='success') {
        dispatch(updateUser({isLoggedIn : true,data:{...user, avatarUrl:formData.avatarUrl,name:formData.name}}));
        history.push('/profile');
      }
    });
  }

  const handlePswChange = (event) => {
    setPsw(event.target.value);
    if(confirmPswMsg && confirmPswMsg!=='Mật khẩu không khớp'){
      setConfirmPswMsg(null);
    }
  }
  const handleNewPswChange = (event) => {
    setNewPsw(event.target.value);
  }
  const handleRePswChange = (event) => {
    if(newPsw===event.target.value){
      setConfirmPswMsg(null);
    }
    else{
      setConfirmPswMsg('Mật khẩu không khớp');
    }
  }
  const handlePswSubmit = async (event) => {
    event.preventDefault();
    if(!psw||!newPsw||confirmPswMsg){
      return;
    }
    const formData = {};
    formData.psw = psw;
    formData.newPsw = newPsw;
    axios
    .post('/api/user/update-psw', formData,{headers:{'token':localStorage.getItem('user-jwt-tk')}})
    .then((res) => {
      console.log(res.status);
      if (res.status===200) {
        setConfirmPswMsg("Mật khẩu đã được cập nhật.");
      }
    })
    .catch(err => {
      setConfirmPswMsg("Mật khẩu cũ không chính xác.");
    });
  }
  return (
    <MainLayout>
      <div className={styles.profileContainer}>
        <h1 className='my-3'>Tài khoản</h1>
        <Form>
          <div>
            <Form.Group className={isMobile ? styles.avatarMobile : styles.avatar}>
              <img
                src={avatarUrl}
                style={{ width: '100%' }}
                className='mt-3'
                alt='avt'
              />
              <Button className={styles.avtButton} onClick={handleAvatarClick}>Đổi ảnh đại diện</Button>
              <Form.Control size='lg' type='file' ref={hiddenFileInput} style={{display:'none'}} onChange={handleAvatarChange} />
            </Form.Group>
            <div className={isMobile ? styles.formMobile : styles.leftInfo}>
              <Form.Group >
                <FloatingLabel
                  controlId="email"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control type="email" readOnly value={user.email} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel
                  controlId="sdt"
                  label="Số điện thoại"
                  className="mb-3"
                >
                  <Form.Control type="text" ref={telInput} onChange={handleTelChange} value={tel} placeholder='Số điện thoại' />
                </FloatingLabel>
              </Form.Group>
              <Form.Group >
                <FloatingLabel
                  controlId="name"
                  label="Tên của bạn"
                  className="mb-3"
                >
                  <Form.Control type="text" ref={nameInput} onChange={handleNameChange} value={name} placeholder='Tên'/>
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel
                  controlId="address"
                  label="Địa chỉ"
                  className="mb-3"
                >
                  <Form.Control type="text" ref={addressInput} onChange={handleAddressChange} value={address} placeholder='Địa chỉ' />
                </FloatingLabel>
              </Form.Group>
            </div>
          </div>
          
          <Button className='my-3' variant='primary' onClick={handleSubmit}>
            Lưu thay đổi
          </Button>
        </Form>
        <Form className = {isMobile ? styles.formMobile : null} >
          <h3 className='my-3'>Cập nhật mật khẩu</h3>
          <PasswordField label="Mật khẩu cũ" handle={handlePswChange}/>
          <PasswordField label="Mật khẩu Mới" handle={handleNewPswChange}/>
          <PasswordField label="Nhập lại mật khẩu" handle={handleRePswChange}/>
          
          <span>{confirmPswMsg}</span>
          <Form.Group
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button className='mt-3 mb-5' variant='primary' type='button' onClick={handlePswSubmit}>
              Cập nhật
            </Button>
            <Button
              className='mt-3 mb-5'
              variant='primary'
              type='button'
              onClick={handleLogoutClick}
            >
              Đăng xuất
            </Button>
          </Form.Group>
        </Form>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
