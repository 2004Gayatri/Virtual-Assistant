import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = process.env.PORT  || 5000;

//middleware 
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter)


app.listen(port,()=>{
    connectDb();
    console.log("Server is started");
})
