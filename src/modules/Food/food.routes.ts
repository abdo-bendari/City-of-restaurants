import { Router } from "express";
import protectedRoutes, { allowedTo } from "../../middleware/authentication";
import * as F from "./controller/food.controller";
import { uploadMixFiles } from "../../middleware/fileUpload";
import validation from "../../middleware/validation";
import addFoodSchema from "./food.validation";
const foodRouter = Router()
foodRouter
.post("/",protectedRoutes,allowedTo('admin','vendor'),uploadMixFiles([{name : "imagesUrl",maxCount : 10}],"foods"),validation(addFoodSchema),F.addFood)
.get("/",protectedRoutes,F.getAll)
.get("/one",protectedRoutes,F.getOneByNameOrId)
.get("/:restaurantId",protectedRoutes,F.getFoodByRestaurant)
.put("/:id",protectedRoutes,allowedTo('admin','vendor'),F.updateFood)
.delete('/:id',protectedRoutes,allowedTo("admin",'vendor'),F.deleteFood)

export default foodRouter