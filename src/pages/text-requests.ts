import { TextProps } from '../utils/constants/props';
import axios from 'axios';

export async function getTextListRequest(filter?: object) {
  return axios({ url: '/texts', method: 'GET', params: { filter } }).then(
    res => res.data
  );
}

export async function getOneTextRequest(filter?: object) {
  return axios({
    url: '/texts/findOne',
    method: 'GET',
    params: { filter },
  }).then(res => res.data);
}

export async function getOneTextByIdRequest(id: string) {
  return axios({ url: `/texts/${id}`, method: 'GET' }).then(res => res.data);
}

export async function createTextRequest(data: Partial<TextProps>) {
  return axios({ url: '/texts', method: 'POST', data }).then(res => res.data);
}

export async function updateOneTextRequest(
  id: string,
  updatedData: Partial<TextProps>
) {
  return axios({
    url: `/texts/${id}`,
    method: 'PATCH',
    data: updatedData,
  }).then(res => res.data);
}
