import User from "../../../../database/models/User";
import { AppError } from "../../../utils/Error";
import catchError from "../../../middleware/catchError";
import { NextFunction , Request,Response} from "express";


export const getUser = catchError(async(req : Request, res : Response, next : NextFunction)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(!user){
     return next(new AppError('not found user',404))
    }
     return res.status(201).json({message :'done',user })
})

export const updateProfile =catchError(async(req : Request,res : Response,next : NextFunction)=>{
    const user = await User.findByIdAndUpdate(
         req.user?.userId,
        req.body,
        { new: true }
    );
    if (!user) {
        return next(new AppError('user not found', 404));
    }
    res.status(201).json({ message: 'User updated successfully', user });
})
export const deleteAccount =catchError(async(req : Request,res : Response,next : NextFunction)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    return !user?
    next(new AppError('not found user',404)) :
    res.status(201).json({message :'User deleted successfully',user})
})
export const allUsers = catchError(async(req : Request,res : Response,next : NextFunction)=>{
    const users = await User.find().select('-password');
    return users.length == 0 ?
    next(new AppError('not found users',404)) :
    res.status(201).json({message :'success',users})
})