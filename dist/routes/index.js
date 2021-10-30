"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bot = __importStar(require("../functions/index"));
var config_1 = __importDefault(require("./config"));
var TG_TOKEN = config_1["default"].TG_TOKEN;
function routes(app, db) {
    app.post("/" + TG_TOKEN, function (req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if ('edited_message' in req.body) {
            var messageChatId_1 = req.body.edited_message.chat.id.toString();
            bot.editedMessage(messageChatId_1);
            return res.status(200).send({});
        }
        var messageChatId = (_d = (_c = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.chat) === null || _c === void 0 ? void 0 : _c.id.toString()) !== null && _d !== void 0 ? _d : req.body.callback_query.message.chat.id.toString();
        var messageText = (_g = (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.text) !== null && _g !== void 0 ? _g : req.body.callback_query.data;
        var messageName = (_k = (_j = (_h = req.body) === null || _h === void 0 ? void 0 : _h.message) === null || _j === void 0 ? void 0 : _j.chat) === null || _k === void 0 ? void 0 : _k.first_name;
        var isBotCommand = !!((_l = req.body) === null || _l === void 0 ? void 0 : _l.message);
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
exports["default"] = routes;
//# sourceMappingURL=index.js.map