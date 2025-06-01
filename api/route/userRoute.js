import express from "express"
import {test} from "../controllers/usercontroller.js"
const router=express.Router()


router.get("/",test)

export default router