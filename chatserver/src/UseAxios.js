import axios from 'axios';

const useAxios = axios.create({
  baseURL: 'http://i7a202.p.ssafy.io:8888/api',
});

export default useAxios;
