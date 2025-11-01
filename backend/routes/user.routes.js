import express from "express";
import { askToAssistant, getCurrentUser, updateAssistant } from "../controllers/user.controllers.js";
const userRouter = express.Router();
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js"



userRouter.get("/current",isAuth ,getCurrentUser);
userRouter.post("/update" ,isAuth,upload.single("assistantImage"),updateAssistant);
userRouter.post("/asktoassistant",isAuth,askToAssistant);
export default userRouter;
