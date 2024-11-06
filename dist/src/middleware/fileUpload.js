"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMixFiles = exports.uploadSingleFile = exports.fileUpload = void 0;
const Error_1 = require("./../utils/Error");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
// File upload function with custom storage and filter options
const fileUpload = (folderName) => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`);
        },
        filename: function (req, file, cb) {
            cb(null, (0, uuid_1.v4)() + '-' + file.originalname);
        }
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {
            cb(new Error_1.AppError("invalid format", 400));
        }
    };
    const upload = (0, multer_1.default)({ storage, fileFilter });
    return upload;
};
exports.fileUpload = fileUpload;
// Single file upload handler (for fields like imageUrl or logoUrl)
const uploadSingleFile = (fieldName, folderName) => (0, exports.fileUpload)(folderName).single(fieldName);
exports.uploadSingleFile = uploadSingleFile;
// Multiple files upload handler (for fields like imagesUrl)
const uploadMixFiles = (arrayOfFields, folderName) => (0, exports.fileUpload)(folderName).fields(arrayOfFields);
exports.uploadMixFiles = uploadMixFiles;
