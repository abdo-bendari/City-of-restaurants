import { allowedTo } from './../../middleware/authentication';
import { Router } from "express";
import protectedRoutes from "../../middleware/authentication";
import * as R from "./controller/restaurant.controller";
import { uploadMixFiles } from '../../middleware/fileUpload';
import validation from '../../middleware/validation';
import addRestaurantSchema from './restaurant.validation';


const restaurantRouter= Router();

restaurantRouter
.post('/',protectedRoutes,allowedTo("admin"),uploadMixFiles([{name :"logoUrl", maxCount:1},{name : "imagesUrl",maxCount : 10}],"restaurant"),validation(addRestaurantSchema),R.createRestaurant)
.get('/',R.getRestaurants)
.get("/one",protectedRoutes,R.getOneByNameOrId)
.put("/:id",protectedRoutes,allowedTo('vendor','admin'),R.updateRestaurant)
.delete('/:id',protectedRoutes,allowedTo("admin"),R.deleteRestaurant)

export default restaurantRouter;