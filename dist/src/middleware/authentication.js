"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTo = void 0;
const Error_1 = require("../utils/Error");
const User_1 = __importDefault(require("../../database/models/User"));
const catchError_1 = __importDefault(require("./catchError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protectedRoutes = (0, catchError_1.default)(async (req, res, next) => {
    // authentication
    const token = req.headers.token;
    if (!token)
        return next(new Error_1.AppError("token not provided", 400));
    try {
        const userPayload = jsonwebtoken_1.default.verify(token, "KEY");
        const user = await User_1.default.findById(userPayload.userId);
        if (!user)
            return next(new Error_1.AppError("user not found", 400));
        req.user = { userId: user._id, role: user.role };
        next();
    }
    catch (err) {
        return next(new Error_1.AppError("Invalid token or token expired", 401));
    }
});
const allowedTo = (...roles) => {
    // authorization
    return (0, catchError_1.default)(async (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new Error_1.AppError("you are not authorized to access this endpoint", 401));
        }
        next();
    });
};
exports.allowedTo = allowedTo;
exports.default = protectedRoutes;
