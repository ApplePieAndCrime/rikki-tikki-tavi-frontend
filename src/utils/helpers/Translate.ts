import axios from 'axios';

export async function TranslateText(
  from: string,
  to: string,
  text: string
): Promise<string> {
  const data = await axios({
    url: '/translate',
    method: 'POST',
    data: { from, to, text },
  }).then(res => res.data);

  return data;
}
