"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var config = {
    TG_URL: 'https://api.telegram.org/bot',
    TG_TOKEN: process.env.TG_TOKEN
};
exports["default"] = config;
//# sourceMappingURL=config.js.map