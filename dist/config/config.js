"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var config = {
    COIN_URL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/',
    TG_URL: 'https://api.telegram.org/bot',
    COIN_API_KEY: process.env.COIN_API_KEY,
    TG_TOKEN: process.env.TG_TOKEN,
    DB_CONN: process.env.DB_CONN,
    ROOT: process.env.ROOT,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_COLLECTION: process.env.DB_COLLECTION
};
exports["default"] = config;
//# sourceMappingURL=config.js.map