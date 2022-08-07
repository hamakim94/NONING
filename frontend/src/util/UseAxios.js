import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DevSettings} from 'react-native';

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
      const response = await axios.post(
        `http://i7a202.p.ssafy.io:8888/api/users/reissue`, // token refresh api
        {},
        {
          headers: {ACCESSTOKEN: accesstoken, REFRESHTOKEN: refreshtoken},
        },
      );
      if (response.headers.accesstoken) {
        await AsyncStorage.setItem('accesstoken', response.headers.accesstoken);
        originalRequest.headers['ACCESSTOKEN'] = response.headers.accesstoken;
        return axios(originalRequest);
      } else {
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        AsyncStorage.clear();
        DevSettings.reload();
      }
    }
    return Promise.reject(error);
  },
);
