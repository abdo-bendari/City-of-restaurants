import catchError from "../../../middleware/catchError";
import { AppError } from "../../../utils/Error";
import Food from "../../../../database/models/Food";
import { NextFunction , Request,Response} from "express";


export const addFood = catchError(async (req : Request , res : Response ,next : NextFunction) =>{
    const {title , description , price , rating , restaurant , category , code , isAvailable , foodTags , imagesUrl   } = req.body;
    if (!title || !description || !price || !restaurant || !category){
        return next(new AppError("Please provide all data",400));
    }
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    req.body.imagesUrl = files?.imagesUrl?.map(img => img.filename) || [];

    const food = new Food({
        title , 
        description ,
        price ,
        rating ,
        restaurant ,
        category ,
        code ,
        isAvailable ,
        foodTags ,
        imagesUrl : req.body.imagesUrl 
      })
        await food.save();
        return res.status(201).json({message : "new item food added successfully",food});
    });

    export const getAll = catchError(async (req : Request, res : Response,next : NextFunction) =>{
        const foods = await Food.find();
        return foods.length == 0 ?
        next(new AppError('not found any items',404)) :
        res.status(201).json({message :'success',totalCount : foods.length,foods});
    })
    
    export const getOneByNameOrId = catchError(async (req : Request, res : Response,next : NextFunction) =>{
        const{title , id} = req.query;
        if(!title &&!id) return next(new AppError('Please provide title or id',400));
        const food = await Food.findOne({$or : [{title : title}, {_id : id}]}).populate('restaurant').populate('category')
        if(!food){
         return next(new AppError('food not found',404))
        }
         return res.status(201).json({message :'success',food })
    })

    export const getFoodByRestaurant = catchError(async (req : Request, res : Response,next : NextFunction) =>{
        const{restaurantId} = req.params;
        if(!restaurantId) return next(new AppError('Please provide id',400));
        const foods = await Food.findOne({restaurant : restaurantId})
        if(!foods){
         return next(new AppError('restaurant not found',404))
        }
         return res.status(201).json({message :'success',foods })
    })


    export const updateFood=catchError(async(req : Request,res : Response,next : NextFunction)=>{
        const {id} = req.params;
        if(!id) return next(new AppError('Please provide id',400));
        const {title , description , price , rating , restaurant , category , code , isAvailable , foodTags , imagesUrl   } = req.body;
        const food = await Food.findByIdAndUpdate(
            id,
            {
            title , 
            description ,
            price ,
            rating ,
            restaurant ,
            category ,
             code ,
            isAvailable ,
            foodTags ,
            imagesUrl 
            },
            { new: true }
        );
        if (!food) {
            return next(new AppError('food not found', 404));
        }
        res.status(201).json({ message: 'food item was updated successfully', food });
    })
    export const deleteFood =catchError(async(req : Request,res : Response,next : NextFunction)=>{
        const {id} = req.params;
        if(!id) return next(new AppError('Please provide id',400));
        const food = await Food.findByIdAndDelete(id)
        return !food?
        next(new AppError('food not found',404)) :
        res.status(201).json({message :'food item was deleted successfully'})
    })