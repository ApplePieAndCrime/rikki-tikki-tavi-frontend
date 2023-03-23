import axios from 'axios';
import { TranslatorProps } from '../utils/constants/props';
import $api from '../utils/axios';

export async function translateRequest(body: TranslatorProps) {
  return $api({ url: '/translate', method: 'POST', data: body }).then(
    res => res.data
  );
}

export async function speechRequest(text: string) {
  return $api({ url: '/speech', method: 'POST', data: { text } }).then(
    res => res.data
  );
}
