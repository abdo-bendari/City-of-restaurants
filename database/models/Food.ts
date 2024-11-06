import mongoose from "mongoose";
import { Schema } from "mongoose";

const foodSchema = new Schema(
  {
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
    code : String,
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
    },
    restaurant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Restaurant",
        required : true,
    },
    rating : {
        type : Number,
        min :1,
        max : 5,
        default : 1,
    },
   price :{
        type : Number,
        min: [0, "price must be positive"],

   },
    imagesUrl: {
        type:[String],
        default : []
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
foodSchema.post('init',function(doc){
    if(doc.imagesUrl) doc.imagesUrl =doc.imagesUrl.map(img=>`http://localhost:3000/uploads/foods/${img}`)
})
const Food = mongoose.model("Food", foodSchema);
export default Food;
