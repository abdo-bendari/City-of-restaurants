"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addCategorySchema = joi_1.default.object({
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
        .allow('')
        .messages({
        'string.base': 'Description must be a string',
        'string.max': 'Description cannot exceed 250 characters',
    }),
    isActive: joi_1.default.boolean()
        .default(true)
        .messages({
        'boolean.base': 'isActive must be a boolean value',
    }),
    imageUrl: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: joi_1.default.number().max(5242880).required(), // حجم الملف يجب ألا يتجاوز 5 ميجابايت
        destination: joi_1.default.string().required(),
        filename: joi_1.default.string().required(),
        path: joi_1.default.string().required(),
    }).required().messages({
        'object.base': 'Image must be an object with valid properties',
    }),
});
exports.default = addCategorySchema;
