"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
const Error_1 = require("./../utils/Error");
const User_1 = __importDefault(require("../../database/models/User"));
const checkEmail = async (req, res, next) => {
    let isExist = await User_1.default.findOne({ email: req.body.email });
    if (isExist)
        return next(new Error_1.AppError("email already exist", 409));
    next();
};
exports.checkEmail = checkEmail;
