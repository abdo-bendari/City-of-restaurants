import catchError from "../../../middleware/catchError";
import { AppError } from "../../../utils/Error";
import Category from "../../../../database/models/Category";
import { NextFunction , Request,Response} from "express";

export const createCategory = catchError(async (req : Request , res : Response ,next : NextFunction) =>{
    const {title , description , imageUrl} = req.body;
    if (!title || !description){
        return next(new AppError("Please provide title and description",400));
    }
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    req.body.imageUrl = files?.imageUrl?.[0]?.filename || null;
    const category = new Category({
        title,
        description,
        imageUrl,
      })
        await category.save();
        return res.status(201).json({message : "category created successfully",category});
    });

    export const getCategories = catchError(async (req : Request, res : Response,next : NextFunction) =>{
        const categories = await Category.find();
        return categories.length == 0 ?
        next(new AppError('not found any categories',404)) :
        res.status(201).json({message :'success',totalCount : categories.length,categories});
    })
    
    export const getOneByNameOrId = catchError(async (req : Request, res : Response,next : NextFunction) =>{
        const{title , id} = req.query;
        if(!title &&!id) return next(new AppError('Please provide title or id',400));
        const category = await Category.findOne({$or : [{title : title}, {_id : id}]});
        if(!category){
         return next(new AppError('category not found',404))
        }
         return res.status(201).json({message :'success',category })
    })

    export const updateCategory=catchError(async(req : Request,res : Response,next : NextFunction)=>{
        const {id} = req.params;
        if(!id) return next(new AppError('Please provide id',400));
        const {title , description , imageUrl} = req.body;
        const category = await Category.findByIdAndUpdate(
            id,
            {
                title,
                description,
                imageUrl
            },
            { new: true }
        );
        if (!category) {
            return next(new AppError('category not found', 404));
        }
        res.status(201).json({ message: 'category updated successfully', category });
    })
    export const deleteCategory =catchError(async(req : Request,res : Response,next : NextFunction)=>{
        const {id} = req.params;
        if(!id) return next(new AppError('Please provide id',400));
        const category = await Category.findByIdAndDelete(id)
        return !category?
        next(new AppError('category not found',404)) :
        res.status(201).json({message :'category deleted successfully'})
    })