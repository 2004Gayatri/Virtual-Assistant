import express from "express";
import { getCurrentUser, updateAssistant } from "../controllers/user.controllers.js";
const userRouter = express.Router();
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js"



userRouter.get("/current" ,getCurrentUser);
userRouter.post("/update" ,isAuth,upload.single("assistantImage"),updateAssistant);
export default userRouter;
