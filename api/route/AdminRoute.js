import express from "express";
import { getAllUsers, deleteUser } from "../controllers/AdminController.js";
import { verifyAdmin } from "../utils/verifyUser.js";
const router=express.Router()

router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);

export default router;
