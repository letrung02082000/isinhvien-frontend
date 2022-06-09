import axios from 'axios';
import { store } from '../store';
import { updateUser, logoutUser } from '../store/userSlice';

function checkLogin() {
  const userInfo = localStorage.getItem('user-info');
  const token = localStorage.getItem('user-jwt-tk');
  const refreshToken = localStorage.getItem('user-jwt-rftk');

  if (!token || !refreshToken) {
    store.dispatch(logoutUser());
  }

  if (token && refreshToken) {
    axios
      .get('/api/user/profile', {
        headers: { token: token },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = JSON.parse(userInfo);
          store.dispatch(updateUser({ isLoggedIn: true, data }));
        }
      })
      .catch((error) => {
        const res = error.response;

        if (res.status === 401) {
          axios
            .post('/api/user/refresh-token', {
              refreshToken,
            })
            .then((refreshRes) => {
              if (refreshRes.status === 200) {
                localStorage.setItem(
                  'user-jwt-tk',
                  refreshRes.data.accessToken
                );
                const data = JSON.parse(userInfo);
                store.dispatch(updateUser({ isLoggedIn: true, data }));
              }
            })
            .catch((error) => {
              store.dispatch(
                updateUser({
                  isLoggedIn: false,
                  data: { name: '', tel: '', zalo: '' },
                })
              );
              localStorage.removeItem('user-info');
              localStorage.removeItem('user-jwt-tk');
              localStorage.removeItem('user-jwt-rftk');
            });
        }
      });
  } else {
    return false;
  }
}

export default checkLogin;
