import { apiUrl } from './../utils/constants/base';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import $api from '../utils/axios';
import { UserProps, RegisterProps } from './../utils/constants/props';

export default class Store {
  user = {} as UserProps;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: UserProps) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log('local storage token', localStorage.getItem('token'));
    } catch (err) {
      console.log('auth error: ', err);
    }
  }

  async registration(data: RegisterProps) {
    try {
      const response = await AuthService.register(data);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log('user', this.user);
    } catch (err) {
      console.log('auth error: ', err);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as UserProps);
    } catch (err) {
      console.log('logout error: ', err);
    }
  }

  async checkAuth() {
    try {
      const response = await $api({ url: `/auth/refresh`, method: 'POST' });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log('local storage token', localStorage.getItem('token'));
    } catch (err) {
      console.log('checkAuth error', err);
    }
  }
}
