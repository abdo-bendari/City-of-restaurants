import mongoose from "mongoose";
import { Schema } from "mongoose";

const restaurantSchema = new Schema(
  {
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
      default:[],
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
restaurantSchema.post('init',function(doc){
  if(doc.logoUrl) doc.logoUrl= `http://localhost:3000/uploads/restaurant/${doc.logoUrl}`
  if(doc.imagesUrl) doc.imagesUrl =doc.imagesUrl.map(img=>`http://localhost:3000/uploads/restaurant/${img}`)
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
