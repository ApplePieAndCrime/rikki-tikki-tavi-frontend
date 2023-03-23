import { RegisterProps, UserProps } from './../utils/constants/props';
import { AuthResponse } from './../utils/constants/responses';
import { AxiosResponse } from 'axios';
import $api from '../utils/axios';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<UserProps[]>> {
    return $api({ url: '/users', method: 'GET' });
  }
}
