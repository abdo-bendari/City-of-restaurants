import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema(
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
        max: [250, 'Description cannot exceed 250 characters'],
      },
    isActive: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
        type:String,
        default : ""
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
categorySchema.post("init", function (doc) {
    if (doc.imageUrl) {
      doc.imageUrl =`http://localhost:3000/uploads/categories/${doc.imageUrl}`;
    }
  });

const Category = mongoose.model("Category", categorySchema);
export default Category;
