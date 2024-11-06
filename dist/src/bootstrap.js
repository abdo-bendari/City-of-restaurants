"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("./utils/Error");
const globalError_1 = __importDefault(require("./middleware/globalError"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./modules/Auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/User/user.routes"));
const restaurant_routes_1 = __importDefault(require("./modules/Restaurant/restaurant.routes"));
const category_routes_1 = __importDefault(require("./modules/Category/category.routes"));
const food_routes_1 = __importDefault(require("./modules/Food/food.routes"));
const order_routes_1 = __importDefault(require("./modules/Order/order.routes"));
const bootstrap = (app) => {
    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
    });
    app.use(express_1.default.json());
    const baseUrl = "/api/v1";
    app.use('/uploads', express_1.default.static('uploads'));
    // Uncomment these routes once you have the routers ready
    app.use(`${baseUrl}/auth`, auth_routes_1.default);
    app.use(`${baseUrl}/users`, user_routes_1.default);
    app.use(`${baseUrl}/restaurants`, restaurant_routes_1.default);
    app.use(`${baseUrl}/categories`, category_routes_1.default);
    app.use(`${baseUrl}/foods`, food_routes_1.default);
    app.use(`${baseUrl}/orders`, order_routes_1.default);
    app.use("*", (req, res, next) => {
        next(new Error_1.AppError("Route not found", 404));
    });
    process.on("unhandledRejection", (err) => {
        console.error("Unhandled Rejection:", err);
    });
    app.use(globalError_1.default);
};
exports.default = bootstrap;
