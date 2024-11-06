import { Router } from "express";
import protectedRoutes, { allowedTo } from "../../middleware/authentication";
import * as O from "./controller/order.controller";
import addOrderSchema from "./order.validation";
import validation from "../../middleware/validation";

const ordersRouter = Router();

ordersRouter
.post("/",protectedRoutes,allowedTo("client"),validation(addOrderSchema),O.createOrder)
.get('/',protectedRoutes,allowedTo("admin","vendor"),O.getAll)
.patch('/:id',protectedRoutes,allowedTo("admin","vendor"),O.changeOrderStatus)
.delete('/:id',protectedRoutes,allowedTo("admin","vendor"),O.deleteOrder)
export default ordersRouter;