"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = exports.deleteAccount = exports.updateProfile = exports.getUser = void 0;
const User_1 = __importDefault(require("../../../../database/models/User"));
const Error_1 = require("../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middleware/catchError"));
exports.getUser = (0, catchError_1.default)(async (req, res, next) => {
    const user = await User_1.default.findById(req.params.id).select('-password');
    if (!user) {
        return next(new Error_1.AppError('not found user', 404));
    }
    return res.status(201).json({ message: 'done', user });
});
exports.updateProfile = (0, catchError_1.default)(async (req, res, next) => {
    const user = await User_1.default.findByIdAndUpdate(req.user?.userId, req.body, { new: true });
    if (!user) {
        return next(new Error_1.AppError('user not found', 404));
    }
    res.status(201).json({ message: 'User updated successfully', user });
});
exports.deleteAccount = (0, catchError_1.default)(async (req, res, next) => {
    const user = await User_1.default.findByIdAndDelete(req.params.id);
    return !user ?
        next(new Error_1.AppError('not found user', 404)) :
        res.status(201).json({ message: 'User deleted successfully', user });
});
exports.allUsers = (0, catchError_1.default)(async (req, res, next) => {
    const users = await User_1.default.find().select('-password');
    return users.length == 0 ?
        next(new Error_1.AppError('not found users', 404)) :
        res.status(201).json({ message: 'success', users });
});
