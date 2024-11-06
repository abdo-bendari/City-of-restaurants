"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const foodSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        unique: [true, "title is unique"],
        min: [2, "min length is 2 character"],
        max: [50, "max length is 50 character"],
    },
    description: {
        type: String,
        required: [true, "title is required"],
        max: [250, "max length is 250 character"],
    },
    foodTags: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    code: String,
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    restaurant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    price: {
        type: Number,
        min: [0, "price must be positive"],
    },
    imagesUrl: {
        type: [String],
        default: []
    },
}, {
    timestamps: true,
    versionKey: false,
});
foodSchema.post('init', function (doc) {
    if (doc.imagesUrl)
        doc.imagesUrl = doc.imagesUrl.map(img => `http://localhost:3000/uploads/foods/${img}`);
});
const Food = mongoose_1.default.model("Food", foodSchema);
exports.default = Food;
