import axios from 'axios';
import { BASE_URL } from '../baseUrl';

export const APIFormdata = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-cache',
  },
});

APIFormdata.interceptors.request.use(
  (req) => {
    if (localStorage.getItem('adminToken')) {
      req.headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`;
    }
    return req;
  },
  function (error) {},
);

APIFormdata.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // alert('You are not authorized')
    if (error.response?.status === 403) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
      // return Promise.reject(error.response.data)
    }
    return Promise.reject(error);
  },
);

export const uploadImageAPI = async (data: any) => {
  try {
    const res = await APIFormdata.post(
      `${BASE_URL}/image/upload`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return { status: res?.status, data: res?.data };
  } catch (error: any) {
    if (error?.response?.status === 500) {
      return { status: error?.response?.status };
    }
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
    return { status: error.response?.status, data: error.response?.data };
  }
};
