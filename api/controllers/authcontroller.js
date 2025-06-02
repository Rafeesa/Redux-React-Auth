import User from "../models/userModel.js"; 
import bcryptjs from "bcryptjs"

export const signup = async (req, res,next) => {
    console.log("signup hitched")
  
  const { username, email,phone,password } = req.body;
  const hashedPassword=bcryptjs.hashSync(password,10)
  const newUser = new User({ username, email,phone,password:hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err)
  }
};
