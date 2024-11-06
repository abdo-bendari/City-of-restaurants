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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const U = __importStar(require("./controller/user.controller"));
const authentication_1 = __importStar(require("../../middleware/authentication"));
const userRouter = (0, express_1.Router)();
userRouter
    .get('/:id', authentication_1.default, U.getUser)
    .put('/', authentication_1.default, (0, authentication_1.allowedTo)('client'), U.updateProfile)
    .delete('/:id', authentication_1.default, (0, authentication_1.allowedTo)('admin'), U.deleteAccount)
    .get('/', authentication_1.default, (0, authentication_1.allowedTo)('admin'), U.allUsers);
exports.default = userRouter;
