"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./controller/auth.controller");
const express_1 = require("express");
const checkEmail_1 = require("../../middleware/checkEmail");
const validation_1 = __importDefault(require("../../middleware/validation"));
const auth_validation_1 = __importDefault(require("./auth.validation"));
const authRouter = (0, express_1.Router)();
authRouter.
    post("/signUp", checkEmail_1.checkEmail, (0, validation_1.default)(auth_validation_1.default), auth_controller_1.signUp)
    .post("/signIn", auth_controller_1.signIn)
    .patch('/', auth_controller_1.changeUserPassword);
exports.default = authRouter;
