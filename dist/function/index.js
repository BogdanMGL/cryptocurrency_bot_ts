"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.editedMessage = exports.checkMessage = exports.startMessage = exports.helpMessage = exports.listFavoriteCurrency = exports.removeCurrency = exports.addCurrency = exports.getListCryptocurrencies = void 0;
var telegramAPI_1 = __importDefault(require("../API/telegramAPI"));
var coinmarketAPI_1 = __importDefault(require("../API/coinmarketAPI"));
var startMessage = function (chatId, messageName) {
    var text = "Hello, " + messageName + " , this bot will allow you to monitor the cryptocurrency market.";
    telegramAPI_1["default"].sendMessage(chatId, text);
};
exports.startMessage = startMessage;
var helpMessage = function (chatId) {
    var text = "*To work with the bot, use the list of commands:* \n/listrecent - list of cryptocurrencies, top 30 by market cap rating \n/addtofavorite  - after the command, specify the name of the currency to add to favorites \n/listfavorite - favorite currency list \n/deletefavorite  - after the command, specify the name of the currency that you want to remove from favorites";
    telegramAPI_1["default"].sendMessage(chatId, text);
};
exports.helpMessage = helpMessage;
var getListCryptocurrencies = function (chatId) { return __awaiter(void 0, void 0, void 0, function () {
    var data, text, result, i, name_1, price;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, coinmarketAPI_1["default"].getListCryptocurrencies()];
            case 1:
                data = _a.sent();
                if (typeof data === 'boolean') {
                    text = 'Error, coinmarketcap server not responding,please try again';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                result = '* Top 30 by market cap rating: *\n';
                for (i = 0; i < data.data.length; i++) {
                    name_1 = "/" + data.data[i].symbol.padEnd(8);
                    price = data.data[i].quote.USD.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 2
                    });
                    result += i + 1 + ". " + name_1 + " _" + price + "_ \n";
                }
                telegramAPI_1["default"].sendMessage(chatId, result);
                return [2];
        }
    });
}); };
exports.getListCryptocurrencies = getListCryptocurrencies;
var getСryptocurrency = function (chatId, currencySymbol, db) { return __awaiter(void 0, void 0, void 0, function () {
    var data, text, name, result, detail, currency, findCurrency, keyboardText, callbackData, keyboard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, coinmarketAPI_1["default"].getСryptocurrency(currencySymbol)];
            case 1:
                data = _a.sent();
                if (typeof data === 'boolean') {
                    text = 'Error, coinmarketcap server not responding,please try again';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                name = data.data["" + currencySymbol].name;
                result = "`" + 'name: '.padEnd(27) + "` _" + name + "_ \n";
                detail = data.data["" + currencySymbol].quote.USD;
                Object.entries(detail).forEach(function (item) {
                    var fieldName = (item[0].replace(/_(?=\d)/g, ' in ')
                        .replace(/_/g, ' ')
                        .replace(/h$/g, ' hours')
                        .replace(/d$/g, ' days') + ":").padEnd(27);
                    var fieldValue = '';
                    if (item[0] === 'last_updated')
                        fieldValue = new Date(item[1]).toLocaleString('en-US');
                    else {
                        fieldValue = item[1].toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 2
                        });
                    }
                    result += "`" + fieldName + "` _" + fieldValue + "_  \n";
                });
                currency = { chatId: chatId, name: currencySymbol };
                return [4, db.findOne(currency)];
            case 2:
                findCurrency = _a.sent();
                keyboardText = findCurrency
                    ? "Remove " + name + " from favorite list"
                    : "Add  " + name + " to favorite list";
                callbackData = findCurrency
                    ? "/deletefavorite " + currencySymbol
                    : "/addtofavorite " + currencySymbol;
                keyboard = {
                    inline_keyboard: [[{ text: keyboardText, callback_data: callbackData }]]
                };
                telegramAPI_1["default"].sendInlineMessage(chatId, result, keyboard);
                return [2];
        }
    });
}); };
var addCurrency = function (chatId, messageText, db) { return __awaiter(void 0, void 0, void 0, function () {
    var text, arrMessageText, name, checkCurrency, currency, findCurrency;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                text = '';
                arrMessageText = messageText.replace(/\s+/g, ' ').split(' ');
                if (arrMessageText.length !== 2) {
                    text = 'Sorry, cryptocurrency  is invalid. Please use this format: \n/addtofavorite currencySymbol \nExample: \n/addtofavorite BTC \n';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                name = arrMessageText[1];
                return [4, coinmarketAPI_1["default"].checkСryptocurrency(name)];
            case 1:
                checkCurrency = _a.sent();
                if (checkCurrency === 404) {
                    text = 'Error, coinmarketcap server not responding,please try again';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                if (!checkCurrency) {
                    text = 'Cryptocurrency not found, check the correctness of the currency symbol';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                currency = { name: name, chatId: chatId };
                return [4, db.findOne(currency)];
            case 2:
                findCurrency = _a.sent();
                if (findCurrency !== null) {
                    text = "Error, " + name + ",  cryptocurrency has already been added";
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                db.insertOne(currency, function (err) {
                    text = err
                        ? 'Error, no cryptocurrency added, please try again'
                        : 'Cryptocurrency added successfully';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                });
                return [2];
        }
    });
}); };
exports.addCurrency = addCurrency;
var removeCurrency = function (chatId, messageText, db) { return __awaiter(void 0, void 0, void 0, function () {
    var arrMessageText, text, name, currency, findCurrency, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                arrMessageText = messageText.replace(/\s+/g, ' ').split(' ');
                if (arrMessageText.length !== 2) {
                    text = 'Sorry, cryptocurrency  is invalid. Please use this format: \n/deletefavorite currencySymbol \nExample: \n/deletefavorite BTC \n';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                name = arrMessageText[1];
                currency = { name: name, chatId: chatId };
                return [4, db.findOne(currency)];
            case 1:
                findCurrency = _a.sent();
                if (!findCurrency) {
                    text = "Error, " + name + ", cryptocurrency is not on the list of favorites";
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                db.deleteOne(currency, function (err) {
                    var text = err
                        ? 'Error, cryptocurrency not deleted added, try again'
                        : 'Cryptocurrency deleted successfully';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                });
                return [2];
        }
    });
}); };
exports.removeCurrency = removeCurrency;
var listFavoriteCurrency = function (chatId, db) { return __awaiter(void 0, void 0, void 0, function () {
    var arrayCurrency, text, stringCurrency, data, text, detail, arrayNameCurrency, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, db.find({ chatId: chatId }).toArray()];
            case 1:
                arrayCurrency = _a.sent();
                if (!arrayCurrency.length) {
                    text = 'Favorites list is empty';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                stringCurrency = '';
                arrayCurrency.forEach(function (item, i) {
                    stringCurrency
                        += i === arrayCurrency.length - 1 ? item.name : item.name + ",";
                });
                return [4, coinmarketAPI_1["default"].getСryptocurrency(stringCurrency)];
            case 2:
                data = _a.sent();
                if (typeof data === 'boolean') {
                    text = 'Error, coinmarketcap server not responding,please try again';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                detail = data.data;
                arrayNameCurrency = stringCurrency.split(',');
                result = '* Favorite currency list: \n*';
                arrayNameCurrency.forEach(function (item) {
                    result
                        += "/" + detail["" + item].symbol + "  _" + detail["" + item].quote.USD.price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 2
                        }) + "_"
                            + '\n';
                });
                telegramAPI_1["default"].sendMessage(chatId, result);
                return [2];
        }
    });
}); };
exports.listFavoriteCurrency = listFavoriteCurrency;
var checkMessage = function (chatId, messageText, isBotCommand, db) { return __awaiter(void 0, void 0, void 0, function () {
    var currency, checkCurrency, text, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isBotCommand)
                    return [2];
                currency = messageText.slice(1).toUpperCase();
                return [4, coinmarketAPI_1["default"].checkСryptocurrency(currency)];
            case 1:
                checkCurrency = _a.sent();
                if (checkCurrency === 404) {
                    text = 'Error, coinmarketcap server not responding,please try again';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                if (!checkCurrency) {
                    text = 'Error, unknown command use command: /help';
                    telegramAPI_1["default"].sendMessage(chatId, text);
                    return [2];
                }
                getСryptocurrency(chatId, currency, db);
                return [2];
        }
    });
}); };
exports.checkMessage = checkMessage;
var editedMessage = function (chatId) { return __awaiter(void 0, void 0, void 0, function () {
    var text;
    return __generator(this, function (_a) {
        text = 'Editing messages is not supported, create a new message';
        telegramAPI_1["default"].sendMessage(chatId, text);
        return [2];
    });
}); };
exports.editedMessage = editedMessage;
//# sourceMappingURL=index.js.map