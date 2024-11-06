import { AppError } from "./utils/Error";
import globalError from "./middleware/globalError";
import express, { Express, Request, Response, NextFunction } from "express";
import authRouter from "./modules/Auth/auth.routes";
import userRouter from "./modules/User/user.routes";
import restaurantRouter from "./modules/Restaurant/restaurant.routes";
import categoryRouter from "./modules/Category/category.routes";
import foodRouter from "./modules/Food/food.routes";
import ordersRouter from "./modules/Order/order.routes";
const bootstrap = (app: Express) => {
  process.on("uncaughtException", (err: Error) => {
    console.error("Uncaught Exception:", err);
  });
  app.use(express.json());
  const baseUrl = "/api/v1";
  app.use('/uploads',express.static('uploads'))
  // Uncomment these routes once you have the routers ready
  app.use(`${baseUrl}/auth`, authRouter);
  app.use(`${baseUrl}/users`, userRouter);
  app.use(`${baseUrl}/restaurants`, restaurantRouter);
  app.use(`${baseUrl}/categories`, categoryRouter);
  app.use(`${baseUrl}/foods`, foodRouter);
  app.use(`${baseUrl}/orders`, ordersRouter);
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError("Route not found", 404));
  });
  process.on("unhandledRejection", (err: Error) => {
    console.error("Unhandled Rejection:", err);
  });
  app.use(globalError);
};

export default bootstrap;
