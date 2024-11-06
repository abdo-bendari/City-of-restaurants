"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserPassword = exports.signIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../../../../database/models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchError_1 = __importDefault(require("../../../middleware/catchError"));
const Error_1 = require("../../../utils/Error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.signUp = (0, catchError_1.default)(async (req, res, next) => {
    let user = new User_1.default(req.body);
    await user.save();
    const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
    res.status(200).json({ message: "Signup successful", token, status: 200 });
});
exports.signIn = (0, catchError_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new Error_1.AppError("Please provide email and password", 400));
    const user = await User_1.default.findOne({ email: email });
    if (user && bcrypt_1.default.compareSync(password, user.password)) {
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
        return res.status(200).json({ message: "Login successful", token, status: 200 });
    }
    return next(new Error_1.AppError("Invalid email or password", 401));
});
exports.changeUserPassword = (0, catchError_1.default)(async (req, res, next) => {
    const user = await User_1.default.findOne({ email: req.body.email });
    if (user && bcrypt_1.default.compareSync(req.body.oldPassword, user.password)) {
        req.body.newPassword = await bcrypt_1.default.hash(req.body.newPassword, 8);
        await User_1.default.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword }, { new: true });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_KEY);
        return res.status(200).json({ message: "Password updated successfully", token });
    }
    return next(new Error_1.AppError("Invalid email or check old password", 400));
});
