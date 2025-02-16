import { MakeProtectedApiCall } from '../api';

export const HANDLE_LOGIN = async (data: any) => {
  try {
    const url = `/admin/auth/signin`;
    const res = await MakeProtectedApiCall(url, 'POST', data);
    return res;
  } catch (error: any) {}
};
