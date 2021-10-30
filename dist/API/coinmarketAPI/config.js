"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var config = {
    COIN_URL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/',
    COIN_API_KEY: process.env.COIN_API_KEY
};
exports["default"] = config;
//# sourceMappingURL=config.js.map