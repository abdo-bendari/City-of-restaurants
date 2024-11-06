import Restaurant from "../../../../database/models/Restaurant";
import { AppError } from "../../../utils/Error";
import catchError from "../../../middleware/catchError";
import { NextFunction , Request,Response} from "express";


export const createRestaurant = catchError(async (req : Request , res : Response ,next : NextFunction) =>{
const {title , logoUrl , imagesUrl , coords , code ,  pickup , isOpen , delivery , rating , ratingCount , foods} = req.body;
if (!title || !coords){
    return next(new AppError("Please provide title and coords",400));
}
const files = req.files as { [fieldname: string]: Express.Multer.File[] };
req.body.logoUrl = files?.logoUrl?.[0]?.filename || null;
req.body.imagesUrl = files?.imagesUrl?.map(img => img.filename) || [];
const restaurant = new Restaurant({
    title,
    logoUrl : req.body.logoUrl,
    imagesUrl : req.body.imagesUrl,
    coords,
    code,
    pickup,
    isOpen,
    delivery,
    rating,
    ratingCount,
    foods})
    await restaurant.save();
    return res.status(201).json({message : "Restaurant created successfully",restaurant});
});

export const getRestaurants = catchError(async (req : Request, res : Response,next : NextFunction) =>{
    const restaurants = await Restaurant.find();
    return restaurants.length == 0 ?
    next(new AppError('not found any restaurants',404)) :
    res.status(201).json({message :'success',totalCount : restaurants.length,restaurants});
})

export const getOneByNameOrId = catchError(async (req : Request, res : Response,next : NextFunction) =>{
    const{title , id} = req.query;
    if(!title &&!id) return next(new AppError('Please provide title or id',400));
    const restaurant = await Restaurant.findOne({$or : [{title : title}, {_id : id}]});
    if(!restaurant){
     return next(new AppError('restaurant not found',404))
    }
     return res.status(201).json({message :'success',restaurant })
})

export const updateRestaurant =catchError(async(req : Request,res : Response,next : NextFunction)=>{
    const {id} = req.params;
    if(!id) return next(new AppError('Please provide id',400));
    const {title , logoUrl , imagesUrl , coords , code ,  pickup , isOpen , delivery , rating , ratingCount , foods} = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(
        id,
        {
            title , 
            logoUrl , 
            imagesUrl , 
            coords , 
            code ,  
            pickup , 
            isOpen , 
            delivery , 
            rating , 
            ratingCount , 
            foods
        },
        { new: true }
    );
    if (!restaurant) {
        return next(new AppError('restaurant not found', 404));
    }
    res.status(201).json({ message: 'restaurant updated successfully', restaurant });
})
export const deleteRestaurant =catchError(async(req : Request,res : Response,next : NextFunction)=>{
    const {id} = req.params;
    if(!id) return next(new AppError('Please provide id',400));
    const restaurant = await Restaurant.findByIdAndDelete(id)
    return !restaurant?
    next(new AppError('restaurant not found',404)) :
    res.status(201).json({message :'restaurant deleted successfully'})
})
