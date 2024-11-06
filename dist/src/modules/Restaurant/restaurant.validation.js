"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// إعداد الفاليديشن
const addRestaurantSchema = joi_1.default.object({
    title: joi_1.default.string()
        .min(2)
        .max(50)
        .required()
        .messages({
        'string.empty': 'Title cannot be empty',
        'any.required': 'Title is required',
        'string.min': 'Title must be at least 2 characters',
        'string.max': 'Title must be less than 50 characters',
    }),
    pickup: joi_1.default.boolean().default(true),
    delivery: joi_1.default.boolean().default(true),
    isOpen: joi_1.default.boolean().default(true),
    foods: joi_1.default.array().items(joi_1.default.string()).default([]),
    address: joi_1.default.array().items(joi_1.default.string()).default([]),
    imagesUrl: joi_1.default.array().items(joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: joi_1.default.number().max(5242880).required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
    })).default([]),
    logoUrl: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: joi_1.default.number().max(5242880).required(),
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
    }).optional(),
    rating: joi_1.default.number()
        .min(1)
        .max(5)
        .default(1),
    ratingCount: joi_1.default.string().optional(),
    code: joi_1.default.string().optional(),
    coords: joi_1.default.object({
        id: joi_1.default.string().optional(),
        latitude: joi_1.default.number().optional(),
        latitudeDelta: joi_1.default.number().optional(),
        longitude: joi_1.default.number().optional(),
        longitudeDelta: joi_1.default.number().optional(),
        address: joi_1.default.string().optional(),
        title: joi_1.default.string().optional(),
    }).optional(),
});
// تصدير الفاليديشن
exports.default = addRestaurantSchema;
