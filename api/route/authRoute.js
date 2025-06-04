import express from "express";
import { signin, signup ,signout} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",signin)
router.post("/signout",signout)

export default router;
