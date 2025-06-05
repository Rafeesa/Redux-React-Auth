import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./route/userRoute.js";
import authRoute from "./route/authRoute.js"; 
import adminRoute from "./route/AdminRoute.js"
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json()); 
app.use(cookieParser())

// ROUTES
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute); 
app.use("/api/admin", adminRoute); 



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const message=err.message||"internal server error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
