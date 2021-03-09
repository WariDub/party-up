import Axios, { AxiosRequestConfig } from 'axios';
import { BACKEND_URL } from '../globals';
import { AuthCredentials } from './interfaces/auth-credentials.dto';

export const onSignUp = async (data: AuthCredentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: `${BACKEND_URL}/auth/register`,
    data,
  };

  try {
    const { data } = await Axios.request(requestConfig);
    console.log(data.accessToken);
  } catch (e) {
    console.error(e.response);
    return { error: e.response.data.message };
  }
};
