import express from "express";
import { signin, signup } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",signin)

export default router;
