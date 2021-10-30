import dotenv from 'dotenv';

dotenv.config();

const config = {
  TG_URL: 'https://api.telegram.org/bot',
  TG_TOKEN: process.env.TG_TOKEN,
};

export default config;
