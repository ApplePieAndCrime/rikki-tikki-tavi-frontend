import { UserProps } from './props';

export interface AuthResponse {
  accessToken: string;
  user: UserProps;
}
