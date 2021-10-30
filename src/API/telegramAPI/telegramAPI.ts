import axios from 'axios';
import config from './config';

const { TG_TOKEN } = config;
const { TG_URL } = config;

export default class TelegramAPI {
  static async sendMessage(chatId:string, text:string) {
    await axios.post(`${TG_URL}${TG_TOKEN}/sendMessage`, {
      chat_id: chatId, text, parse_mode: 'Markdown',

    });
  }

  static async sendInlineMessage(chatId:string, text:string, keyboard:object) {
    await axios.post(`${TG_URL}${TG_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: keyboard,
    });
  }
}
