import express from 'express';
import * as mongoDB from 'mongodb';

import config from './config';
import routes from './routes';

const { DB_CONN, DB_NAME, DB_COLLECTION } = config;
const PORT: string | number = config.PORT || 4000;
const app = express();
app.use(express.json());

const start = async () => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN);
  await client.connect();
  const db: mongoDB.Collection = client.db(DB_NAME).collection(DB_COLLECTION);
  routes(app, db);
  app.listen(PORT, () => console.log('listen localhost'));
};

start();
