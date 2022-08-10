import axios from 'axios';

const useAxios = axios.create({
  baseURL: 'http://localhost:8888/api',
});

export default useAxios;
