import axios from 'axios';
import { TranslatorProps } from '../utils/constants/props';

export async function translateRequest(body: TranslatorProps) {
  return axios({ url: '/translate', method: 'POST', data: body }).then(
    res => res.data
  );
}

export async function speechRequest(text: string) {
  return axios({ url: '/speech', method: 'POST', data: { text } }).then(
    res => res.data
  );
}
