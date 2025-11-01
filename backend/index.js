// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import mongoose from "mongoose";
// import connectDb from "./config/db.js";
// import authRouter from "./routes/auth.routes.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// const app = express();
// const port = process.env.PORT  || 5000;

// //middleware 
// app.use(express.json());
// app.use(cors({
//     origin : "http://localhost:5173",
//     credentials : true
// }));
// app.use(cookieParser());
// app.use("/api/auth",authRouter)


// app.listen(port,()=>{
//     connectDb();
//     console.log("Server is started");
// })
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);



// Connect DB then start server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => console.error("DB connection failed:", err));
