import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

export default UseAxios = axios.create({
  baseURL: 'http://i7a202.p.ssafy.io:8888/api',
});

UseAxios.interceptors.request.use(
  async config => {
    const accesstoken = await AsyncStorage.getItem('accesstoken');
    const refreshtoken = await AsyncStorage.getItem('refreshtoken');
    if (accesstoken && refreshtoken) {
      config.headers['ACCESSTOKEN'] = accesstoken;
      config.headers['REFRESHTOKEN'] = refreshtoken;
    } else {
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

UseAxios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {
      config,
      response: {status},
    } = error;
    if (status === 403) {
      const originalRequest = config;
      const accesstoken = await AsyncStorage.getItem('accesstoken');
      const refreshtoken = await AsyncStorage.getItem('refreshtoken');
      // token refresh 요청
      await axios
        .post(
          `http://i7a202.p.ssafy.io:9999/api/users/reissue`, // token refresh api
          {},
          {
            headers: {ACCESSTOKEN: accesstoken, REFRESHTOKEN: refreshtoken},
          },
        )
        .then(res => {
          AsyncStorage.setItem('accesstoken', res.headers.accesstoken);
          originalRequest.headers['ACCESSTOKEN'] = res.headers.accesstoken;
        })
        .catch(err => {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        });

      return axios(originalRequest);
    }

    return Promise.reject(error);
  },
);
