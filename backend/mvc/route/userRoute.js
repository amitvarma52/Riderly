/** @format */

import express from "express";
import { loginController, registerController, userAllVehicle } from "../controller/userController.js";
import { userAuth } from "../../userMiddleware.js";
const userRouter = express.Router();

// login
userRouter.post("/login", loginController);
//register
userRouter.post("/register", registerController);
//register
userRouter.get("/userAllVehicles",userAuth, userAllVehicle);
export default userRouter;
