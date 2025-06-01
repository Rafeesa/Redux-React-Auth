import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoute from "./route/userRoute.js"
dotenv.config()


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log(err)
})

const app=express();
app.use(express.json())


app.listen(3000,()=>{
    console.log("server listerning on port 3000")
})

app.use("/api/user",userRoute)