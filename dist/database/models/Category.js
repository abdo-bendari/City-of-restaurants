"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const categorySchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        unique: [true, "title is unique"],
        min: [2, "min length is 2 character"],
        max: [50, "max length is 50 character"],
    },
    description: {
        type: String,
        max: [250, 'Description cannot exceed 250 characters'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    imageUrl: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
    versionKey: false,
});
categorySchema.post("init", function (doc) {
    if (doc.imageUrl) {
        doc.imageUrl = `http://localhost:3000/uploads/categories/${doc.imageUrl}`;
    }
});
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
