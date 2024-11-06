import { Router } from "express";
import protectedRoutes, { allowedTo } from "../../middleware/authentication";
import * as C from "./controller/category.controller";
import validation from "../../middleware/validation";
import addCategorySchema from "./category.validation";


const categoryRouter = Router();
 categoryRouter
 .post("/",protectedRoutes,allowedTo('admin'),validation(addCategorySchema),C.createCategory)
 .get("/",protectedRoutes,C.getCategories)
 .get("/one",protectedRoutes,C.getOneByNameOrId)
 .put("/:id",protectedRoutes,allowedTo('admin'),C.updateCategory)
.delete('/:id',protectedRoutes,allowedTo("admin"),C.deleteCategory)
export default categoryRouter;