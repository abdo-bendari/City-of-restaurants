import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderItems :[{
        food :{
            type: Schema.Types.ObjectId,
            ref : 'Food',
            required : true,
        },
        quantity :{
            type : Number ,
            default : 1
        },
        price :{
            type : Number ,
            min : 0
        }
    }],
    buyer: {
      type: Schema.Types.ObjectId,
      ref : "User"
    },
    status: {
      type: String,
      enum: ["preparing","prepared","on the way","delivered"],
      default: "preparing",
    },
    code: {
      type: String,
      unique: true,
    },
    totalPrice : {
        type : Number ,
        default : 0
    },
    isDelivered : {
        type : Boolean,
        default : false
    },
    deliveredAt : Date ,
    paymentType : {
        type : String ,
        enum : ['card','cash'],
        default : 'cash'
    },
    address :{
    city: String,
    street: String,
    },
    phone : String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
