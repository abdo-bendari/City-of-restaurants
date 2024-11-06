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
const authentication_1 = require("./../../middleware/authentication");
const express_1 = require("express");
const authentication_2 = __importDefault(require("../../middleware/authentication"));
const R = __importStar(require("./controller/restaurant.controller"));
const fileUpload_1 = require("../../middleware/fileUpload");
const validation_1 = __importDefault(require("../../middleware/validation"));
const restaurant_validation_1 = __importDefault(require("./restaurant.validation"));
const restaurantRouter = (0, express_1.Router)();
restaurantRouter
    .post('/', authentication_2.default, (0, authentication_1.allowedTo)("admin"), (0, fileUpload_1.uploadMixFiles)([{ name: "logoUrl", maxCount: 1 }, { name: "imagesUrl", maxCount: 10 }], "restaurant"), (0, validation_1.default)(restaurant_validation_1.default), R.createRestaurant)
    .get('/', R.getRestaurants)
    .get("/one", authentication_2.default, R.getOneByNameOrId)
    .put("/:id", authentication_2.default, (0, authentication_1.allowedTo)('vendor', 'admin'), R.updateRestaurant)
    .delete('/:id', authentication_2.default, (0, authentication_1.allowedTo)("admin"), R.deleteRestaurant);
exports.default = restaurantRouter;
