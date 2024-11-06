"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const orderSchema = new mongoose_2.Schema({
    orderItems: [{
            food: {
                type: mongoose_2.Schema.Types.ObjectId,
                ref: 'Food',
                required: true,
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                min: 0
            }
        }],
    buyer: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["preparing", "prepared", "on the way", "delivered"],
        default: "preparing",
    },
    code: {
        type: String,
        unique: true,
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: Date,
    paymentType: {
        type: String,
        enum: ['card', 'cash'],
        default: 'cash'
    },
    address: {
        city: String,
        street: String,
    },
    phone: String
}, {
    timestamps: true,
    versionKey: false,
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
