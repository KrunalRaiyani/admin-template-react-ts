import { MakeProtectedApiCall } from '../api';

export const GET_ALL_PRODUCTS = async (page: number, limit: number,search:string ) => {
  try {
    const url = `/admin/product/getAll?page=${page}&limit=${limit}&search=${search}`;
    const res = await MakeProtectedApiCall(url, 'GET');
    return res;
  } catch (error: any) {}
};

export const GET_PRODUCT_BYID = async (id: any) => {
  try {
    const url = `/admin/product/getById/${id}`;
    const res = await MakeProtectedApiCall(url, 'GET');
    return res;
  } catch (error: any) {}
};

export const ADD_PRODUCT= async (data: any) => {
  try {
    const url = `/admin/product/add`;
    const res = await MakeProtectedApiCall(url, 'POST', data);
    return res;
  } catch (error: any) {}
};

export const UPDATE_PRODUCT = async (id: any, data: any) => {
  try {
    const url = `/admin/product/update/${id}`;
    const res = await MakeProtectedApiCall(url, 'PUT', data);
    return res;
  } catch (error: any) {}
};

export const DELETE_PRODUCT = async (id: any) => {
  try {
    const url = `/admin/product/delete/${id}`;
    const res = await MakeProtectedApiCall(url, 'DELETE');
    return res;
  } catch (error: any) {}
};
