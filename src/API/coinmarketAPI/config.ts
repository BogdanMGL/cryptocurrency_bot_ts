import dotenv from 'dotenv';

dotenv.config();

const config = {
  COIN_URL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/',
  COIN_API_KEY: process.env.COIN_API_KEY,
};

export default config;
