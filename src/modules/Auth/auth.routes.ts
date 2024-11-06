import { changeUserPassword, signIn, signUp } from './controller/auth.controller';
import { Router } from "express";
import { checkEmail } from '../../middleware/checkEmail';
import validation from '../../middleware/validation';
import addUserSchema from './auth.validation';


const authRouter =  Router();

authRouter.
post("/signUp",checkEmail,validation(addUserSchema),signUp )
.post("/signIn",signIn )
.patch('/' ,changeUserPassword)

export default authRouter;