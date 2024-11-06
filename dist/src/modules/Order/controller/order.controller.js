"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.changeOrderStatus = exports.getAll = exports.createOrder = void 0;
const catchError_1 = __importDefault(require("../../../middleware/catchError"));
const Error_1 = require("../../../utils/Error");
const Order_1 = __importDefault(require("../../../../database/models/Order"));
const Food_1 = __importDefault(require("../../../../database/models/Food"));
exports.createOrder = (0, catchError_1.default)(async (req, res, next) => {
    const { orderItems, buyer, isDelivered, totalPrice, status, deliveredAt, code, phone, address, paymentType } = req.body;
    if (!orderItems || !phone || !address || !paymentType) {
        return next(new Error_1.AppError("Please provide all data", 400));
    }
    const itemsWithPrices = await Promise.all(orderItems.map(async (item) => {
        const food = await Food_1.default.findById(item.food);
        if (!food) {
            return next(new Error_1.AppError("Food item not found", 404));
        }
        return {
            food: item.food,
            quantity: item.quantity,
            price: food.price,
        };
    }));
    const totalOrderPrice = itemsWithPrices.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = new Order_1.default({
        orderItems: itemsWithPrices,
        buyer: req.user?.userId,
        isDelivered,
        totalPrice: totalOrderPrice,
        status,
        deliveredAt,
        code,
        phone,
        address,
        paymentType
    });
    await order.save();
    return res.status(201).json({ message: "new order created successfully", order });
});
exports.getAll = (0, catchError_1.default)(async (req, res, next) => {
    const orders = await Order_1.default.find();
    return orders.length == 0 ?
        next(new Error_1.AppError('not found any items', 404)) :
        res.status(201).json({ message: 'success', totalCount: orders.length, orders });
});
exports.changeOrderStatus = (0, catchError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError('Please provide id', 400));
    const order = await Order_1.default.findByIdAndUpdate(id, {
        status: req.body.status,
    }, { new: true });
    if (!order) {
        return next(new Error_1.AppError('order not found', 404));
    }
    res.status(201).json({ message: 'order updated successfully', order });
});
exports.deleteOrder = (0, catchError_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new Error_1.AppError('Please provide id', 400));
    const order = await Order_1.default.findByIdAndDelete(id);
    return !order ?
        next(new Error_1.AppError('order not found', 404)) :
        res.status(201).json({ message: 'order item was deleted successfully' });
});
