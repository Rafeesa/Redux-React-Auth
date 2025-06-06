import User from "../models/userModel.js"; 
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


export const signup = async (req, res, next) => {
  console.log("signup hitched");

  const { username, email, phone, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email is already registered"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, phone, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    next(err);
  }
};


export const signin=async (req,res,next)=>
{
  const {email,password}=req.body
  try {
    const validUser=await User.findOne({email:email})
    if(!validUser)
    {
      return next(errorHandler(404,"user not found"))
    }
    const validPassword=bcryptjs.compareSync(password,validUser.password)
    if(!validPassword)
    {
      return next(errorHandler(401,"wrong usercredential"))
    }
    const token = jwt.sign({ id: validUser._id,isAdmin: validUser.isAdmin  }, process.env.JWT_SECRET);
    const {password:hashPassword,...rest}=validUser._doc
    const expiryDate=new Date(Date.now()+3600000)
   res.cookie("access_token", token, {
  httpOnly: true,
  expires: expiryDate
}).status(200).json({ ...rest, token }); 

  } catch (error) {
    next(error)
    
  }
}
export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};