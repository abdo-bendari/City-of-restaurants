"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addOrderSchema = joi_1.default.object({
    orderItems: joi_1.default.array()
        .items(joi_1.default.object({
        food: joi_1.default.string().required().messages({
            "any.required": "Food item is required",
        }),
        quantity: joi_1.default.number().integer().min(1).required().messages({
            "any.required": "Quantity is required",
            "number.min": "Quantity must be at least 1",
        }),
        price: joi_1.default.number().min(0).required().messages({
            "any.required": "Price is required",
            "number.min": "Price must be a positive number",
        }),
    }))
        .min(1)
        .required()
        .messages({
        "array.min": "At least one order item is required",
    }),
    buyer: joi_1.default.string().required().messages({
        "any.required": "Buyer is required",
    }),
    status: joi_1.default.string()
        .valid("preparing", "prepared", "on the way", "delivered")
        .default("preparing")
        .messages({
        "any.only": "Status must be one of preparing, prepared, on the way, or delivered",
    }),
    code: joi_1.default.string().required().messages({
        "any.required": "Order code is required",
    }),
    totalPrice: joi_1.default.number().min(0).default(0).messages({
        "number.min": "Total price must be a positive number",
    }),
    isDelivered: joi_1.default.boolean().default(false),
    deliveredAt: joi_1.default.date().optional().when("isDelivered", {
        is: true,
        then: joi_1.default.date().required().messages({
            "any.required": "Delivery date is required when order is delivered",
        }),
    }),
    paymentType: joi_1.default.string()
        .valid("card", "cash")
        .default("cash")
        .messages({
        "any.only": "Payment type must be either card or cash",
    }),
    address: joi_1.default.object({
        city: joi_1.default.string().required().messages({
            "any.required": "City is required for delivery address",
        }),
        street: joi_1.default.string().required().messages({
            "any.required": "Street is required for delivery address",
        }),
    }).required(),
    phone: joi_1.default.string()
        .pattern(/^\+?\d{10,15}$/)
        .required()
        .messages({
        "any.required": "Phone number is required",
        "string.pattern.base": "Phone number must be valid",
    }),
});
exports.default = addOrderSchema;
