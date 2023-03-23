import axios from 'axios';
import { apiUrl } from './constants/base';

const $api = axios.create();
$api.defaults.baseURL = apiUrl;
$api.defaults.withCredentials = true;
// $api.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
$api.defaults.headers.post['Content-Type'] = 'application/json';

$api.interceptors.request.use(
  config => {
    // console.log({ request });
    // Edit request config
    // return request;
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  response => {
    console.log({ response });
    // Edit response config
    // return response.data.data;

    return response;
  },
  error => {
    console.log(error);
    const errorMessage = error.response.data.message;
    return Promise.reject({ ...error, errorMessage });
  }
);

export default $api;
