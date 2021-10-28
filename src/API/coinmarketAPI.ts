import axios, { AxiosError } from 'axios';

import config from '../config/config';

const { COIN_URL } = config;
axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = config.COIN_API_KEY;

interface GetListCryptocurrencies {
  data: {
    symbol: string;
    quote: {
      USD: {
        price: number;
      };
    };
  }[];
}
interface ResponsList {
  data: GetListCryptocurrencies;
}

interface GetСryptocurrency {
  data: {
    [key: string]: {
      symbol: string;
      name: string;
      quote: {
        USD: {
          [key: string]: string | number;
        };
      };
    };
  };
}

interface ResponseItem {
  data: GetСryptocurrency;
}

export default class CoinmarketAPI {
  static async getListCryptocurrencies() {
    const params = {
      start: '1',
      limit: '30',
      convert: 'USD',
    };
    const result = await axios
      .get<GetListCryptocurrencies>(`${COIN_URL}listings/latest`, { params })
      .then((res: ResponsList) => res.data)
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
      .get<GetСryptocurrency>(`${COIN_URL}quotes/latest`, {
        params: { symbol: currency },
      })
      .then((res: ResponseItem) => res.data)
      .catch(() => false);
    return result;
  }
}
