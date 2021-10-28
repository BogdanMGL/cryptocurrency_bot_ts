import mongodb from 'mongodb';

import TelegramAPI from '../API/telegramAPI';
import CoinmarketAPI from '../API/coinmarketAPI';

const startMessage = (chatId: string, messageName: string) => {
  const text = `Hello, ${messageName} , this bot will allow you to monitor the cryptocurrency market.`;
  TelegramAPI.sendMessage(chatId, text);
};

const helpMessage = (chatId: string) => {
  const text = `*To work with the bot, use the list of commands:* 
/listrecent - list of cryptocurrencies, top 30 by market cap rating 
/addtofavorite  - after the command, specify the name of the currency to add to favorites 
/listfavorite - favorite currency list 
/deletefavorite  - after the command, specify the name of the currency that you want to remove from favorites`;
  TelegramAPI.sendMessage(chatId, text);
};

const getListCryptocurrencies = async (chatId: string) => {
  const data = await CoinmarketAPI.getListCryptocurrencies();

  if (typeof data === 'boolean') {
    const text = 'Error, coinmarketcap server not responding,please try again';
    TelegramAPI.sendMessage(chatId, text);
    return;
  }
  let result = '* Top 30 by market cap rating: *\n';
  for (let i = 0; i < data.data.length; i++) {
    const name = `/${data.data[i].symbol.padEnd(8)}`;
    const price = data.data[i].quote.USD.price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    });
    result += `${i + 1}. ${name} _${price}_ \n`;
  }
  TelegramAPI.sendMessage(chatId, result);
};

const getСryptocurrency = async (
  chatId: string,
  currencySymbol: string,
  db: mongodb.Collection,
) => {
  const data = await CoinmarketAPI.getСryptocurrency(currencySymbol);

  if (typeof data === 'boolean') {
    const text = 'Error, coinmarketcap server not responding,please try again';
    TelegramAPI.sendMessage(chatId, text);
    return;
  }

  const { name } = data.data[`${currencySymbol}`];
  let result = `\`${'name: '.padEnd(27)}\` _${name}_ \n`;
  const detail = data.data[`${currencySymbol}`].quote.USD;

  Object.entries(detail).forEach((item) => {
    const fieldName = (`${item[0].replace(/_(?=\d)/g, ' in ')
      .replace(/_/g, ' ')
      .replace(/h$/g, ' hours')
      .replace(/d$/g, ' days')}:`).padEnd(27);
    let fieldValue = '';
    if (item[0] === 'last_updated') fieldValue = new Date(item[1]).toLocaleString('en-US');
    else {
      fieldValue = item[1].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
      });
    }
    result += `\`${fieldName}\` _${fieldValue}_  \n`;
  });

  const currency = { chatId, name: currencySymbol };
  const findCurrency = await db.findOne(currency);

  const keyboardText = findCurrency
    ? `Remove ${name} from favorite list`
    : `Add  ${name} to favorite list`;
  const callbackData = findCurrency
    ? `/deletefavorite ${currencySymbol}`
    : `/addtofavorite ${currencySymbol}`;

  const keyboard = {
    inline_keyboard: [[{ text: keyboardText, callback_data: callbackData }]],
  };
  TelegramAPI.sendInlineMessage(chatId, result, keyboard);
};

