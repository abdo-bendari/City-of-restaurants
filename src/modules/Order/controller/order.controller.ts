import catchError from "../../../middleware/catchError";
import { AppError } from "../../../utils/Error";
import Order from "../../../../database/models/Order";
import {Response , Request , NextFunction} from 'express';
import Food from "../../../../database/models/Food";

export const createOrder = catchError(async (req : Request , res : Response ,next : NextFunction) =>{
    const {orderItems , buyer , isDelivered , totalPrice , status , deliveredAt , code , phone , address ,paymentType    } = req.body;
    if (!orderItems || !phone || !address || !paymentType){
        return next(new AppError("Please provide all data",400));
    }
    const itemsWithPrices = await Promise.all(
        orderItems.map(async (item: { food: string, quantity: number }) => {
            const food = await Food.findById(item.food);
            if (!food) {
                return next(new AppError("Food item not found", 404));
            }
            return {
                food: item.food,
                quantity: item.quantity,
                price: food.price, 
            };
        })
    );
    const totalOrderPrice = itemsWithPrices.reduce((acc: number, item) => acc + item.price * item.quantity, 0);
    const order = new Order({
        orderItems : itemsWithPrices, 
        buyer : req.user?.userId, 
        isDelivered , 
        totalPrice : totalOrderPrice, 
        status , 
        deliveredAt , 
        code , 
        phone , 
        address ,
        paymentType 
      })
        await order.save();
        return res.status(201).json({message : "new order created successfully",order});
    });
    
    export const getAll = catchError(async (req : Request, res : Response,next : NextFunction) =>{
        const orders = await Order.find();
        return orders.length == 0 ?
        next(new AppError('not found any items',404)) :
        res.status(201).json({message :'success',totalCount : orders.length,orders});
    })

    export const changeOrderStatus =catchError(async(req : Request,res : Response,next : NextFunction)=>{
        const {id} = req.params;
        if(!id) return next(new AppError('Please provide id',400));
    
        const order = await Order.findByIdAndUpdate(
            id,
            {
              status : req.body.status,
            },
            { new: true }
        );
        if (!order) {
            return next(new AppError('order not found', 404));
        }
        res.status(201).json({ message: 'order updated successfully', order });
    })

    export const deleteOrder =catchError(async(req : Request,res : Response,next : NextFunction)=>{
        const {id} = req.params;
        if(!id) return next(new AppError('Please provide id',400));
        const order = await Order.findByIdAndDelete(id)
        return !order?
        next(new AppError('order not found',404)) :
        res.status(201).json({message :'order item was deleted successfully'})
    })