import { MakeProtectedApiCall } from '../api';

export const GET_PROFILE = async () => {
  try {
    const url = `/admin/auth/getProfile`;
    const res = await MakeProtectedApiCall(url, 'GET');
    return res;
  } catch (error: any) {}
};

export const EDIT_PROFILE = async (data:any) => {
  try {
    const url = `/admin/auth/updateProfile`;
    const res = await MakeProtectedApiCall(url, 'PUT', data);
    return res;
  } catch (error: any) {}
};