import axios, { AxiosError } from 'axios';

import config from './config';
import * as types from './types';

const { COIN_URL } = config;
axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = config.COIN_API_KEY;

export default class CoinmarketAPI {
  static async getListCryptocurrencies() {
    const params = {
      start: '1',
      limit: '30',
      convert: 'USD',
    };
    const result = await axios
      .get<types.GetListCryptocurrencies>(`${COIN_URL}listings/latest`, { params })
      .then((res: types.ResponsList) => res.data)
      .catch(() => false);
    return result;
  }

  static async checkСryptocurrency(currency: string) {
    const result = await axios
      .get(`${COIN_URL}quotes/latest`, { params: { symbol: currency } })
      .then(() => true)
      .catch((err: AxiosError) => {
        if (err?.response?.status === 404) return 404;
        return false;
      });
    return result;
  }

  static async getСryptocurrency(currency: string) {
    const result = await axios
      .get<types.GetСryptocurrency>(`${COIN_URL}quotes/latest`, {
        params: { symbol: currency },
      })
      .then((res: types.ResponseItem) => res.data)
      .catch(() => false);
    return result;
  }
}
