import axios from 'axios';
import { get } from 'lodash';
import {
  unsplashUrl,
  unsplashKey,
  unsplashSecret,
} from '../utils/constants/base';

// export async function getRandomImage() {
// return axios({
//   url: `${unsplashUrl}/photos/random`,
//   method: 'GET',
//   params: { client_id: unsplashKey },
// });
// }

const loremflickrUrl = `https://loremflickr.com/320/240`;

export const getRandomImage = () => {
  return axios({
    url: `${loremflickrUrl}`,
    method: 'GET',
  });
};
