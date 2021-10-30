import dotenv from 'dotenv';

dotenv.config();

const config = {
  DB_CONN: process.env.DB_CONN,
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_COLLECTION: process.env.DB_COLLECTION,

};

export default config;
