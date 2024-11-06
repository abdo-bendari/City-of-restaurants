"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const restaurantSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        unique: [true, "title is unique"],
        min: [2, "min length is 2 character"],
        max: [50, "max length is 50 character"],
    },
    pickup: {
        type: Boolean,
        default: true,
    },
    delivery: {
        type: Boolean,
        default: true,
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    foods: {
        type: [String],
        default: [],
    },
    address: {
        type: [String],
        default: [],
    },
    imagesUrl: {
        type: [String],
        default: [],
    },
    logoUrl: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    ratingCount: String,
    code: {
        type: String,
        unique: true,
    },
    coords: {
        id: String,
        latitude: Number,
        latitudeDelta: Number,
        longitude: Number,
        longitudeDelta: Number,
        address: String,
        title: String,
    },
}, {
    timestamps: true,
    versionKey: false,
});
restaurantSchema.post('init', function (doc) {
    if (doc.logoUrl)
        doc.logoUrl = `http://localhost:3000/uploads/restaurant/${doc.logoUrl}`;
    if (doc.imagesUrl)
        doc.imagesUrl = doc.imagesUrl.map(img => `http://localhost:3000/uploads/restaurant/${img}`);
});
const Restaurant = mongoose_1.default.model("Restaurant", restaurantSchema);
exports.default = Restaurant;
