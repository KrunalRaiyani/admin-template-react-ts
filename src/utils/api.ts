import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

API.interceptors.request.use(
  (req) => {
    if (localStorage.getItem('adminToken')) {
      req.headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`;
    }
    return req;
  },
  function (error) {},
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // alert('You are not authorized')
    if (error.response?.status === 403) {
      // localStorage.removeItem('adminToken');
      // window.location.href = '/login';
      // return Promise.reject(error.response.data)
    }
    return Promise.reject(error);
  },
);


export const MakeProtectedApiCall = async (
  apiPath: any,
  method: any,
  bodyData = {},
  headers?: any,
) => {
  switch (method.toLowerCase()) {
    case 'get':
      try {
        const res = await API.get(apiPath);
        return { status: res?.status, data: res?.data };
      } catch (error: any) {
        const msg = error.response?.data?.msg;

        if (error?.response?.status === 401) {
          // localStorage.clear();
          // window.location.href = '/';
        }
        return { status: error.response?.status, data: error.response?.data };
      }
    case 'post':
      try {
        const res = await API.post(apiPath, bodyData, {
          headers,
        });

        return { status: res?.status, data: res?.data };
      } catch (error: any) {
        const msg = error?.response?.data?.msg;
        if (error?.response?.status === 500) {
          return { status: error?.response?.status };
        }
        if (error?.response?.status === 401) {
          // localStorage.clear();
          // window.location.href = '/';
        }
        return { status: error.response?.status, data: error.response?.data };
      }
    case 'put':
      try {
        const res = await API.put(apiPath, bodyData, {
          headers,
        });
        return { status: res?.status, data: res?.data };
      } catch (error: any) {
        const msg = error.response?.data?.msg;
        if (error.response?.status === 401) {
          // window.location.href = '/';
        }
        return { status: error.response?.status, data: error.response?.data };
      }
    case 'patch':
      try {
        const res = await API.patch(apiPath, bodyData);
        return { status: res?.status, data: res?.data };
      } catch (error: any) {
        const msg = error.response?.data?.msg;
        if (error.response?.status === 401) {
          // localStorage.clear();
          // window.location.href = '/login';
        }
        return { status: error.response?.status, data: error.response?.data };
      }
    case 'delete':
      try {
        const res = await API.delete(apiPath);
        return { status: res?.status, data: res?.data };
      } catch (error: any) {
        const msg = error.response?.data?.msg;
        if (error.response?.status === 401) {
          // window.location.href = '/';
        }
        return { status: error.response?.status, data: error.response?.data };
      }
    default:
      break;
  }
};
