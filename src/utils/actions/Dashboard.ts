import { MakeProtectedApiCall } from '../api';

export const GET_DASHBOARD_DATA = async () => {
  try {
    const url = `/admin/dashboard/get`;
    const res = await MakeProtectedApiCall(url, 'GET');
    return res;
  } catch (error: any) {}
};
