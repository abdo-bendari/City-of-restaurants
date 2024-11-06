"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.getFoodByRestaurant = exports.getOneByNameOrId = exports.getAll = exports.addFood = void 0;
const catchError_1 = __importDefault(require("../../../middleware/catchError"));
const Error_1 = require("../../../utils/Error");
const Food_1 = __importDefault(require("../../../../database/models/Food"));
exports.addFood = (0, catchError_1.default)(async (req, res, next) => {
    const { title, description, price, rating, restaurant, category, code, isAvailable, foodTags, imagesUrl } = req.body;
    if (!title || !description || !price || !restaurant || !category) {
        return next(new Error_1.AppError("Please provide all data", 400));
    }
    const files = req.files;
    req.body.imagesUrl = files?.imagesUrl?.map(img => img.filename) || [];
    const food = new Food_1.default({
        title,
        description,
        price,
        rating,
        restaurant,
        category,
        code,
        isAvailable,
        foodTags,
        imagesUrl: req.body.imagesUrl
    });
    await food.save();
    return res.status(201).json({ message: "new item food added successfully", food });
});
exports.getAll = (0, catchError_1.default)(async (req, res, next) => {
    const foods = await Food_1.default.find();
    return foods.length == 0 ?
        next(new Error_1.AppError('not found any items', 404)) :
        res.status(201).json({ message: 'success', totalCount: foods.length, foods });
});
exports.getOneByNameOrId = (0, catchError_1.default)(async (req, res, next) => {
    const { title, id } = req.query;
    if (!title && !id)
        return next(new Error_1.AppError('Please provide title or id', 400));
    const food = await Food_1.default.findOne({ $or: [{ title: title }, { _id: id }] }).populate('restaurant').populate('category');
    if (!food) {
        return next(new Error_1.AppError('food not found', 404));
    }
    return res.status(201).json({ message: 'success', food });
});
exports.getFoodByRestaurant = (0, catchError_1.default)(async (req, res, next) => {
    const { restaurantId } = req.params;
    if (!restaurantId)
        return next(new Error_1.AppError('Please provide id', 400));
    const foods = await Food_1.default.findOne({ restaurant: restaurantId });
    if (!foods) {
        return next(new Error_1.AppError('restaurant not found', 404));
    }
    return res.status(201).json({ message: 'success', foods });
});
exports.updateFood = (0, catchError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError('Please provide id', 400));
    const { title, description, price, rating, restaurant, category, code, isAvailable, foodTags, imagesUrl } = req.body;
    const food = await Food_1.default.findByIdAndUpdate(id, {
        title,
        description,
        price,
        rating,
        restaurant,
        category,
        code,
        isAvailable,
        foodTags,
        imagesUrl
    }, { new: true });
    if (!food) {
        return next(new Error_1.AppError('food not found', 404));
    }
    res.status(201).json({ message: 'food item was updated successfully', food });
});
exports.deleteFood = (0, catchError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError('Please provide id', 400));
    const food = await Food_1.default.findByIdAndDelete(id);
    return !food ?
        next(new Error_1.AppError('food not found', 404)) :
        res.status(201).json({ message: 'food item was deleted successfully' });
});
