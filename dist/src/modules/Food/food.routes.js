"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importStar(require("../../middleware/authentication"));
const F = __importStar(require("./controller/food.controller"));
const fileUpload_1 = require("../../middleware/fileUpload");
const validation_1 = __importDefault(require("../../middleware/validation"));
const food_validation_1 = __importDefault(require("./food.validation"));
const foodRouter = (0, express_1.Router)();
foodRouter
    .post("/", authentication_1.default, (0, authentication_1.allowedTo)('admin', 'vendor'), (0, fileUpload_1.uploadMixFiles)([{ name: "imagesUrl", maxCount: 10 }], "foods"), (0, validation_1.default)(food_validation_1.default), F.addFood)
    .get("/", authentication_1.default, F.getAll)
    .get("/one", authentication_1.default, F.getOneByNameOrId)
    .get("/:restaurantId", authentication_1.default, F.getFoodByRestaurant)
    .put("/:id", authentication_1.default, (0, authentication_1.allowedTo)('admin', 'vendor'), F.updateFood)
    .delete('/:id', authentication_1.default, (0, authentication_1.allowedTo)("admin", 'vendor'), F.deleteFood);
exports.default = foodRouter;
