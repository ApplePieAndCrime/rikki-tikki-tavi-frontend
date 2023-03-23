import { RegisterProps } from './../utils/constants/props';
import { AuthResponse } from './../utils/constants/responses';
import { AxiosResponse } from 'axios';
import $api from '../utils/axios';

export default class AuthService {
  static async login(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api<AuthResponse>({
      url: '/auth/login',
      method: 'POST',
      data: { login, password },
    });
  }

  static loginGoogle = async (credentialResponse: any) => {
    console.log(credentialResponse);
    const { data } = await $api.post(`/auth/login-google`, {
      // pass the token as part of the req body
      token: credentialResponse.credential,
    });
    return data;
  };

  static async register(
    data: RegisterProps
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api<AuthResponse>({
      url: '/auth/register',
      method: 'POST',
      data,
    });
  }

  static async forgotPassword(
    email: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api<AuthResponse>({
      url: '/auth/forgot-password',
      method: 'POST',
      data: { email },
    });
  }

  static async logout(): Promise<void> {
    return $api({ url: 'auth/logout', method: 'POST' });
  }
}
