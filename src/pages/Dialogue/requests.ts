import { DialogueProps } from '../../utils/constants/props';
import axios from 'axios';

export async function getDialogueListRequest(filter?: object) {
  return axios({ url: '/dialogues', method: 'GET', params: { filter } });
}

export async function getOneRequest(filter?: object) {
  return axios({
    url: '/dialogues/findOne',
    method: 'GET',
    params: { filter },
  });
}

export async function getOneByIdRequest(id: string) {
  return axios({ url: `/dialogues/${id}`, method: 'GET' });
}

export async function createDialogueRequest(data: Partial<DialogueProps>) {
  return axios({ url: '/dialogues/create', method: 'POST', data });
}

export async function updateOneDialogueRequest(
  id: string,
  updatedData: Partial<DialogueProps>
) {
  return axios({
    url: `/dialogues/${id}/update`,
    method: 'PATCH',
    data: updatedData,
  });
}