const addCurrency = async (
  chatId: string,
  messageText: string,
  db: mongodb.Collection,
) => {
  let text = '';
  const arrMessageText = messageText.replace(/\s+/g, ' ').split(' ');
  if (arrMessageText.length !== 2) {
    text = 'Sorry, cryptocurrency  is invalid. Please use this format: \n/addtofavorite currencySymbol \nExample: \n/addtofavorite BTC \n';
    TelegramAPI.sendMessage(chatId, text);
    return;
  }

  const name = arrMessageText[1];
  const checkCurrency = await CoinmarketAPI.checkСryptocurrency(name);

  if (checkCurrency === 404) {
    text = 'Error, coinmarketcap server not responding,please try again';
    TelegramAPI.sendMessage(chatId, text);
    return;
  } if (!checkCurrency) {
    text = 'Cryptocurrency not found, check the correctness of the currency symbol';
    TelegramAPI.sendMessage(chatId, text);
    return;
  }

  const currency = { name, chatId };
  const findCurrency = await db.findOne(currency);
  if (findCurrency !== null) {
    text = `Error, ${name},  cryptocurrency has already been added`;
    TelegramAPI.sendMessage(chatId, text);
    return;
  }

  db.insertOne(currency, (err) => {
    text = err
      ? 'Error, no cryptocurrency added, please try again'
      : 'Cryptocurrency added successfully';
    TelegramAPI.sendMessage(chatId, text);
  });
};

const removeCurrency = async (
  chatId: string,
  messageText: string,
  db: mongodb.Collection,
) => {
  const arrMessageText = messageText.replace(/\s+/g, ' ').split(' ');
  if (arrMessageText.length !== 2) {
    const text = 'Sorry, cryptocurrency  is invalid. Please use this format: \n/deletefavorite currencySymbol \nExample: \n/deletefavorite BTC \n';
    TelegramAPI.sendMessage(chatId, text);
    return;
  }
  const name = arrMessageText[1];
  const currency = { name, chatId };
  const findCurrency = await db.findOne(currency);
  if (!findCurrency) {
    const text = `Error, ${name}, cryptocurrency is not on the list of favorites`;
    TelegramAPI.sendMessage(chatId, text);
    return;
  }

  db.deleteOne(currency, (err) => {
    const text = err
      ? 'Error, cryptocurrency not deleted added, try again'
      : 'Cryptocurrency deleted successfully';
    TelegramAPI.sendMessage(chatId, text);
  });
};

const listFavoriteCurrency = async (chatId: string, db: mongodb.Collection) => {
  const arrayCurrency = await db.find({ chatId }).toArray();
  if (!arrayCurrency.length) {
    const text = 'Favorites list is empty';
    TelegramAPI.sendMessage(chatId, text);
    return;
  }
  let stringCurrency = '';
  arrayCurrency.forEach((item, i) => {
    stringCurrency
      += i === arrayCurrency.length - 1 ? item.name : `${item.name},`;
  });
  const data = await CoinmarketAPI.getСryptocurrency(stringCurrency);

  if (typeof data === 'boolean') {
    const text = 'Error, coinmarketcap server not responding,please try again';
    TelegramAPI.sendMessage(chatId, text);
    return;
  }

  const detail = data.data;
  const arrayNameCurrency = stringCurrency.split(',');
  let result = '* Favorite currency list: \n*';
  arrayNameCurrency.forEach((item) => {
    result
      += `/${
        detail[`${item}`].symbol
      }  _${
        detail[`${item}`].quote.USD.price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
        })
      }_`
      + '\n';
  });
  TelegramAPI.sendMessage(chatId, result);
};

const checkMessage = async (
  chatId: string,
  messageText: string,
  isBotCommand: boolean,
  db: mongodb.Collection,
) => {
  if (!isBotCommand) return;
  const currency = messageText.slice(1).toUpperCase();
  const checkCurrency = await CoinmarketAPI.checkСryptocurrency(currency);
  if (checkCurrency === 404) {
    const text = 'Error, coinmarketcap server not responding,please try again';
    TelegramAPI.sendMessage(chatId, text);
    return;
  }
  if (!checkCurrency) {
    const text = 'Error, unknown command use command: /help';
    TelegramAPI.sendMessage(chatId, text);
    return;
  }
  getСryptocurrency(chatId, currency, db);
};

const editedMessage = async (chatId: string) => {
  const text = 'Editing messages is not supported, create a new message';
  TelegramAPI.sendMessage(chatId, text);
};

export {
  getListCryptocurrencies,
  addCurrency,
  removeCurrency,
  listFavoriteCurrency,
  helpMessage,
  startMessage,
  checkMessage,
  editedMessage,
};
