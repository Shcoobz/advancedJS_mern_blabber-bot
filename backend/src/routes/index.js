"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_js_1 = require("./user-routes.js");
var chat_routes_js_1 = require("./chat-routes.js");
var appRouter = (0, express_1.Router)();
appRouter.use('/user', user_routes_js_1.default);
appRouter.use('/chat', chat_routes_js_1.default);
exports.default = appRouter;
