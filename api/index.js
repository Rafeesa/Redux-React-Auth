import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./route/userRoute.js";
import authRoute from "./route/authRoute.js"; 

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json()); 

// ROUTES
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute); 

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
