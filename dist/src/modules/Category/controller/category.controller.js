"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getOneByNameOrId = exports.getCategories = exports.createCategory = void 0;
const catchError_1 = __importDefault(require("../../../middleware/catchError"));
const Error_1 = require("../../../utils/Error");
const Category_1 = __importDefault(require("../../../../database/models/Category"));
exports.createCategory = (0, catchError_1.default)(async (req, res, next) => {
    const { title, description, imageUrl } = req.body;
    if (!title || !description) {
        return next(new Error_1.AppError("Please provide title and description", 400));
    }
    const files = req.files;
    req.body.imageUrl = files?.imageUrl?.[0]?.filename || null;
    const category = new Category_1.default({
        title,
        description,
        imageUrl,
    });
    await category.save();
    return res.status(201).json({ message: "category created successfully", category });
});
exports.getCategories = (0, catchError_1.default)(async (req, res, next) => {
    const categories = await Category_1.default.find();
    return categories.length == 0 ?
        next(new Error_1.AppError('not found any categories', 404)) :
        res.status(201).json({ message: 'success', totalCount: categories.length, categories });
});
exports.getOneByNameOrId = (0, catchError_1.default)(async (req, res, next) => {
    const { title, id } = req.query;
    if (!title && !id)
        return next(new Error_1.AppError('Please provide title or id', 400));
    const category = await Category_1.default.findOne({ $or: [{ title: title }, { _id: id }] });
    if (!category) {
        return next(new Error_1.AppError('category not found', 404));
    }
    return res.status(201).json({ message: 'success', category });
});
exports.updateCategory = (0, catchError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError('Please provide id', 400));
    const { title, description, imageUrl } = req.body;
    const category = await Category_1.default.findByIdAndUpdate(id, {
        title,
        description,
        imageUrl
    }, { new: true });
    if (!category) {
        return next(new Error_1.AppError('category not found', 404));
    }
    res.status(201).json({ message: 'category updated successfully', category });
});
exports.deleteCategory = (0, catchError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError('Please provide id', 400));
    const category = await Category_1.default.findByIdAndDelete(id);
    return !category ?
        next(new Error_1.AppError('category not found', 404)) :
        res.status(201).json({ message: 'category deleted successfully' });
});
