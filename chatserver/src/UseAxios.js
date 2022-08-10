import axios from 'axios';

const UseAxios = axios.create({
  baseURL: 'http://i7a202.p.ssafy.io:8888/api',
});

export default UseAxios;
