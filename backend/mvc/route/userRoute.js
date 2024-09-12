/** @format */

import express from "express";
import { loginController, registerController, userAllVehicle } from "../controller/userController.js";
import { userAuth } from "../../userMiddleware.js";
import { sendMessage, userMessage } from "../controller/messageController.js";
import { sendFeedback } from "../controller/feedbackController.js";
const userRouter = express.Router();

// login
userRouter.post("/login", loginController);
//register
userRouter.post("/register", registerController);
//register
userRouter.get("/userAllVehicles",userAuth, userAllVehicle);
//send message
userRouter.post("/sendMessage",userAuth, sendMessage);
//send message
userRouter.post("/userMessage",userAuth, userMessage);
//send feedback
userRouter.post("/sendFeedback",userAuth, sendFeedback);
export default userRouter;
