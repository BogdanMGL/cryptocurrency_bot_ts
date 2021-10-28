import { Express, Request, Response } from 'express';
import mongodb from 'mongodb';

import * as bot from '../function/index';
import config from '../config/config';

const { TG_TOKEN } = config;

export default function routes(app: Express, db: mongodb.Collection) {
  app.get('/', (req: Request, res: Response) => {
    res.send('I am work');
  });

  app.post(`/${TG_TOKEN}`, (req: Request, res: Response) => {
    if ('edited_message' in req.body) {
      const messageChatId:string = req.body.edited_message.chat.id.toString();
      bot.editedMessage(messageChatId);
      return res.status(200).send({});
    }

    const messageChatId:string = req.body?.message?.chat?.id.toString()
    ?? req.body.callback_query.message.chat.id.toString();
    const messageText:string = req.body?.message?.text ?? req.body.callback_query.data;
    const messageName:string = req.body?.message?.chat?.first_name;
    const isBotCommand = !!(req.body?.message);

    if (messageText.indexOf('addtofavorite') !== -1) {
      bot.addCurrency(messageChatId, messageText, db);
      return res.status(200).send({});
    }
    if (messageText.indexOf('deletefavorite') !== -1) {
      bot.removeCurrency(messageChatId, messageText, db);
      return res.status(200).send({});
    }

    switch (messageText) {
      case '/help':
        bot.helpMessage(messageChatId);
        break;
      case '/start':
        bot.startMessage(messageChatId, messageName);
        break;
      case '/listrecent':
        bot.getListCryptocurrencies(messageChatId);
        break;
      case '/listfavorite':
        bot.listFavoriteCurrency(messageChatId, db);
        break;
      default:
        bot.checkMessage(messageChatId, messageText, isBotCommand, db);
    }
    return res.status(200).send({});
  });
}
