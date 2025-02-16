import { MakeProtectedApiCall } from '../api';

export const GET_USER_DATA = async (
  page: number,
  limit: number,
  str: string,
) => {
  try {
    const url = `/admin/user/getAllUser?page=${page}&limit=${limit}&str=${str}`;
    const res = await MakeProtectedApiCall(url, 'GET');
    return res;
  } catch (error: any) {}
};

export const GET_ALL_USER = async () => {
  try {
    const url = `/admin/user/getAllUser`;
    const res = await MakeProtectedApiCall(url, 'GET');
    return res;
  } catch (error: any) {}
};

export const GET_USER_DATA_BYID = async (id: any) => {
  try {
    const url = `/admin/user/getUserById/${id}`;
    const res = await MakeProtectedApiCall(url, 'GET');
    return res;
  } catch (error: any) {}
};

export const UPDATE_USER = async (id: any, data: any) => {
  try {
    const url = `/admin/user/updateUser/${id}`;
    const res = await MakeProtectedApiCall(url, 'PUT', data);
    return res;
  } catch (error: any) {}
};

export const DELETE_USER = async (id: any) => {
  try {
    const url = `/admin/user/deleteUser/${id}`;
    const res = await MakeProtectedApiCall(url, 'DELETE');
    return res;
  } catch (error: any) {}
};

export const UPDATE_CERTIFICATE = async (id: any, data: any) => {
  try {
    const url = `/admin/user/updateCertificate/${id}`;
    const res = await MakeProtectedApiCall(url, 'PUT', data);
    return res;
  } catch (error: any) {}
};
