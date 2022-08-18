import axios from 'axios';

const UseAxios = axios.create({
  baseURL: 'https://i7a202.p.ssafy.io/api',
});

export default UseAxios;
