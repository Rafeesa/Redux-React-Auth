import express from "express"
import {test,updateUser} from "../controllers/usercontroller.js"
import { verifyToken } from "../utils/verifyUser.js"
const router=express.Router()


router.get("/",test)
router.post("/update/:id",verifyToken,updateUser)

export default router