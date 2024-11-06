import { Router } from 'express';
import * as U from './controller/user.controller';
import protectedRoutes, { allowedTo } from '../../middleware/authentication';

const userRouter = Router();

userRouter
.get('/:id',protectedRoutes,U.getUser)
.put('/',protectedRoutes,allowedTo('client'),U.updateProfile)
.delete('/:id',protectedRoutes,allowedTo('admin'),U.deleteAccount)
.get('/',protectedRoutes,allowedTo('admin'),U.allUsers)

export default userRouter;