"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addFoodSchema = joi_1.default.object({
    title: joi_1.default.string()
        .min(2)
        .max(50)
        .required()
        .messages({
        'string.base': 'Title must be a string',
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title must be at least 2 characters',
        'string.max': 'Title must not exceed 50 characters',
        'any.required': 'Title is required',
    }),
    description: joi_1.default.string()
        .max(250)
        .required()
        .messages({
        'string.base': 'Description must be a string',
        'string.max': 'Description cannot exceed 250 characters',
        'any.required': 'Description is required',
    }),
    foodTags: joi_1.default.string().allow(''),
    isAvailable: joi_1.default.boolean()
        .default(true)
        .messages({
        'boolean.base': 'isAvailable must be a boolean value',
    }),
    code: joi_1.default.string().allow(''),
    category: joi_1.default.string().hex().length(24).allow(null),
    restaurant: joi_1.default.string()
        .hex()
        .length(24)
        .required()
        .messages({
        'string.base': 'Restaurant ID must be a string',
        'string.hex': 'Restaurant ID must be a valid hexadecimal',
        'string.length': 'Restaurant ID must be 24 characters long',
        'any.required': 'Restaurant ID is required',
    }),
    rating: joi_1.default.number()
        .min(1)
        .max(5)
        .default(1)
        .messages({
        'number.base': 'Rating must be a number',
        'number.min': 'Rating cannot be less than 1',
        'number.max': 'Rating cannot exceed 5',
    }),
    price: joi_1.default.number()
        .min(0)
        .required()
        .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price must be a positive number',
        'any.required': 'Price is required',
    }),
    imagesUrl: joi_1.default.array()
        .items(joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: joi_1.default.number().max(5242880).required(), // حجم الملف يجب ألا يتجاوز 5 ميجابايت
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
    }))
        .required()
        .messages({
        'array.base': 'Images must be an array of files',
        'any.required': 'At least one image is required',
    }),
});
exports.default = addFoodSchema;
