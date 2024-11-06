"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.getOneByNameOrId = exports.getRestaurants = exports.createRestaurant = void 0;
const Restaurant_1 = __importDefault(require("../../../../database/models/Restaurant"));
const Error_1 = require("../../../utils/Error");
const catchError_1 = __importDefault(require("../../../middleware/catchError"));
exports.createRestaurant = (0, catchError_1.default)(async (req, res, next) => {
    const { title, logoUrl, imagesUrl, coords, code, pickup, isOpen, delivery, rating, ratingCount, foods } = req.body;
    if (!title || !coords) {
        return next(new Error_1.AppError("Please provide title and coords", 400));
    }
    const files = req.files;
    req.body.logoUrl = files?.logoUrl?.[0]?.filename || null;
    req.body.imagesUrl = files?.imagesUrl?.map(img => img.filename) || [];
    const restaurant = new Restaurant_1.default({
        title,
        logoUrl: req.body.logoUrl,
        imagesUrl: req.body.imagesUrl,
        coords,
        code,
        pickup,
        isOpen,
        delivery,
        rating,
        ratingCount,
        foods
    });
    await restaurant.save();
    return res.status(201).json({ message: "Restaurant created successfully", restaurant });
});
exports.getRestaurants = (0, catchError_1.default)(async (req, res, next) => {
    const restaurants = await Restaurant_1.default.find();
    return restaurants.length == 0 ?
        next(new Error_1.AppError('not found any restaurants', 404)) :
        res.status(201).json({ message: 'success', totalCount: restaurants.length, restaurants });
});
exports.getOneByNameOrId = (0, catchError_1.default)(async (req, res, next) => {
    const { title, id } = req.query;
    if (!title && !id)
        return next(new Error_1.AppError('Please provide title or id', 400));
    const restaurant = await Restaurant_1.default.findOne({ $or: [{ title: title }, { _id: id }] });
    if (!restaurant) {
        return next(new Error_1.AppError('restaurant not found', 404));
    }
    return res.status(201).json({ message: 'success', restaurant });
});
exports.updateRestaurant = (0, catchError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError('Please provide id', 400));
    const { title, logoUrl, imagesUrl, coords, code, pickup, isOpen, delivery, rating, ratingCount, foods } = req.body;
    const restaurant = await Restaurant_1.default.findByIdAndUpdate(id, {
        title,
        logoUrl,
        imagesUrl,
        coords,
        code,
        pickup,
        isOpen,
        delivery,
        rating,
        ratingCount,
        foods
    }, { new: true });
    if (!restaurant) {
        return next(new Error_1.AppError('restaurant not found', 404));
    }
    res.status(201).json({ message: 'restaurant updated successfully', restaurant });
});
exports.deleteRestaurant = (0, catchError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError('Please provide id', 400));
    const restaurant = await Restaurant_1.default.findByIdAndDelete(id);
    return !restaurant ?
        next(new Error_1.AppError('restaurant not found', 404)) :
        res.status(201).json({ message: 'restaurant deleted successfully' });
});
