import express from "express";
import { signin, signup ,signout,loginAdmin} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",signin)
router.post("/signout",signout)
router.post('/admin-login', loginAdmin);


export default router;
