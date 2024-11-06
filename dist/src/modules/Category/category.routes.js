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
const C = __importStar(require("./controller/category.controller"));
const validation_1 = __importDefault(require("../../middleware/validation"));
const category_validation_1 = __importDefault(require("./category.validation"));
const categoryRouter = (0, express_1.Router)();
categoryRouter
    .post("/", authentication_1.default, (0, authentication_1.allowedTo)('admin'), (0, validation_1.default)(category_validation_1.default), C.createCategory)
    .get("/", authentication_1.default, C.getCategories)
    .get("/one", authentication_1.default, C.getOneByNameOrId)
    .put("/:id", authentication_1.default, (0, authentication_1.allowedTo)('admin'), C.updateCategory)
    .delete('/:id', authentication_1.default, (0, authentication_1.allowedTo)("admin"), C.deleteCategory);
exports.default = categoryRouter;
